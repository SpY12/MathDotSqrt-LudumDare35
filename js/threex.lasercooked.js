var THREEx = THREEx || {}

THREEx.LaserCooked	= function(laserBeam, height){
	// for update loop
	var isUp = false;
	if (height == null) height = 3;
	this.update	= function(time){
		
		if(~~time % 5 != 0){
			isUp = true;
			object3d.scale.y = height;//Math.sin(clock.getElapsedTime());
			sprite.scale.y = 1 / object3d.scale.y;
		}
		else{
			isUp = false;
			object3d.scale.y = 0.000;//Math.sin(clock.getElapsedTime());
			sprite.scale.y = 1 / object3d.scale.y;
		}
	}

	this.isUp = function(){
		return isUp;
	}

	this.getHeight = function(){
		return height;
	}
	
	var object3d = laserBeam.object3d

	// build THREE.Sprite for impact
	var textureUrl	= 'http://upload3dprint.com/ludumdare/res/img/particles/blue_particle.jpg';
	var texture	= THREE.ImageUtils.loadTexture(textureUrl)	
	var material = new THREE.SpriteMaterial({
		map: texture,
		blending: THREE.AdditiveBlending,
		useScreenCoordinates: false,
	})

	var sprite	= new THREE.Sprite(material)
	//sprite.scale.set(1, 1, 1).multiplyScalar(2)
	sprite.position.y = 1
	object3d.add(sprite)


	// add a point light
	var light	= new THREE.PointLight( 0x4444ff, 10 );
	light.intensity	= 2;
	light.distance	= 4;
	light.position.x= -0.05;
	this.light	= light;
	//sprite.add(light)

	object3d.scale.y = 0;
	sprite.scale.y = 0;
}

