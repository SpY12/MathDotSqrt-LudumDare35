var loader = new THREE.JSONLoader();
	

var URL = {
	arrow: "http://upload3dprint.com/ludumdare/res/model/arrow.js"
}

function getModel(url){
	return loader.load(url, function(geometry, materials){
		var material = new THREE.MeshBasicMaterial({
			color: 0xFF00FF
		});

		var mesh = new THREE.Mesh(geometry, material);

		mesh.scale.set(.1, .1, .1);

		return mesh;
	});
}