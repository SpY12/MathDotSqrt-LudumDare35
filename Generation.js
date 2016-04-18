var ZERO_FLOOR = {
	heights: [0],
	meshes: [
		floorMesh
	],

	entHeights: [], 
	ents: [
	],
}

var SPIKE_FLOOR = {
	heights: [0, 3],
	meshes: [
		floorMesh,
		ceilingMesh
	],

	entHeights: [0], 
	ents: [
		groundSpike
	],
}

var LASER_FLOOR = {
	heights: [1, 4],
	meshes: [
		floorMesh,
		ceilingMesh
	],

	entHeights: [1], 
	ents: [
		verticleLaser
	],
}

var levelQueue = {
	index: 0,
	data:[
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR,
		SPIKE_FLOOR,
		LASER_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR,
		LASER_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR,
		LASER_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR,
		LASER_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR,
		LASER_FLOOR
	]
}

var material = new THREE.MeshLambertMaterial({
	color: 0xFFFFFF, 
	wireframe: false
});





var queuedGeometry = [];
var loadedGeometry = [];

var queuedEnts = [];
var loadedEnts = [];

function generateChunk(transition){
	if(transition == null) transition = true;

	var index = levelQueue.index;
	if(index == levelQueue.data.length) return;

	var obj = levelQueue.data[index];
	for(var i = 0; i < obj.meshes.length; i++){
		var mesh = obj.meshes[i](index, obj.heights[i]);
		if(!transition){
			mesh.scale.set(1, 1, 1);
			loadedGeometry.push(mesh);
			continue;
		}

		queuedGeometry.push(mesh);
	}

	for(var i = 0; i < obj.ents.length; i++){
		var mesh = obj.ents[i](index, obj.entHeights[i]);
		if(!transition){
			mesh.material.opacity = 1;
			loadedEnts.push(mesh);
			continue;
		}

		queuedEnts.push(mesh);
	}

	levelQueue.index++;
}

function generateChunks(length){
	for(var i = 0; i < length; i++){
		generateChunk(false);
	}
}



function updateGeneration(){
	for(var i = queuedGeometry.length - 1; i >= 0; i--){
		if(queuedGeometry[i].scale.y >= 1){
			queuedGeometry[i].scale.y = 1;
			loadedGeometry.push(queuedGeometry[i]);
			queuedGeometry.splice(i, 1);
			continue;
		}
		
		queuedGeometry[i].scale.y += 0.1 * queuedGeometry[i].scale.y / 1.9;
	}

	for(var i = queuedEnts.length - 1; i >= 0; i--){
		if(queuedEnts[i].material.opacity >= 1){
			queuedEnts[i].material.opacity = 1;
			loadedEnts.push(queuedEnts[i]);
			queuedEnts.splice(i, 1);
			continue;
		}

		queuedEnts[i].material.opacity += 0.1 * queuedEnts[i].material.opacity / 1.9;
	}

	for(var i = 0; i < loadedEnts.length; i++){
		if(loadedEnts[i].name == "laser"){
			loadedEnts[i] = updateLaser(loadedEnts[i])
		}
		
	}

}

function updateLaser(obj){
	obj.laserCooked.update(clock.getElapsedTime());
	//console.log("UPDATE");
	return obj;
}

