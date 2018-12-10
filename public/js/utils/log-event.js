(function(window, videojs){

        let host = 'http://10.85.1.207:9001/logs';

        const user_agent = navigator.userAgent;
        const browser_code = navigator.appCodeName;
        const browser_version = navigator.appVersion;
        const cookie_enable = navigator.cookieEnabled;
        const browser_language = navigator.language;

        const browser_online = navigator.onLine;
        const browser_name =  navigator.appName;
        const user_platform = navigator.platform;

        console.log(service_code.token);
        // console.log(ip.ip);

        const ajaxSendDataNodejs = (data, event, url, time) => {
            let dataSend = [];
            let reports = {
              'event' : event,
              'data' : data,
              'user_id' : '',
              'user_platform' : user_platform,
              'browser_name' : browser_name,
              'browser_online' : browser_online,
              'time' : time,
            };
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
        }
        const ajaxSendDataPHP = (data, event, url) => {
            $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  }
            });
            e.preventDefault();
            $.ajax({
                url : url,
                data : {
                  'data' : data,
                  'category': event,
                },
                type : 'post',
                success : function(response) {
                  console.log(response);
                },
                error : function(error) {
                  console.log(error);
                }
            });
        }

        let player = videojs('videojs-event-tracking-player');
        player.eventTracking({
            performance: function(data) {
                url = host + '/event/performance';
                // time = Date.now();
                time = new Date();
                ajaxSendDataNodejs(data, 'performance', url, time);
            }
        });

        player.on('tracking:firstplay', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/first-play';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        
        });

        player.on('tracking:pause', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/pause';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
           
        });

        player.on('tracking:first-quarter', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/first-quarter';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:second-quarter', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/second-quarter';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:third-quarter', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/third-quarter';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:fourth-quarter', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/fourth-quarter';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:seek', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/seek';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:performance', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/performance';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:buffered', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/buffered';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:buffer_load', function(e, data) {
            url = host + '/event/buffer_load';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });
        player.on('tracking:buffer_miss', function(e, data) {
            url = host + '/event/buffer_miss';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        
}(window, window.videojs));