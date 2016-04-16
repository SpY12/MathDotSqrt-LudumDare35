function init(){
	var composer = new THREE.EffectComposer(webGLRenderer);
	var renderPass = new THREE.RenderPass(scene, camera);
	composer.addPass(renderPass);
}

function bloomOn(){
	var bloomPass = new THREE.BloomPass(3, 25, 5, 256);
	composer.addPass(bloomPass);
}

function bloomOff(){

}