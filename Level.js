var p;
function initLevel(){
	p = Object.create(player);
	p.constructor();

	scene.add(p.obj);

	initAudio();

}

function updateLevel(){
	p.update();
}