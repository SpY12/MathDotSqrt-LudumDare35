var WIDTH, HEIGHT;
var DELTA;
var scene, fog, camera, renderer;
var clock, stats;

var debug = false;
var offWeb = true;
var laserBeam = null;
var laserCooked = null;
var cube;

function init(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	scene = new THREE.Scene();
 
	camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
	camera.position.z = 5;

	if(!debug) initLevel();

	// laserBeam = new THREEx.LaserBeam();
	// scene.add(laserBeam.object3d);
	// laserCooked	= new THREEx.LaserCooked(laserBeam);

	clock = new THREE.Clock(true);

	stats = new Stats();
	stats.setMode(0);

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor(0);
	renderer.setSize(WIDTH, HEIGHT);
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	document.body.appendChild(renderer.domElement);
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	if(!debug){
		getCamera().aspect = WIDTH / HEIGHT;
		getCamera().updateProjectionMatrix();
	}

	renderer.setSize(WIDTH, HEIGHT);
}

function update(){
	if(!debug) updateLevel();
	// laserCooked.update(1 / 60, clock.getElapsedTime());
	// laserBeam.object3d.rotation.z += 0.01;
}

var count = 0;

function animate(){
	DELTA = clock.getDelta();
	
	stats.begin();
    requestAnimationFrame(animate);
    update();
	if(!debug) renderer.render(scene, getCamera());
	else renderer.render(scene, camera);
	stats.end();
}