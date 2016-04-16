var level1Queue = {
	index: 0,
	data:[
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
		}
	]
}

var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

function generateChunk(){
	if(level1Queue.index == level1Queue.data.length) return;

	var index = level1Queue.index;

	floorGeometry = new THREE.BoxGeometry(1, 5, 2);
	var floor = new THREE.Mesh(floorGeometry, material)
	floor.position.y = level1Queue.data[index].yHeight - 5 / 2 - 1;
	floor.position.x = index;
	scene.add(floor);

	if(level1Queue.data[index].clipHeight != -1){
		var wall = new THREE.Mesh(floorGeometry, material)
		wall.position.y = floor.position.y + 5 + level1Queue.data[index].clipHeight;
		wall.position.x = index;
		scene.add(wall);
	}

	level1Queue.index++;	

}

