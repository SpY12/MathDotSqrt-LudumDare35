var player = {
	obj: null,
	size: null,
	camera: null,
	targetSize: 1,
	constructor: function(){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0xFF00FF});
		this.obj = new THREE.Mesh(geometry, material);
		this.obj.position.y = -2;

		this.camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
		this.camera.position.set(0, 0, 5);

	},

	update: function (){
		if(this.targetSize > this.size){
			this.size += 0.2;
		}
		if(this.targetSize < this.size){
			this.size -= 0.2;
		}

		if(keyboard.pressed("space")) this.obj.rotation.z += 0.1;
		if(keyboard.pressed("up")) this.setTargetSize(2);
		if(keyboard.pressed("down")) this.setTargetSize(.5);

		this.setScale(this.size);
		this.updateCamera();
	},

	updateCamera: function(){
		//console.log(this.camera.position);
		//this.camera.position.x = this.obj.position.x;
	},

	setTargetSize: function(size){
		this.targetSize = size;
	},

	setScale: function(size){
		this.obj.scale.set(size, size, size);
		this.obj.position.y = size / 2 - 1.5;
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