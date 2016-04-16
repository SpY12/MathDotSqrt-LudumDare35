var FLAT_FLOOR = { yHeight: 0, clipHeight: -1 };
var HOLE = {yHeight: -1, clipHeight: -1};

var level1Queue = {
	index: 0,
	data:[
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		FLAT_FLOOR,
		HOLE,
		FLAT_FLOOR,
		HOLE,
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
			clipHeight: 0
		},
		{
			yHeight: 0,
			clipHeight: 1
		},
		{
			yHeight: 0,
			clipHeight: 2
		},
		{
			yHeight: 0,
			clipHeight: 2
		},
		{
			yHeight: 1,
			clipHeight: 2
		},
		{
			yHeight: 1,
			clipHeight: 3
		},
		{
			yHeight: 1,
			clipHeight: 2
		}
		
	]
}


var queuedGeometry = [];

var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

function generateChunk(transition){
	if(transition == null) transition = true;

	if(level1Queue.index == level1Queue.data.length) return;

	var index = level1Queue.index;

	if(level1Queue.data[index].yHeight != -1){
		var floorGeometry = new THREE.BoxGeometry(1, 5, 2);
		floorGeometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 2.5, 0) );
		var floor = new THREE.Mesh(floorGeometry, material)
		floor.position.y = level1Queue.data[index].yHeight - 6.5;
		floor.position.x = index;
		floor.scale.set(1, .01, 1);
		scene.add(floor);

		queuedGeometry.push({obj: floor, exp: 5, transition: transition});
	}

	if(level1Queue.data[index].clipHeight != -1){
		var wallGeometry = new THREE.BoxGeometry(1, 5, 2);
		wallGeometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, -2.5, 0) );
		var wall = new THREE.Mesh(wallGeometry, material);
		wall.position.y = level1Queue.data[index].clipHeight + 5 - 1.5;
		wall.position.x = index;
		wall.scale.set(1, .01, 1);
		scene.add(wall);

		queuedGeometry.push({obj: wall, exp: 5, transition: transition});
	}

	level1Queue.index++;

}

function generateChunks(length){
	for(var i = 0; i < length; i++){
		generateChunk(false);
	}
}

function updateGeneration(){
	for(var i = queuedGeometry.length - 1; i >= 0; i--){
		if(queuedGeometry[i].obj.scale.y >= 1 || !queuedGeometry[i].transition ){
			queuedGeometry[i].obj.scale.y = 1;
			queuedGeometry.splice(i, 1);
			continue;
		}

		if(queuedGeometry[i].obj.scale.y <= 1){
			queuedGeometry[i].obj.scale.y += 0.1;
		}
			
	}
}

