var p;
var lights = {
	point1: null,
	point2: null
};


function initLevel(){
	p = Object.create(player);
	p.constructor();
	scene.add(p.obj);
	initAudio();

	generateLevel();

	p.obj.position.x = 5;
	p.camera.position.x = 5;

	
}

function generateLevel(){
	//generateFloor();
	generateChunks(10);
	generateLight();
}

function generateLight(){
	lights.point1 = new THREE.PointLight(0xFF0000, .5, 10, 1);
	lights.point1.position.set(5, 0, 2);
	scene.add(lights.point1);

	lights.point2 = new THREE.PointLight(0xFF00FF, .5, 10, 1);
	lights.point2.position.set(-5, 0, 2);
	scene.add(lights.point2);
}

var tick = 0;
function updateLevel(){
	p.update();
	updateAudio();
	updateLights();
	updateGeneration();
	//if(tick % 30 == 0) generateChunk(true);
	tick++;

	//p.obj.position.x += 1 / 30;
	//p.camera.position.x += 1 / 30;

	//lights.point1.position.x +=  1 / 30;
	//lights.point2.position.x += 1 / 30;

	p.collision(loadedGeometry);
}

function updateLights(){
	if(frequencyData[500] >= 100){
		lights.point1.color.setHSL(lights.point1.color.getHSL().h + .01, .7, .5);
		lights.point2.color.setHSL(lights.point2.color.getHSL().h + .01, .7, .5);

	}
}

function getCamera(){
	return p.camera;
}