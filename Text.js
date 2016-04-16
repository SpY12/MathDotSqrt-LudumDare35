function createText(text, x, y, z){
	//loader.load('res/model/fonts/Pirulen_Regular.js', function(font){
		var text3d = new THREE.TextGeometry( text, {

			size: 30,
			height: 30 / 4,
			curveSegments: 2,
			font: "helvetiker"

		});

		text3d.computeBoundingBox();

		var material = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide
		});

		var text = new THREE.Mesh(text3d, material);

		text.position.x = x;
		text.position.y = y;
		text.position.z = z;

		scene.add(text);
	//});
}