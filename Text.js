function createText(text, size, x, y, z){
	var text3d = new THREE.TextGeometry( text, {
		size: size,
		height: size / 4,
		curveSegments: 2,
		font: "helvetiker"
	});

	text3d.computeBoundingBox();

	var material = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF
		//side: THREE.DoubleSide
	});

	var text = new THREE.Mesh(text3d, material);

	text3d.computeBoundingBox();

	var textWidth = text3d.boundingBox.max.x - text3d.boundingBox.min.x;
	var textHeight = text3d.boundingBox.max.y - text3d.boundingBox.min.y;

	text.position.set( x , y, z);

	text.rotation.y = Math.PI;

	scene.add(text);
}