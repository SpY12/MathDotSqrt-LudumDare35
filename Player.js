var player = {
	obj: null,
	scale: null,
	camera: null,
	targetSize: 1,
	ground: false,
	isAlive: false,

	//1--2
	//|  |
	//3--4

	c1: false,
	c2: false,
	c3: false,
	c4: false,

	c1XY: {x: null, y: null, cX: false, cY: false},
	c2XY: {x: null, y: null, cX: false, cY: false},
	c3XY: {x: null, y: null, cX: false, cY: false},
	c4XY: {x: null, y: null, cX: false, cY: false},

	up: true,
	down: true,
	left: true,
	right: true,

	velX: 0,
	velY: 0,

	gravity: .03,
	friction: .01,

	constructor: function(){
		this.isAlive = true;

		var geometry = new THREE.BoxGeometry(1, 1, 1);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, .5, 0) );
		var material = new THREE.MeshBasicMaterial({color: 0xFF00FF, wireframe: true});
		this.obj = new THREE.Mesh(geometry, material);
		
		this.obj.position.y = 0;

		this.camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, .1, 1000);
		this.camera.position.set(0, 0, 5);

		var light = new THREE.PointLight(0xFFFFFF, .5, 10, 1);
		scene.add(light);

		this.obj.add(light);
	},

	update: function (){
		if(this.isAlive) score++;

		if((this.camera.position.x - this.obj.position.x > 4  || this.obj.position.y < -10) && this.isAlive){ 
			soundEffects.death();
			this.isAlive = false;
			deathScreen();
		}
		if(!this.isAlive){
			if(this.camera.rotation.y >= Math.PI){
				
			}
			else this.camera.rotation.y += 0.01;
			return;
		}

		this.collision(loadedGeometry);
		this.ground = !this.down;

		if(keyboard.pressed("space") && this.ground) this.velY = .4;

		if(this.down || this.velY > 0) this.velY -= this.gravity;
		else this.velY = 0;

		this.obj.position.y += this.velY;

		if(this.right) this.obj.position.x += 1 / 11;
		this.camera.position.x += 1 / 10;


		if(this.targetSize > this.scale){
			this.scale += 0.2;
		}
		if(this.targetSize < this.scale){
			this.scale -= 0.2;
		}
		this.setScale(this.scale);
	},

	setTargetSize: function(size){
		this.targetSize = size;
	},

	setScale: function(scale){
		this.obj.scale.set(scale, scale, scale);
		//this.obj.position.y = scale / 2 - 1;
	},
	collision: function(objs){
		//1--2
		//|  |
		//3--4
		var cx1 = this.obj.position.x - (this.obj.scale.z / 2);// + this.velX;
		var cy1 = this.obj.position.y + (this.obj.scale.z);// + this.velY;

		var cx2 = this.obj.position.x + (this.obj.scale.z / 2);// + this.velX;
		var cy2 = this.obj.position.y + (this.obj.scale.z); //+ this.velY;

		var cx3 = this.obj.position.x - (this.obj.scale.z / 2);// + this.velX;
		var cy3 = this.obj.position.y;// + this.velY; //- (this.obj.scale.z / 2);
		
		var cx4 = this.obj.position.x + (this.obj.scale.z / 2);// + this.velX;
		var cy4 = this.obj.position.y;// + this.velY;// - (this.obj.scale.z / 2);

		this.c1 = false;
		this.c2 = false;
		this.c3 = false;
		this.c4 = false;

		this.c1XY = {x: null, y: null, cX: false, cY: false};
		this.c2XY = {x: null, y: null, cX: false, cY: false};
		this.c3XY = {x: null, y: null, cX: false, cY: false};
		this.c4XY = {x: null, y: null, cX: false, cY: false};
		
		this.up = true;
		this.down = true;
		this.left = true;
		this.right = true;

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

			//cXY bounding box
			//4--3
			//|  |
			//2--1

			if(cx1 >= x1 && cx1 <= x2 && cy1 >= y3 && cy1 <= y1){
				this.c1 = true;
				this.c1XY.x = x2;
				this.c1XY.y = y3;
			}

			if(cx2 >= x1 && cx2 <= x2 && cy2 >= y3 && cy2 <= y1){
				this.c2 = true;
				this.c2XY.x = x1;
				this.c2XY.y = y3;
			}

			if(cx3 >= x1 && cx3 <= x2 && cy3 >= y3 && cy3 <= y1){
				this.c3 = true;
				this.c3XY.x = x2;
				this.c3XY.y = y1;
			}

			if(cx4 >= x1 && cx4 <= x2 && cy4 >= y3 && cy4 <= y1){
				this.c4 = true;
				this.c4XY.x = x1;
				this.c4XY.y = y1;
			}
		}

		if(this.c1){
			var diffX = Math.abs(this.c1XY.x - cx1);
			var diffY = Math.abs(this.c1XY.y - cy1);

			if(diffX > diffY){
				this.obj.position.y = this.c1XY.y - this.obj.scale.z;
				this.up = false;
			}
			if(diffX < diffY){
				this.obj.position.x = this.c1XY.x + this.obj.scale.z / 2;
				this.left = false;
			}
		}
		if(this.c2 ){
			var diffX = Math.abs(this.c2XY.x - cx2);
			var diffY = Math.abs(this.c2XY.y - cy2);
			if(diffX > diffY){
				this.obj.position.y = this.c2XY.y - this.obj.scale.z;
				this.up = false;
			}
			if(diffX < diffY){
				this.obj.position.x = this.c2XY.x - this.obj.scale.z / 2;
				this.right = false;
			}
		}
		if(this.c3){
			var diffX = Math.abs(this.c3XY.x - cx3);
			var diffY = Math.abs(this.c3XY.y - cy3);
			if(diffX > diffY){
				this.obj.position.y = this.c3XY.y;
				this.down = false;
			}
			if(diffX < diffY){
				this.obj.position.x = this.c3XY.x + this.obj.scale.z / 2;
				this.left = false;
			}
		}
		if(this.c4){
			var diffX = Math.abs(this.c4XY.x - cx4);
			var diffY = Math.abs(this.c4XY.y - cy4);
			if( diffX > diffY){
				this.obj.position.y = this.c4XY.y;
				this.down = false;
			}
			if( diffX < diffY){
				this.obj.position.x = this.c4XY.x - this.obj.scale.z / 2;
				this.right = false;
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