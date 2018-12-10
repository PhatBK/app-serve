
let player = videojs('videojs-event-tracking-player');

// player.on('loadstart', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('loadeddata', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('loadedmetadata', function() {
//     console.log(player.bufferedPercent());
// });
player.on('play', function() {
    console.log(player.bufferedPercent());
});
player.on('error', function() {
	console.log(player.error.code + player.error.message)
})
// player.on('seeking', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('seeked', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('waiting', function() {
//     console.log(player.currentTime());
// });

// player.on('interruptend', function() {
//     console.log(player.currentTime());
// });
// player.on('ended', function() {
// 	player.dispose();
// });
// player.on('progress', function() {
//     console.log(player.bufferedPercent());
// });
// player.on('playing', function() {
//     console.log(player.currentTime());
// });
// player.on('timeupdate', function() {
//     console.log(player.currentTime());
// });
