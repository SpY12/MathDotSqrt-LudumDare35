var WIDTH, HEIGHT;
var DELTA;
var scene, camera, renderer;
var clock, stats;

var debug = false;

function init(){
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
	camera.position.z = 5;

	if(!debug) initLevel();

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
	updateLevel();
}

var count = 0;

function animate(){
	DELTA = clock.getDelta();
	
	stats.begin();
    requestAnimationFrame(animate);
    update();
	if(!debug) renderer.render(scene, getCamera());
	else renderer.renderer(scene, camera);
	stats.end();
}