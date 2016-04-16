function createText(text, x, y, z){
	var loader = new THREE.FontLoader();

	loader.load('res/model/fonts/helvetiker_regular.typeface.js', function(font){
		var geometry = new THREE.TextGeometry(text, {
			font: font,
			size: 80
		});

		var material = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF
		});

		var text = new THREE.Mesh(geometry, material);

		text.position.x = x;
		text.position.y = y;
		text.position.z = z;

		scene.add(text);
	});
}