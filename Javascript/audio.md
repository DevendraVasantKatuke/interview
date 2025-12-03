<audio controls id="audio">
	<source src="elvis.mp3" type="audio/mpeg" >
	<source src="elvis.oga" type="audio/ogg" >
</audio>

// attributes:
// src
// autoplay
// loop
// controls
// muted
// preload | none | metadata | auto
// type
// height/width (video only)

// MIME types:
// mp3: audio/mpeg
// mp4: audio/mp4, video/mp4
// ogg: audio/ogg, video/ogg
// webm: audio/webm, video/webm
// wav: audio/wav

var myAudio = document.getElementById('audio');
if (myAudio.canPlayType('audio/mpeg')) {
	myAudio.setAttribute('src', 'elvis.mp3')
}
if (myAudio.canPlayType('audio/ogg')) {
	myAudio.setAttribute('src', 'elvis.ogg')
}
// call these APIs on custom button's click events
myAudio.play();
myAudio.pause();
myAudio.buffered;
myAudio,buffered.end();
myAudio.seeking;
myAudio.seekable;
myAudio.seekable.end();
myAudio.currentTime;
myAudio.duration;
myAudio.playbackRate = 0.5;
myAudio.TimeRanges.length;
myAudio.TimeRanges.start(2);
myAudio.TimeRanges.end(3);