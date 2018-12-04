var host = 'http://192.168.1.18:9001/users';
// send data use Ajax
const ajaxSendDataNodejs = (ip, src, url, time) => {
    let reports = {
      'ip' : ip,
      'src' : src,
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
$.getJSON('https://api.ipify.org?format=json', function(data){
    let url = host + '/user/ip';
    let time = Date.now();
    let src = document.getElementById('videoID').src;
    ajaxSendDataNodejs(data.ip, src, url, time );
});
