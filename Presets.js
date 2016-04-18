var presets = [
	[
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 1),
		FLOOR_CEILING(0, .5),
		FLOOR_CEILING(0, 1),
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 3)
	],
	[
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 1),
		FLOOR_CEILING(0, .5),
		LASER_FLOOR(0, 3),
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 3)
	],
	[
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 1),
		FLOOR_CEILING(0, .5),
		SPIKE_FLOOR(1),
		SPIKE_FLOOR_CEILING(1, 3),
		FLOOR_CEILING(0, 2),
		FLOOR_CEILING(0, 3)
	],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];

function getRandomPreset(lastHeight){
	index = randomInt(0, 2);
	for(var i = 0; i < presets[index].length; i++){
		levelQueue.data.push(presets[index][i]);
	}
}