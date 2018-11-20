(function(window, videojs){

        let player = videojs('videojs-event-tracking-player');
        player.eventTracking();

        var host = 'http://192.168.1.18:9001/logs';

        const ajaxSendDataNodejs = (data, event, url, time) => {
            let dataSend = [];
            let reports = {
              'event' : event,
              'data' : data,
              'user_id' : '',
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

        player.eventTracking({
            performance: function(data) {
            // console.log('tracking:performance', data);
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
            url = host + '/event/plause';
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

        player.on('tracking:buffered', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/buffered';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:performance', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/performance';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });

        player.on('tracking:seek', function(e, data) {
            // console.log(e.type, data);
            url = host + '/event/seek';
            time = Date.now();
            ajaxSendDataNodejs(data, e, url, time);
        });
    }(window, window.videojs));