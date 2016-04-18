var lights = [];


function initLights(){
	console.log("init");
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
	//scene.fog.color.setHSL();
	// lights[0].distance = (p.obj.scale.z * 10) / 4 + 5;
	// lights[1].distance = (10 / p.obj.scale.z) / 4 + 5;

		for(var i = 0; i < loadedGeometry.length; i++){
			if(frequencyData[513] / 255 > .3){
				//loadedGeometry[i].material.color.setHSL() += r;
			} 
			else loadedGeometry[i].material.color = new THREE.Color(1, 1, 1);
		}
}