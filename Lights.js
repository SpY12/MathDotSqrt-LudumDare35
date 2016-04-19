var lights = [];


function initLights(){
	var light1 = new THREE.PointLight(0xFFFFFF, 2, 15, 1);
	light1.position.set(9, 1, 5);
	scene.add(light1);

	var light2 = new THREE.PointLight(0xFFFFFF, 2, 15, 1);
	light2.position.set(-9, 1, 5);
	scene.add(light2);


	lights.push(light1);
	lights.push(light2);
}

function updateLights(){
	lights[0].position.x = getCamera().position.x + 5;
	lights[1].position.x = getCamera().position.x - 5;
	
}