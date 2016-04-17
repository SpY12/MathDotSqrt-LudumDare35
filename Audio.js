var audioCtx, audioElement, audioSrc, analyser;
var frequencyData = new Uint8Array(1024);

function initAudio(){
	

	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	
	var audioElement = document.getElementById('audioElement');
    // audioElement.src = 'http://upload3dprint.com/ludumdare/res/audio/music/auckland.wav';
    // audioElement.controls = true;
    // audioElement.loop = true;
    // audioElement.autoplay = true;
    // audioElement.type ="audio/wav";
    // audioElement.crossOrigin = "anonymous";

	audioSrc = audioCtx.createMediaElementSource(audioElement);
	analyser = audioCtx.createAnalyser();

	// Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);
}

function updateAudio(){
	analyser.getByteFrequencyData(frequencyData);
}