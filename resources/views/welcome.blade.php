<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <base href="{{ asset('') }}" target="_blank, _self, _parent, _top">
        <title>Video Demo</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link href="https://vjs.zencdn.net/7.3.0/video-js.css" rel="stylesheet">
        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
               <video 
               id="videojs-event-tracking-player" 
               class="video-js" 
               controls 
               preload="auto" 
               width="400" 
               height="250"
               poster="videos/Larva.jpg" 
               data-setup="{}">
                <source src="videos/larva.mp4" type='video/mp4'>
                <source src="MY_VIDEO.webm" type='video/webm'>
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a web browser that
                  <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
              </video>
            </div>
        </div>
    </body>
    <script src="https://vjs.zencdn.net/7.3.0/video.js"></script>
    <script src="js/videojs-event-tracking.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script>
    (function(window, videojs){

        const ajaxSendData = (data, event, url) => {
            let dataSend = [];
            let reports = {
              'event' : event,
              'data' : data,
            };
            $.ajax({
                url: "http://10.79.0.82:3000/logs/event",
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

        let player = videojs('videojs-event-tracking-player');
        player.eventTracking();

        player.eventTracking({
            performance: function(data) {
            // console.log('tracking:performance', data);
            }
        });

        player.on('tracking:firstplay', function(e, data) {
            // console.log(e.type, data);
            // $.ajaxSetup({
            //       headers: {
            //           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //       }
            // });
            // let url = `{{ route('sendlogFirstPlay') }}`;
            // let data_send = data;
            // e.preventDefault();
            // $.ajax({
            //     url : url,
            //     data : {
            //       'data' : data_send,
            //       'category': e.type,
            //     },
            //     type : 'post',
            //     success : function(response) {
            //       console.log(response[0]);
            //       console.log(response[1]);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });
            ajaxSendData(data, e);
        
        });

        player.on('tracking:pause', function(e, data) {
            // console.log(e.type, data);
            // $.ajaxSetup({
            //       headers: {
            //           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //       }
            // });
            // let url = `{{ route('sendlogPause') }}`;
            // let data_send = data;
            // e.preventDefault();
            // $.ajax({
            //     url : url,
            //     data : {
            //       'data' : data_send,
            //       'category': e.type,
            //     },
            //     type : 'post',
            //     success : function(response) {
            //       console.log(response[0]);
            //       console.log(response[1]);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });
            ajaxSendData(data, e);
           
        });

        player.on('tracking:first-quarter', function(e, data) {
            // console.log(e.type, data);
            // $.ajaxSetup({
            //       headers: {
            //           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //       }
            // });
            // let url = `{{ route('sendlogFirstQuarter') }}`;
            // let data_send = data;
            // e.preventDefault();
            // $.ajax({
            //     url : url,
            //     data : {
            //       'data' : data_send,
            //       'category': e.type,
            //     },
            //     type : 'post',
            //     success : function(response) {
            //       console.log(response[0]);
            //       console.log(response[1]);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });
            ajaxSendData(data, e);
        });

        player.on('tracking:second-quarter', function(e, data) {
            // console.log(e.type, data);
            ajaxSendData(data, e);
        });

        player.on('tracking:third-quarter', function(e, data) {
            // console.log(e.type, data);
            ajaxSendData(data, e);
        });

        player.on('tracking:fourth-quarter', function(e, data) {
            // console.log(e.type, data);
            ajaxSendData(data, e);
        });

        player.on('tracking:buffered', function(e, data) {
            // console.log(e.type, data);
            ajaxSendData(data, e);
        });

        player.on('tracking:performance', function(e, data) {
            // console.log(e.type, data);
            // $.ajaxSetup({
            //       headers: {
            //           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //       }
            // });
            // e.preventDefault();
            // let url = `{{ route('sendlogPerfomance') }}`;
            // let data_send = data;
            // $.ajax({
            //     url : url,
            //     data : {
            //       'data' : data_send,
            //       'category': 'tracking:performance',
            //     },
            //     type : 'post',
            //     success : function(response) {
            //       console.log(response[0]);
            //       console.log(response[1]);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });
            ajaxSendData(data, e);
        });

        player.on('tracking:seek', function(e, data) {
            // console.log(e.type, data);
            // $.ajaxSetup({
            //       headers: {
            //           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            //           // 'Content-Type': 'application/json'
            //       }
            // });
            // // let url = `{{ route('sendlogSeek') }}`;
            // let url = 'http://10.79.0.82:3000/logs/event';
            // let data_send = data;
            // e.preventDefault();
            // $.ajax({
            //     url : url,
            //     data : {
            //       'data' : data_send,
            //       'category': e.type,
            //     },
            //     type : 'post',
            //     success : function(response) {
            //       console.log(response[0]);
            //       console.log(response[1]);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });

            // $.ajax({
            //     url: "http://10.79.0.82:3000/logs/event",
            //     type: "POST",
            //     contentType: "application/json",
            //     data: JSON.stringify(data),
            //     dataType: "json",
            //     cache: false, 
            //     success : function(response) {
            //       console.log(response);
            //     },
            //     error : function(error) {
            //       console.log(error);
            //     }
            // });
            ajaxSendData(data, e);
        });
    }(window, window.videojs));
    </script>
</html>
