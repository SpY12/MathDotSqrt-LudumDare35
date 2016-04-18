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

var levelQueue = {
	index: 0,
	data:[
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		ZERO_FLOOR,
		SPIKE_FLOOR
	]
}

var material = new THREE.MeshLambertMaterial({
	color: 0xFFFFFF, 
	wireframe: false
});

var entMaterial = new THREE.MeshLambertMaterial({
	color: 0xFF7733,
	transparent: true,
	opacity: 0.001
});

function floorMesh(index, height){
	var meshHeight = 8;

	var geometry = new THREE.BoxGeometry(1, meshHeight + height, 2);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, (meshHeight + height) / 2, 0));
	geometry.computeBoundingBox();
	geometry.originOffset = (meshHeight + height) / 2;

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = index;
	mesh.position.y = -meshHeight;
	cube = new THREE.BoxHelper( mesh );
	cube.material.color.set( 0x00ff00 );
	scene.add( cube );

	mesh.scale.set(1, .01, 1);

	scene.add(mesh);
	
	return mesh;
}

function ceilingMesh(index, height){
	var meshHeight = 8;

	var geometry = new THREE.BoxGeometry(1, meshHeight - height, 2);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -(meshHeight - height) / 2, 0));
	geometry.originOffset = -(meshHeight - height) / 2;
	geometry.computeBoundingBox()
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = index;
	mesh.position.y = meshHeight;

	cube = new THREE.BoxHelper( mesh );
	cube.material.color.set( 0x00ff00 );
	scene.add( cube );

	mesh.scale.set(1, .01, 1);

	scene.add(mesh);
	return mesh;
}

function groundSpike(index, height){
	var geometry = spikeGeometry; //new THREE.BoxGeometry(1, 1, 1);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1/2, 0));
	geometry.originOffset = 1/2;

	var material = new THREE.MeshLambertMaterial({
		color: 0x00FF00,
		transparent: true,
		opacity: 0.01
	});

	var mesh = new THREE.Mesh(geometry, material);
	mesh.scale.set(0.02, 0.01, 0.02);
	mesh.geometry.computeBoundingBox();
	mesh.geometry.boundingBox.min.x *= 0.02;
	mesh.geometry.boundingBox.max.x *= 0.02;
	mesh.geometry.boundingBox.min.y *= 0.01;
	mesh.geometry.boundingBox.max.y *= 0.01;
	mesh.position.x = index;
	mesh.position.y = height - .5;

	var frame = new THREE.WireframeHelper( mesh );
	frame.material.color.set( 0x00ff00 );
	scene.add( frame );

	scene.add(mesh);

	return mesh;
}

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


}

