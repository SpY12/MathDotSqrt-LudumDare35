var loader = new THREE.JSONLoader();
	

var URL = {
	arrow: "http://upload3dprint.com/ludumdare/res/model/arrow.js",
	spike: "http://upload3dprint.com/ludumdare/res/model/smallSpike.js"
}

function getModel(url){
	
}

function loadSmallSpikes(){
	loader.load("http://upload3dprint.com/ludumdare/res/model/smallSpike.js", function(geometry, materials){
		var material = new THREE.MultiMaterial( materials );

		var mesh = new THREE.Mesh(geometry, material);

		mesh.scale.set(.05, .05, .05);

		scene.add(mesh);
		var helper = new THREE.WireframeHelper( mesh );
		helper.material.color.set( 0x0000ff );
		scene.add( helper );
	});
}