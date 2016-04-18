var THREEx = THREEx || {}

THREEx.LaserCooked	= function(laserBeam){
	// for update loop
	this.update	= function(time){
		if(~~time % 2 == 0){
			object3d.scale.x = 3;
			sprite.scale.x = 1/3;	
		}
		else{
			object3d.scale.x = 0;
			sprite.scale.x = 0;
		}
	}
	
	var object3d	= laserBeam.object3d

	// build THREE.Sprite for impact
	var textureUrl	= 'http://upload3dprint.com/ludumdare/res/img/particles/blue_particle.jpg';
	var texture	= THREE.ImageUtils.loadTexture(textureUrl)	
	var material	= new THREE.SpriteMaterial({
		map			: texture,
		blending		: THREE.AdditiveBlending,
		useScreenCoordinates	: false,
	})
	var sprite	= new THREE.Sprite(material)
	sprite.scale.set(1, 1, 1).multiplyScalar(2)
	sprite.position.x	= 1
	object3d.add(sprite)


	// add a point light
	var light	= new THREE.PointLight( 0x4444ff, 10 );
	light.intensity	= 2
	light.distance	= 4
	light.position.x= -0.05
	this.light	= light
	//sprite.add(light)
}

