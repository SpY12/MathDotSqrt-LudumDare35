var audioCtx, audioElement, audioSrc, analyser;
var frequencyData = new Uint8Array(1024);

function initAudio(){
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	audioElement = document.getElementById('audioElement');
	audioSrc = audioCtx.createMediaElementSource(audioElement);
	analyser = audioCtx.createAnalyser();

	// Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	audioElement.play();
}

function updateAudio(){
	analyser.getByteFrequencyData(frequencyData);
}