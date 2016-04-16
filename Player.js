var player = {
	obj: null,
	scale: null,
	camera: null,
	targetSize: 1,
	constructor: function(){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0xFF00FF});
		this.obj = new THREE.Mesh(geometry, material);
		this.obj.position.y = 0;

		this.camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
		this.camera.position.set(0, 0, 5);

	},

	update: function (){
		if(this.targetSize > this.scale){
			this.scale += 0.2;
		}
		if(this.targetSize < this.scale){
			this.scale -= 0.2;
		}

		if(keyboard.pressed("space")) this.obj.rotation.z += 0.1;
		if(keyboard.pressed("d")) this.setTargetSize(2);
		if(keyboard.pressed("a")) this.setTargetSize(.5);
		if(!keyboard.pressed("d") && !keyboard.pressed("a")) this.setTargetSize(1);
		
		this.setScale(this.scale);
		this.updateCamera();
	},

	updateCamera: function(){
		//console.log(this.camera.position);
		//this.camera.position.x = this.obj.position.x;
	},

	setTargetSize: function(size){
		this.targetSize = size;
	},

	setScale: function(scale){
		this.obj.scale.set(scale, scale, scale);
		this.obj.position.y = scale / 2 - 1;
	},

	collision: function(){
		return false;
	},

	move: function(velX, velY, velZ){
		this.obj.position.x += velX;
		this.obj.position.y += velY;
		this.obj.position.z += velZ;
	}
}