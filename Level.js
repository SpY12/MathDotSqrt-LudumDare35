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

}

function generateLevel(){
	generateFloor();
	generateLight();
}

function generateLight(){
	lights.point1 = new THREE.PointLight(0xFF0000, .5, 10, .1);
	lights.point1.position.set(5, 0, 2);
	scene.add(lights.point1);

	lights.point2 = new THREE.PointLight(0xFF00FF, .5, 10, .1);
	lights.point2.position.set(-5, 0, 2);
	scene.add(lights.point2);
}

function generateFloor(){
	var geometry = new THREE.BoxGeometry(18, 5, 2);
	var material = new THREE.MeshLambertMaterial({
		color: 0xFFFFFF
	});
	var floor = new THREE.Mesh(geometry, material);
	floor.position.y = -4;

	scene.add(floor);
}

function updateLevel(){
	p.update();
	updateAudio();
	updateLights();

	p.obj.position.x = Math.sin(clock.getElapsedTime()) * 4.5;
	p.camera.position.x = Math.sin(clock.getElapsedTime()) * 4.5;
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