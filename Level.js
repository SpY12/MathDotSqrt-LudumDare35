var p;

var hasStarted = false;
var isFalling = false;
var velY = 0;

var arrow = null;
var select = true;
var hasSubmitted = false;

function initLevel(){//biggy
	p = Object.create(player);
	p.constructor();
	scene.add(p.obj);
	initAudio();
	initLights();

	//var Ambient = new THREE.AmbientLight(0x404040);
	//scene.add(Ambient);

	p.obj.position.x = 0;
	p.camera.position.x = 0;
	p.camera.position.y = 100;

	createText("Cube Shift", 4, -12, 100, -10);
	createText("Press Space to Play", 1.5, -9, 96, -10);


	generateChunks(15);
}

var tick = 0;

function updateLevel(){
	if(p.isAlive){
		if(hasStarted) p.update();
		else{
			if(!isFalling) getCamera().position.y = Math.sin(clock.getElapsedTime()) / 10 + 100;
			if(keyboard.pressed("space")) isFalling = true;
		} 

		if(isFalling && !hasStarted){
			velY += 0.01;
			getCamera().position.y -= velY;
			if(getCamera().position.y <= 1){
				getCamera().position.y = 1;
				hasStarted = true;
			}
		}
		updateAudio();
		updateLights();
		;
	}else{
		p.velXCam -= 0.001;

		if(p.velXCam <= 0){
			p.velXCam = 0;
			p.velZCam -= 0.01;
			if(getCamera().position.z < - 15){
				p.velZCam = 0;
				if(keyboard.pressed("up") || keyboard.pressed("w")){
					arrow.position.set(getCamera().position.x - 8.5, 3.5, -30);
					select = true;
				}
				else if(keyboard.pressed("down") || keyboard.pressed("s")){
					arrow.position.set(getCamera().position.x - 12.5, 0.5, -30);
					select = false;
				}

				if(keyboard.pressed("space") || keyboard.pressed("enter")){
					if(select && !hasSubmitted){
						hasSubmitted = true;
						$.ajax({
							url: "savescores.php",
							type: "POST",
							data: { name: "anonymous", score: getScore() },
							cache: false,
							success: function(response) {
								$('#fromAjax').html(response);
							}
						}).done(function(){
							location.reload();
						});
						
					}
					else if(!hasSubmitted){
						hasSubmitted = true;
						submitScore()
					}
				}
			} 
		} 
		

		getCamera().position.x += p.velXCam;
		getCamera().position.z += p.velZCam;
	}

	if(tick % 10 == 1) generateChunk();

	if(hasStarted) tick++;

	updateGeneration();
}

function dead(){
	p.isAlive = false;
	stopMusic();
	soundEffects.death();

	createText("Smack Space to Select", .5, getCamera().position.x - 3, -1, -30)

	createText("Replay", 2, getCamera().position.x - .6, 3, -30);
	createText("Submit Score", 2, getCamera().position.x - 3.4, 0, -30);
	arrowGeometry;
	var material = new THREE.MeshBasicMaterial({
		color: 0xFFFF00
	});

	arrow = new THREE.Mesh(arrowGeometry, material);
	
	arrow.scale.set(.03, .03, .03);
	arrow.position.set(getCamera().position.x - 6.5, 3.5, -30);
	scene.add(arrow); 
}

function getCamera(){
	return p.camera;
}