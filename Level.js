var p;



function initLevel(){//biggy
	p = Object.create(player);
	p.constructor();
	scene.add(p.obj);
	initAudio();

	//var Ambient = new THREE.AmbientLight(0x404040);
	//scene.add(Ambient);

	p.obj.position.x = 0;
	p.camera.position.x = 0;
	p.camera.position.y = 1;

	generateChunks(20);
}

var tick = 0;

function updateLevel(){
	p.update();
	updateAudio();

	if(tick % 10 == 0) generateChunk();

	tick++;
	updateGeneration();
}

function getCamera(){
	return p.camera;
}