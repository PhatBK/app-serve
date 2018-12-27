const service_code = {
    'token': '8b82c96c6de5739a6a1979b634711087bfb1d329',
    'token_key': '',
};
const service_name = {
    'name': window.location.hostname,
};
const logging_host = {
    'host': 'http://192.168.146.77:9001/kenh-hai/web',
};
const event_labels = {
    'abort': 'abort',
    'emptied': 'emptied',
    'ended': 'ended',
    'error': 'error',
    'interruptbegin': 'interruptbegin',
    'interruptend': 'interruptend',
    'loadeddata': 'loadeddata',
    'loadedmetadata': 'loadedmetadata',
    'loadstart': 'loadstart',
    'load': 'load',
    'loadend': 'loadend',
    'mozaudioavailable': 'mozaudioavailable',
    'pause': 'pause',
    'play': 'play',
    'playing': 'playing',
    'progress': 'progress',
    'ratechange': 'ratechange',
    'seeked': 'seeked',
    'seeking': 'seeking',
    'suspend': 'suspend',
    'timeupdate': 'timeupdate',
    'volumechange': 'volumechange',
    'waiting': 'waiting',
};

let media_infos = {
    'current_uri': document.getElementById('current_uri').value,
    'media_id': document.getElementById('media_id').value,
    'media_category': document.getElementById('media_category').value,
    'media_name': document.getElementById('media_name').value,
    'media_viewed': document.getElementById('media_viewed').value,
    'media_like_count': document.getElementById('media_like_count').value,
};
let host = logging_host.host;
let UserID = null;
let current_host = window.location.protocol + '://' + window.location.hostname;
let video_stream_url = null;
const device_type = "Web";
const user_agent = navigator.userAgent;


// let player = videojs('videojs-event-tracking-player');

const TimeNormalFormat = (time) => {
    let normal = time.getFullYear() + "-" 
                + (time.getMonth()+1) + "-" 
                + time.getDate() + "T" 
                + time.getHours() + ":"
                + time.getMinutes() + ":"
                + time.getSeconds() + "Z";
    return normal;
};

const findCookie = (cname) => {
    var result = null;
    var allCookie = document.cookie.split(';');
    for (var i = 0; i < allCookie.length; i++) {
        if(allCookie[i].split('=')[0] === cname) {
            result = allCookie[i].split('=')[1];
        }
    }
    return result;
};

function checkUserID() {
    if (findCookie('user_id') === null) {
        var user_name = 'KenhHai' + Math.floor((Math.random() * 1000000) + 1);
        UserID = "8866phatnh" + Math.floor(Math.random() * 1000000) + 1 +"34711087bfb1d329",
        document.cookie = "user_id= " + UserID + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
        document.cookie = "username=" + user_name + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
    } else {
        UserID = findCookie('user_id');
    }
};

const ajaxSendDataNodejs = (data, event, url, time) => {
    let reports = {
        'event' : event,
        'data' : data,
        'user_id' : UserID,
        'current_uri': media_infos.current_uri,
        'ip_public': ip_public,
        'ip_private': ip_private,
        'user_agent': user_agent,
        'time' : time,
        'media_id': media_infos.media_id,
        'media_name': media_infos.media_name,
        'media_category': media_infos.media_category,
        'media_like_count': media_infos.media_like_count,
        'media_viewed': media_infos.media_viewed,
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'service_token': service_code.token,
        }
    });
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(reports),
        dataType: "json",
        cache: false, 
        success : function(response) {
            console.log(response);
        },
        error : function(error) {
            console.log(error);
        }
    });
};



// end update
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}
$(document).ready(function () {
    initPlayer();
    callBackEndVideo();
    eventClickResolution();
    autoPlayVideo();
    onPlayerReady();

});
function onPlayerReady() {
    $(".vjs-big-play-button").click();
}
var player = null;
var isPlaying = false;
var pauseTimes = 0;
var seekTimes = 0;
var waitTimes = 0;
var durationWatching = 0;
var durationBuffering = 0;
var beforeTime = 0;
var currentTime = 0;
function resizeend() {
    if (new Date() - rtimeResizeend < deltaResizeend) {
        setTimeout(resizeend, deltaResizeend);
    } else {
        //set width, height
        displayVideoResponsive()
    }
}
function displayVideoResponsive() {
    var winWidth = $(window).width();
    if (winWidth >= 360) {
        $('.youtube .vjs-time-divider').css('display', 'block');
        $('.youtube .vjs-duration').css('display', 'block');
    } else {
        $('.youtube .vjs-time-divider').css('display', 'none');
        $('.youtube .vjs-duration').css('display', 'none');
    }
}
function initPlayer() {
//-- START TRACE

    var streamUrl = $('#url').val();
    var options = {
        html5: {
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            hls: {
                enableLowInitialPlaylist: true,
                overrideNative: true
            }
        },
        flash: {
            hls: {
                enableLowInitialPlaylist: true
            }
        },
        inactivityTimeout: 0,
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
        controlBar: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: false,
            progressControl: {},
            volumePanel: {},
            subsCapsButton: false,
            subtitlesButton: false,
            playbackRateMenuButton: false,
            audioTrackButton: false,
            fullscreenToggle: {}
        }
    };
    player = videojs('videoBox', options);
    player.src({
        src: streamUrl,
        type: 'application/x-mpegURL',
    });
    player.poster($('#poster').val());
    var qLevels = [];
    player.qualityLevels().on('addqualitylevel', function (event) {
        var quality = event.qualityLevel;
        if (quality.height !== undefined && $.inArray(quality.height, qLevels) === -1) {
            quality.enabled = true;
            qLevels.push(quality.height);
            if (!$('.quality_ul').length) {
                var h = '<div class="quality_setting vjs-menu-button vjs-menu-button-popup vjs-control vjs-button">' +
                        '<button class="vjs-menu-button vjs-menu-button-popup vjs-button" type="button" aria-live="polite" aria-disabled="false" title="Quality" aria-haspopup="true" aria-expanded="false">' +
                        '<span aria-hidden="true" class="vjs-icon-placeholder vjs-icon-cog"></span>' +
                        '<span class="vjs-control-text">Quality</span></button>' +
                        '<div class="vjs-menu"><ul class="quality_ul vjs-menu-content" role="menu"></ul></div></div>';
                $(".vjs-fullscreen-control").before(h);
            } else {
                $('.quality_ul').empty();
            }

            qLevels.sort(function (a, b) {
                return b - a
            });
            qLevels.reverse();
            var j = 0;
            $.each(qLevels, function (i, val) {
                $(".quality_ul").append('<li class="vjs-menu-item" tabindex="' + i + '" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false" bitrate="' + val +
                        '"><span class="vjs-menu-item-text">' + val + 'p</span></li>');
                j = i;
            });
            $(".quality_ul").append('<li class="vjs-menu-item vjs-selected" tabindex="' + (j + 1) + '" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="true" bitrate="auto">' +
                    '<span class="vjs-menu-item-text">Auto</span></li>');
        }
    });

    player.eventTracking({
        performance: function(data) {
            url = host + '/event/performance';
            time = new Date();
            ajaxSendDataNodejs(data, 'performance', url, TimeNormalFormat(time));
        }
    });

    player.on('tracking:error', function(e, data) {
        let time = new Date();
        let url = host + '/event/errors';
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));
    });

    player.on('tracking:firstplay', function(e, data) {

        if (findCookie('user_id') === null) {
            var user_name = 'KenhHai' + Math.floor((Math.random() * 1000000) + 1);
            UserID = "8866phatnh" + Math.floor(Math.random() * 1000000) + 1 +"34711087bfb1d329",
            document.cookie = "user_id= " + UserID + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
            document.cookie = "username=" + user_name + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
        } else {
            UserID = findCookie('user_id');
        }
        url = host + '/event/first-play';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));
            
    });

    player.on('tracking:pause', function(e, data) {

        url = host + '/event/pause';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:first-quarter', function(e, data) {

        url = host + '/event/first-quarter';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:second-quarter', function(e, data) {

        url = host + '/event/second-quarter';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:third-quarter', function(e, data) {

        url = host + '/event/third-quarter';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:fourth-quarter', function(e, data) {

        url = host + '/event/fourth-quarter';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:seek', function(e, data) {

        url = host + '/event/seek';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:performance', function(e, data) {

        url = host + '/event/performance';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:buffered', function(e, data) {

        url = host + '/event/buffered';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:buffer_load', function(e, data) {

        url = host + '/event/buffer_load';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });

    player.on('tracking:buffer_miss', function(e, data) {

        url = host + '/event/buffer_miss';
        time = new Date();
        ajaxSendDataNodejs(data, e, url, TimeNormalFormat(time));

    });
}

function callBackEndVideo() {
    if (player && $('#next-video').val()) {
        player.on('ended', function () {
            var name = '<p class="name-video">' + $('#next-name-video').val() + '</p>';
            $('.over-next-video').append(name);
            $('.auto-next-play').show();
            var count = 5;
            var x = setInterval(function () {
                count = count - 1;
                if (count == 0) {
                    clearInterval(x);
                    var stopNext = $('#stop-next-video').val();
                    if (stopNext == 0) {
                        window.location.href = $('#next-video').val();
                    }
                }
            }, 1000);
        });
    }
}
function stopNextVideo() {
    $('.auto-next-play').hide();
    $('#stop-next-video').val('1');
}
function nextVideo() {
    window.location.href = $('#next-video').val();
}
function eventClickResolution() {

    $("body").on("click", ".quality_ul li", function () {
        $(".quality_ul li").removeClass("vjs-selected");
        $(".quality_ul li").prop("aria-checked", "false");
        $(this).addClass("vjs-selected");
        $(this).prop("aria-checked", "true");
        var val = $(this).attr("bitrate");
        var qualityLevels = player.qualityLevels();
        for (var i = 0; i < qualityLevels.length; i++) {
            qualityLevels[i].enabled = (val == "auto" || (val != "auto" && qualityLevels[i].height == val));
        }
        $('.quality_setting .vjs-menu-button-popup').attr('aria-expanded', 'false');
        $('.quality_setting .vjs-menu').removeClass('vjs-lock-showing');
    });
    $("body").on("click", ".quality_setting .vjs-menu-button-popup", function () {
        var isShowed = $(this).attr('aria-expanded');
        if (typeof isShowed !== typeof undefined && isShowed !== false) {
            isShowed = !(isShowed.toUpperCase() === 'TRUE');
            $(this).attr('aria-expanded', isShowed);
            if (isShowed) {
                $('.quality_setting .vjs-menu').addClass('vjs-lock-showing');
            } else {
                $('.quality_setting .vjs-menu').removeClass('vjs-lock-showing');
            }
        }
    });
}
function autoPlayVideo() {

    var isAutoPlay = getCookie("isAutoPlay");
    if (isAutoPlay == "") {
        setCookie("isAutoPlay", 1, 7);
        isAutoPlay = 1;
    }
    if (isAutoPlay == 1) {
        $(".switch svg:first-child").addClass("active");
        $(".switch svg:last-child").removeClass("active");
        $("#autoPlay").val(1);
    } else {
        $(".switch svg:first-child").removeClass("active");
        $(".switch svg:last-child").addClass("active");
        $("#autoPlay").val(0);
    }

    $('.switch').click(function (e) {

        if ($('#autoPlay').val() == 1) {
            $('#autoPlay').val(0);
            setCookie("isAutoPlay", 0, 7);
            isAutoPlay = 0;
        } else {
            $('#autoPlay').val(1);
            setCookie("isAutoPlay", 1, 7);
            isAutoPlay = 1;
        }

        if (isAutoPlay == 1) {
            $(".switch svg:first-child").addClass("active");
            $(".switch svg:last-child").removeClass("active");
        } else {
            $(".switch svg:first-child").removeClass("active");
            $(".switch svg:last-child").addClass("active");
        }
    });
}
 
