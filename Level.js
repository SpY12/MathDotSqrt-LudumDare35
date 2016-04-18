var p;

var hasStarted = false;
var isFalling = false;

function initLevel(){//biggy
	p = Object.create(player);
	p.constructor();
	scene.add(p.obj);
	initAudio();
	initLights();

	//var Ambient = new THREE.AmbientLight(0x404040);
	//scene.add(Ambient);

	p.obj.position.x = 0;
	p.camera.position.x = 0;
	p.camera.position.y = 10;

	createText("Cube Shift", 4, -12, 10, -10);
	createText("Press Space to Play", 1.5, -9, 6, -10);


	generateChunks(15);
}

var tick = 0;

function updateLevel(){
	if(hasStarted) p.update();
	else{
		if(!isFalling) getCamera().position.y = Math.sin(clock.getElapsedTime()) / 10 + 10;
		if(keyboard.pressed("space")) isFalling = true;
	} 

	if(isFalling && !hasStarted){
		getCamera().position.y -= 0.01;
		if(getCamera().position.y <= 1){
			getCamera().position.y = 1;
			hasStarted = true;
		}
	}
	updateAudio();
	updateLights();
	if(tick % 10 == 0) generateChunk();

	tick++;
	updateGeneration();
}

function getCamera(){
	return p.camera;
}