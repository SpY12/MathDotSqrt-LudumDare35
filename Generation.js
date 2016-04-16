var FLAT_FLOOR = { yHeight: 0, clipHeight: -1 };


var level1Queue = {
	index: 0,
	data:[
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		{
			yHeight: -1,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: 2
		},
		{
			yHeight: 1,
			clipHeight: 1
		},
		{
			yHeight: 2,
			clipHeight: .5
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		},
		{
			yHeight: 0,
			clipHeight: -1
		}
	]
}


var queuedGeometry = [];

var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

function generateChunk(){
	if(level1Queue.index == level1Queue.data.length) return;

	var index = level1Queue.index;

	if(level1Queue.data[index].yHeight != -1){
		floorGeometry = new THREE.BoxGeometry(1, 5, 2);
		var floor = new THREE.Mesh(floorGeometry, material)
		floor.position.y = 0;
		floor.position.x = index;
		floor.scale.set(1, .01, 1);
		scene.add(floor);

		queuedGeometry.push({obj: floor, exp: 5, transition: true});
	}

	if(level1Queue.data[index].clipHeight != -1){
		var wall = new THREE.Mesh(floorGeometry, material)
		wall.position.y = 0
		wall.position.x = index;
		floor.scale.set(1, 0, 1);
		scene.add(wall);

		queuedGeometry.push({obj: wall, exp: 5, transition: true});
	}

	level1Queue.index++;

}

function generateChunks(length){
	for(var i = 0; i < length; i++){
		generateChunk();
	}
}

function updateGeneration(){
	for(var i = queuedGeometry.length - 1; i >= 0; i--){
		if(queuedGeometry[i].obj.scale.y >= 1 || !queuedGeometry[i].transition ){
			queuedGeometry[i].obj.scale.y = 1;
			queuedGeometry[i].obj.position.y = -queuedGeometry[i].exp;
			queuedGeometry.splice(i, 1);
			continue;
		}

		if(queuedGeometry[i].obj.scale.y <= 1){

			queuedGeometry[i].obj.scale.y += 0.01;
			queuedGeometry[i].obj.position.y = -queuedGeometry[i].exp * queuedGeometry[i].obj.scale.y;
		}
			
	}
}

