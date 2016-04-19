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
	audioElement = document.getElementById('audioElement');
	
	audioSrc = audioCtx.createMediaElementSource(audioElement);
	analyser = audioCtx.createAnalyser();

	//Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	audioElement.addEventListener('ended', function() { //loop music
    	this.currentTime = 0;
    	this.play();
	}, false);

	audioElement.play();

}

function stopMusic(){
	audioElement.pause();
	audioElement.currentTime = 0;
}

function updateAudio(){
	analyser.getByteFrequencyData(frequencyData);
}