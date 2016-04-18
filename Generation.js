

var levelQueue = {
	index: 0,
	data:[
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0),
		FLOOR(0)
	]
}


var queuedGeometry = [];
var loadedGeometry = [];

var queuedEnts = [];
var loadedEnts = [];

function generatePresets(){

}

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
		var mesh = obj.ents[i](index, obj.entHeights[i], obj.laserHeight);
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
	if(loadedGeometry[loadedGeometry.length - 1].position.x - p.obj.position.x < 5){
		getRandomPreset();
	}


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

	if(obj.laserCooked.isUp()) obj.geometry.boundingBox.max.y = 2 * obj.laserCooked.getHeight();
	else obj.geometry.boundingBox.max.y = 0
	return obj;
}

