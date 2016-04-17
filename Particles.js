
function generateVoidParticles(){
	console.log("Particles");
	var particleCount = 1000;
	var particles = new THREE.Geometry();
	
	THREE.ImageUtils.crossOrigin = '';
	var particleTexture = THREE.ImageUtils.loadTexture('http://upload3dprint.com/ludumdare/res/img/particles/particle2.png');
	particleTexture.minFilter = THREE.LinearFilter;
	
	pMaterial = new THREE.PointsMaterial({
		color: 0xFFFFFF,
		map: particleTexture, 
		transparent: true,
		size: 4
	});



	for(var p = 0; p < particleCount; p++){
		var pX = Math.random() * 500 - 250,
     	pY = Math.random() * 500 - 250,
      	pZ = Math.random() * 500 - 250,
      	particle = new THREE.Vector3(pX, pY, pZ);

  		particles.vertices.push(particle);
	}

	var particleSystem = new THREE.ParticleSystem(particles, pMaterial);
	particleSystem.sortParticles = true;

	scene.add(particleSystem);
}