function createText(text, size, x, y, z){
	var text3d = new THREE.TextGeometry( text, {
		size: size,
		height: size / 4,
		curveSegments: 2,
		font: "helvetiker"
	});

	var material = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF
		//side: THREE.DoubleSide
	});

	var text = new THREE.Mesh(text3d, material);

	text.position.set( x , y, z);


	scene.add(text);
}