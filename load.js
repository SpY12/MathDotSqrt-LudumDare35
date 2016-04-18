var loader = new THREE.JSONLoader();
	
var spikeGeometry = null;

loader.load("http://upload3dprint.com/ludumdare/res/model/smallSpike.js", function(geometry, materials){
		spikeGeometry = geometry;
	});