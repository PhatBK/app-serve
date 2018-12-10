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
        <link rel="stylesheet" type="text/css" href="css/css.css">
    </head>
    <body onload="firstRequest()">
        <div class="flex-center position-ref full-height">
            <div class="content">
               <video 
               id="videojs-event-tracking-player" 
               class="video-js" 
               controls 
               preload="auto" 
               width="300" 
               height="250"
               poster="videos/Larva.jpg" 
               data-setup="{}">
                <source src="videos/larva.mp4" type='video/mp4' id="videoID">
                <source src="MY_VIDEO.webm" type='video/webm'>
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a web browser that
                  <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
              </video>
            </div>
        </div>
    </body>
    <script src="js/libs/video.js"></script>
    <script src="js/libs/jquery-2.1.3.min.js"></script>

    <script src="js/plugins/videojs-event-tracking.js"></script>
    
    <script src="js/utils/config.js"></script>
    <script src="js/utils/device-infos.js"></script>
    <script src="js/utils/user-infos.js"></script>
    <script src="js/utils/media-infos.js"></script>
    <script src="js/utils/ip.js"></script>

    <script src="js/utils/log-event.js"></script>
    <script src="js/utils/media-event.js"></script>
    <script>
      const firstRequest = () => {
            alert("first request");
      };
    </script>
</html>
