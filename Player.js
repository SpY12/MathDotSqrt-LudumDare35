var player = {
	obj: null,
	scale: null,
	camera: null,
	targetSize: 1,
	ground: false,

	//1--2
	//|  |
	//3--4

	c1: false,
	c2: false,
	c3: false,
	c4: false,

	constructor: function(){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0xFF00FF});
		this.obj = new THREE.Mesh(geometry, material);
		this.obj.position.y = 0;

		this.camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
		this.camera.position.set(0, 0, 5);

		var light = new THREE.PointLight(0xFFFFFF, .5, 10, 1);
		scene.add(light);

		this.obj.add(light);
	},

	update: function (){
		if(this.targetSize > this.scale){
			this.scale += 0.2;
		}
		if(this.targetSize < this.scale){
			this.scale -= 0.2;
		}

		// if(keyboard.pressed("space")) this.obj.rotation.z += 0.1;
		// if(keyboard.pressed("d")) this.setTargetSize(2);
		// if(keyboard.pressed("a")) this.setTargetSize(.5);
		// if(!keyboard.pressed("d") && !keyboard.pressed("a")) this.setTargetSize(1);
		


		if(keyboard.pressed("w") && (!this.c1 && !this.c2)) this.obj.position.y += 0.1;
		if(keyboard.pressed("s") && (!this.c3 && !this.c4)) this.obj.position.y -= 0.1;
		if(keyboard.pressed("a") && (!this.c1 && !this.c3)) this.obj.position.x -= 0.1;
		if(keyboard.pressed("d") && (!this.c2 && !this.c4)) this.obj.position.x += 0.1;

		if(!this.c3 && !this.c4) this.obj.position.y -= 0.01;

		if(keyboard.pressed("space")) this.obj.position.y += 0.01;
		//this.setScale(this.scale);
	},

	setTargetSize: function(size){
		this.targetSize = size;
	},

	setScale: function(scale){
		this.obj.scale.set(scale, scale, scale);
		this.obj.position.y = scale / 2 - 1;
	},

	collision: function(objs){
		//4--3
		//|  |
		//1--2
		var cX1 = this.obj.position.x - (this.obj.scale.z / 2);
		var cY1 = this.obj.position.y - (this.obj.scale.z / 2);
		
		var cX2 = this.obj.position.x + (this.obj.scale.z / 2);
		var cY2 = this.obj.position.y - (this.obj.scale.z / 2);

		var cX3 = this.obj.position.x + (this.obj.scale.z / 2);
		var cY3 = this.obj.position.y + (this.obj.scale.z / 2);

		var cX4 = this.obj.position.x - (this.obj.scale.z / 2);
		var cY4 = this.obj.position.y + (this.obj.scale.z / 2);

		this.c1 = false;
		this.c2 = false;
		this.c3 = false;
		this.c4 = false;

		for(var i = 0; i < objs.length; i++){
			if(objs[i] == null) continue;
			//1--2
			//|  |
			//3--4
			var x1 = objs[i].geometry.vertices[5].x + objs[i].position.x;
			var y1 = objs[i].geometry.vertices[5].y + objs[i].position.y;

			var x2 = objs[i].geometry.vertices[0].x + objs[i].position.x;
			var y2 = objs[i].geometry.vertices[0].y + objs[i].position.y;

			var x3 = objs[i].geometry.vertices[6].x + objs[i].position.x; 
			var y3 = objs[i].geometry.vertices[6].y + objs[i].position.y;
			
			var x4 = objs[i].geometry.vertices[2].x + objs[i].position.x;
			var y4 = objs[i].geometry.vertices[2].y + objs[i].position.y;

			if(cX1 > x1 && cX1 < x2 && cY1 < y1 && cY1 > y3){
				this.c3 = true;	
			} 
			if(cX2 > x1 && cX2 < x2 && cY2 < y1 && cY2 > y3){
				this.c4 = true;
			}
			if(cX3 > x3 && cX3 < x4 && cY3 > y3 && cY3 < y1){
				this.c2 = true;
			}
			if(cX4 > x3 && cX4 < x4 && cY4 > y3 && cY4 < y1){
				this.c1 = true;
			}

		}

		
		return this.c1 || this.c2 || this.c3 || this.c4;
	},

	move: function(velX, velY, velZ){
		this.obj.position.x += velX;
		this.obj.position.y += velY;
		this.obj.position.z += velZ;
	}
}