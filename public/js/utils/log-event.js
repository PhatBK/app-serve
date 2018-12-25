// (function(window, videojs){

let host = logging_host.host;
let UserID = null;

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

let current_host = window.location.protocol + '://' + window.location.hostname;
let video_src = media_infos.current_src.substring(current_host.length -1, media_infos.current_src.length);

const ajaxSendDataNodejs = (data, event, url, time) => {
    let reports = {
        'event' : event,
        'data' : data,
        'user_id' : UserID,
        'current_uri': media_infos.current_uri,
        'current_src': video_src,
        'ip_public': ip_public,
        'ip_private': ip_private,
        'user_agent': user_agent,
        'time' : time,
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
};
      
let player = videojs('videojs-event-tracking-player');
player.eventTracking({
    performance: function(data) {
        url = host + '/event/performance';
        time = new Date();
        ajaxSendDataNodejs(data, 'performance', url, TimeNormalFormat(time));
    }
});

player.on('error', function(e, data) {
    
    let error_code = player.error().code;
    let error_message = player.error().message;
    let error_type = null;
    for (let i = 0; i < MEDIA_ERRORS.length; i++) {
        if (error_code === i) {
            error_type = MEDIA_ERRORS[i];
        }
    }
    let data_error = {
        'error_code': error_code,
        'error_type' : error_type,
        'error_message': error_message,
    }
    let time = new Date();
    let url = host + '/event/errors';
    ajaxSendDataNodejs(data_error, e, url, TimeNormalFormat(time));

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

// }(window, window.videojs));
