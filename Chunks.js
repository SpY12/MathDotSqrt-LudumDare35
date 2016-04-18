OBJ = {
	heights: [],
	meshes: [],

	entHeights: [], 
	ents: [],
}

function HOLE(){
	return {
		heights: [],
		meshes: [],

		entHeights: [], 
		ents: [],
	};
}

function FLOOR(height){
	return {
		heights: [height],
		meshes: [
			floorMesh
		],

		entHeights: [], 
		ents: [],
	}
}

function CEILING(height){
	return {
		heights: [height],
		meshes: [ceilingMesh],

		entHeights: [], 
		ents: [],
	}
}

function FLOOR_CEILING(height, gap){
	return {
		heights: [height, height + gap],
		meshes: [
			floorMesh,
			ceilingMesh
		],

		entHeights: [], 
		ents: [],
	}
}

function SPIKE_FLOOR(height){
	return {
		heights: [height],
		meshes: [
			floorMesh
		],

		entHeights: [height], 
		ents: [
			groundSpike
		],
	}
}

function SPIKE_FLOOR_CEILING(height, gap){
	return {
		heights: [height, height + gap],
		meshes: [
			floorMesh,
			ceilingMesh
		],

		entHeights: [height], 
		ents: [
			groundSpike
		],
	}
}

function LASER_FLOOR(height, gap){
	return{
		heights: [height, height + gap],
		meshes: [
			floorMesh,
			ceilingMesh
		],

		entHeights: [height], 
		ents: [
			verticleLaser
		],
		laserHeight: gap
	}
}

