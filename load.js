var loader = new THREE.JSONLoader();
	
var groundSpikeGeometry = null;
var ceilingSpikeGeometry = null;
var arrowGeometry = null;

loader.load("http://upload3dprint.com/ludumdare/res/model/groundSpike.js", function(geometry, materials){
		groundSpikeGeometry = geometry;
	});

loader.load("http://upload3dprint.com/ludumdare/res/model/ceilingSpike.js", function(geometry, materials){
		ceilingSpikeGeometry = geometry;
	});

loader.load("http://upload3dprint.com/ludumdare/res/model/arrow.js", function(geometry, materials){
		arrowGeometry = geometry;
	});