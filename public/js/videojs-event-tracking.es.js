import videojs from 'video.js';

var version = "0.0.9";

/**
 * @function BufferTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 *
 * Tracks when the video player is marked as buffering and waits until the player
 * has made some progress.
 *
 * Example Usage:
 * player.on('tracking:buffered', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => currentTime:    current second of video playback
 * => readyState:     video#readyState value
 * => secondsToLoad:  Total amount of time in seconds buffering took
 * => bufferCount:    Total buffer events for this source
 */

var BufferTracking = function BufferTracking(config) {
  var _this = this;

  var timer = null;
  var scrubbing = false;
  var bufferPosition = false;
  var bufferStart = false;
  var bufferEnd = false;
  var bufferCount = 0;
  var readyState = false;

  var reset = function reset() {
    if (timer) {
      clearTimeout(timer);
    }
    scrubbing = false;
    bufferPosition = false;
    bufferStart = false;
    bufferEnd = false;
    bufferCount = 0;
    readyState = false;
  };

  var onPause = function onPause() {
    bufferStart = false;

    if (_this.scrubbing()) {
      scrubbing = true;
      timer = setTimeout(function () {
        scrubbing = false;
      }, 200);
    }
  };

  var onPlayerWaiting = function onPlayerWaiting() {
    if (bufferStart === false && scrubbing === false && _this.currentTime() > 0) {
      bufferStart = new Date();
      bufferPosition = +_this.currentTime().toFixed(0);
      readyState = +_this.readyState();
    }
  };

  var onTimeupdate = function onTimeupdate() {
    var curTime = +_this.currentTime().toFixed(0);

    if (bufferStart && curTime !== bufferPosition) {
      bufferEnd = new Date();

      var secondsToLoad = (bufferEnd - bufferStart) / 1000;

      bufferStart = false;
      bufferPosition = false;
      bufferCount++;

      _this.trigger('tracking:buffered', {
        currentTime: +curTime,
        readyState: +readyState,
        secondsToLoad: +secondsToLoad.toFixed(3),
        bufferCount: +bufferCount
      });
    }
  };

  this.on('dispose', reset);
  this.on('loadstart', reset);
  this.on('ended', reset);
  this.on('pause', onPause);
  this.on('waiting', onPlayerWaiting);
  this.on('timeupdate', onTimeupdate);
};

/**
 * Tracks when users pause the video.
 *
 * Example Usage:
 * player.on('tracking:pause', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => pauseCount:       Total number of Pause events triggered
 *
 * @function PauseTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

var PauseTracking = function PauseTracking(config) {
  var player = this;
  var pauseCount = 0;
  var timer = null;
  var locked = false;
  var reset = function reset(e) {
    if (timer) {
      clearTimeout(timer);
    }
    pauseCount = 0;
    locked = false;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('pause', function () {
    if (player.scrubbing() || locked) {
      return;
    }

    timer = setTimeout(function () {
      pauseCount++;
      player.trigger('tracking:pause', { pauseCount: pauseCount });
    }, 300);
  });
};

/**
 * Track Overall Percentile (1st, 2nd, 3rd, and 4th) of Completion
 * This event triggers each quarter of a video.
 *
 * Example Usage:
 * player.on('tracking:first-quarter', (e, data) => console.log(data))
 * player.on('tracking:second-quarter', (e, data) => console.log(data))
 * player.on('tracking:third-quarter', (e, data) => console.log(data))
 * player.on('tracking:fourth-quarter', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => pauseCount:       Total number of Pause events triggered
 * => seekCount:        Total number of Seek events triggered
 * => currentTime:      Current second video is on
 * => duration:         Total duration of video
 *
 * @function PercentileTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

var PercentileTracking = function PercentileTracking(config) {
  var player = this;
  var first = false;
  var second = false;
  var third = false;
  var duration = 0;
  var pauseCount = 0;
  var seekCount = 0;

  var reset = function reset(e) {
    first = false;
    second = false;
    third = false;
    duration = 0;
    pauseCount = 0;
    seekCount = 0;
  };

  var incPause = function incPause() {
    return pauseCount++;
  };
  var incSeek = function incSeek() {
    return seekCount++;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('tracking:pause', incPause);
  player.on('tracking:seek', incSeek);
  player.on('timeupdate', function () {
    var curTime = +player.currentTime().toFixed(0);
    var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: curTime,
      duration: duration
    };

    switch (curTime) {
      case first:
        first = false;
        player.trigger('tracking:first-quarter', data);
        break;
      case second:
        second = false;
        player.trigger('tracking:second-quarter', data);
        break;
      case third:
        third = false;
        player.trigger('tracking:third-quarter', data);
        break;
    }
  });
  player.on('ended', function () {
    var data = {
      seekCount: seekCount,
      pauseCount: pauseCount,
      currentTime: duration,
      duration: duration
    };

    player.trigger('tracking:fourth-quarter', data);
  });

  player.on('durationchange', function () {
    duration = +player.duration().toFixed(0);
    if (duration > 0) {
      var quarter = (duration / 4).toFixed(0);

      first = +quarter;
      second = +quarter * 2;
      third = +quarter * 3;
    }
  });
};

/**
 * Track Overall Performance
 * This event triggers when the player has changed sources, has ended, or
 * has been destroyed.
 *
 * Example Usage:
 * player.on('tracking:performance', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => pauseCount:       Total number of Pause events triggered
 * => seekCount:        Total number of Seek events triggered
 * => bufferCount:      Total number of Buffer events triggered
 * => totalDuration:    Total duration provided by the file
 * => watchedDuration:  Total number of seconds watched (not seeked past)
 * => bufferDuration:   Total seconds that buffering has occured
 * => initialLoadTime:  Seconds it took for the initial frame to appear
 *
 * @function PerformanceTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */
var PerformanceTracking = function PerformanceTracking(config) {
  if (typeof config === 'undefined' || typeof config.performance !== 'function') {
    return;
  }

  var player = this;
  var seekCount = 0;
  var pauseCount = 0;
  var bufferCount = 0;
  var totalDuration = 0;
  var watchedDuration = 0;
  var bufferDuration = 0;
  var initialLoadTime = 0;
  var timestamps = [];

  var reset = function reset() {
    seekCount = 0;
    pauseCount = 0;
    bufferCount = 0;
    totalDuration = 0;
    watchedDuration = 0;
    bufferDuration = 0;
    initialLoadTime = 0;
    timestamps = [];
  };

  var trigger = function trigger() {
    var data = {
      pauseCount: pauseCount,
      seekCount: seekCount,
      bufferCount: bufferCount,
      totalDuration: totalDuration,
      watchedDuration: watchedDuration,
      bufferDuration: bufferDuration,
      initialLoadTime: initialLoadTime
    };

    config.performance.call(player, data);
  };

  var triggerAndReset = function triggerAndReset() {
    trigger();
    reset();
  };

  if (typeof window.addEventListener === 'function') {
    window.addEventListener('beforeunload', triggerAndReset);
    player.on('dispose', function () {
      window.removeEventListener('beforeunload', triggerAndReset);
    });
  }

  player.on('loadstart', function () {
    if (totalDuration > 0) {
      trigger();
    }
    reset();
  });
  player.on('ended', triggerAndReset);
  player.on('dispose', triggerAndReset);
  player.on('timeupdate', function () {
    var curTime = +player.currentTime().toFixed(0);

    if (timestamps.indexOf(curTime) < 0) {
      timestamps.push(curTime);
    }
    watchedDuration = timestamps.length;
  });
  player.on('loadeddata', function (e, data) {
    totalDuration = +player.duration().toFixed(0);
  });
  player.on('tracking:seek', function (e, data) {
    seekCount = data.seekCount;
  });
  player.on('tracking:pause', function (e, data) {
    pauseCount = data.pauseCount;
  });
  player.on('tracking:buffered', function (e, data) {
    bufferCount = data.bufferCount;

    bufferDuration = +(bufferDuration + data.secondsToLoad).toFixed(3);
  });
  player.on('tracking:firstplay', function (e, data) {
    initialLoadTime = data.secondsToLoad;
  });
};

/**
 * Track Initial Play Event
 * This event is triggered when the video has been played for the first time.
 * If you are looking to track play events, simply listen on the player for a normal
 * "play" or "playing" event.
 *
 * Example Usage:
 * player.on('tracking:firstplay', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => secondsToLoad: Total number of seconds between the player initializing
 *                   a play request and when the first frame begins.
 *
 * @function PlayTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

var PlayTracking = function PlayTracking(config) {
  var _this = this;

  var firstplay = false;
  var loadstart = 0;
  var loadend = 0;
  var secondsToLoad = 0;

  var reset = function reset() {
    firstplay = false;
    loadstart = 0;
    loadend = 0;
    secondsToLoad = 0;
  };

  var onLoadStart = function onLoadStart() {
    reset();
    loadstart = new Date();
  };

  var onLoadedData = function onLoadedData() {
    loadend = new Date();
    secondsToLoad = (loadend - loadstart) / 1000;
  };

  var onPlaying = function onPlaying() {
    if (!firstplay) {
      firstplay = true;
      _this.trigger('tracking:firstplay', {
        secondsToLoad: +secondsToLoad.toFixed(3)
      });
    }
  };

  this.on('dispose', reset);
  this.on('loadstart', onLoadStart);
  this.on('loadeddata', onLoadedData);
  this.on('playing', onPlaying);
};

/**
 * Track Seeking Events
 * During playback, we are tracking how many times a person seeks, and
 * the position a user has seeked to.
 *
 * Example Usage:
 * player.on('tracking:seek', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => seekCount: total number of seeks that has occuring during this file
 * => seekTo: Position, in seconds, that has been seeked to.
 *
 * @function SeekTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */
var SeekTracking = function SeekTracking(config) {
  var player = this;
  var seekCount = 0;
  var locked = true;
  var reset = function reset() {
    seekCount = 0;
    locked = true;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('play', function () {
    locked = false;
  });
  player.on('pause', function () {
    if (locked || !player.scrubbing()) {
      return;
    }

    var curTime = +player.currentTime().toFixed(0);

    seekCount++;
    player.trigger('tracking:seek', {
      seekCount: +seekCount,
      seekTo: curTime
    });
  });
};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
var getPlugin = videojs.getPlugin || videojs.plugin;

/**
 * Event Tracking for VideoJS
 *
 * @function eventTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var eventTracking = function eventTracking(options) {
  PauseTracking.apply(this, arguments);
  BufferTracking.apply(this, arguments);
  PercentileTracking.apply(this, arguments);
  PlayTracking.apply(this, arguments);
  SeekTracking.apply(this, arguments);
  PerformanceTracking.apply(this, arguments);
};

// Register the plugin with video.js, avoid double registration
if (typeof getPlugin('eventTracking') === 'undefined') {
  registerPlugin('eventTracking', eventTracking);
}

// Include the version number.
eventTracking.VERSION = version;

export default eventTracking;
