var audioCtx, audioElement, audioSrc, analyser;
var frequencyData = new Uint8Array(1024);

var deathSound = new Audio("http://upload3dprint.com/ludumdare/res/audio/sfx/death.wav");

var soundEffects = {
	death: function(){
		deathSound.play();
	}
}

function initAudio(){
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioElement = document.getElementById('audioElement');
	audioElement.crossOrigin = 'Anonymous'
	
	audioSrc = audioCtx.createMediaElementSource(audioElement);
	analyser = audioCtx.createAnalyser();

	//Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);
}

function updateAudio(){
	analyser.getByteFrequencyData(frequencyData);
}