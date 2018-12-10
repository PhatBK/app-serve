// let media_infos = {
//     'id': null,
//     'name': '',
//     'duration': null,
//     'min_resolution': null,
//     'max_resolution': null,
//     'buffered_start': null,
//     'buffered_load': null,
//     'buffering': null,
//     'watch_time': null,
//     'seek_count': null,
//     'pause_count': null,
// };

let player = videojs('videojs-event-tracking-player');

player.on('loadstart', function() {
    console.log(player.bufferedPercent());
});
player.on('loadeddata', function() {
    console.log(player.bufferedPercent());
});
player.on('loadedmetadata', function() {
    console.log(player.bufferedPercent());
});
// player.on('play', function() {
//     console.log(player.bufferedPercent());
// });
player.on('seeking', function() {
    console.log(player.bufferedPercent());
});
player.on('seeked', function() {
    console.log(player.bufferedPercent());
});
player.on('waiting', function() {
    console.log(player.currentTime());
});

player.on('interruptend', function() {
    console.log(player.currentTime());
});

// player.on('progress', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('playing', function() {
//     console.log(player.currentTime());
// });
// player.on('timeupdate', function() {
//     console.log(player.currentTime());
// });
