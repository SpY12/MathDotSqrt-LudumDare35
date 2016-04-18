var material = new THREE.MeshLambertMaterial({
	color: 0xFFFFFF, 
	wireframe: false
});


function floorMesh(index, height){
	var meshHeight = 8;

	var geometry = new THREE.BoxGeometry(1, meshHeight + height, 2);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, (meshHeight + height) / 2, 0));
	geometry.computeBoundingBox();
	geometry.originOffset = (meshHeight + height) / 2;

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = index;
	mesh.position.y = -meshHeight;
	cube = new THREE.BoxHelper( mesh );
	cube.material.color.set( 0x00ff00 );
	scene.add( cube );

	mesh.scale.set(1, .01, 1);

	scene.add(mesh);
	
	return mesh;
}

function ceilingMesh(index, height){
	var meshHeight = 8;

	var geometry = new THREE.BoxGeometry(1, meshHeight - height, 2);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -(meshHeight - height) / 2, 0));
	geometry.originOffset = -(meshHeight - height) / 2;
	geometry.computeBoundingBox()
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = index;
	mesh.position.y = meshHeight;

	cube = new THREE.BoxHelper( mesh );
	cube.material.color.set( 0x00ff00 );
	scene.add( cube );

	mesh.scale.set(1, .01, 1);

	scene.add(mesh);
	return mesh;
}

function groundSpike(index, height){
	var geometry;
	if(offWeb) geometry = new THREE.BoxGeometry(1, 1, 1);
	else geometry = groundSpikeGeometry;

	// geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1/2, 0));
	geometry.originOffset = 0;

	var material = new THREE.MeshBasicMaterial({
		color: 0x00FF00,
		transparent: true,
		opacity: 0.01
	});

	var mesh = new THREE.Mesh(geometry, material);
	if(!offWeb) mesh.scale.set(0.01, 0.01, 0.01);
	mesh.geometry.computeBoundingBox();
	mesh.geometry.boundingBox.min.x *= mesh.scale.x;
	mesh.geometry.boundingBox.max.x *= mesh.scale.x;
	mesh.geometry.boundingBox.min.y = 0;//mesh.scale.y;
	mesh.geometry.boundingBox.max.y = 1;//mesh.scale.y;

	mesh.position.x = index;
	mesh.position.y = height;

	mesh.name = "spike";
	scene.add(mesh);

	// var frame = new THREE.WireframeHelper( mesh );
	// frame.material.color.set( 0x00ff00 );
	// scene.add( frame );


	return mesh;
}

function ceilingSpike(index, height){
	var geometry;
	if(offWeb) geometry = new THREE.BoxGeometry(1, 1, 1);
	else geometry = ceilingSpikeGeometry;

	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1/2, 0));
	geometry.originOffset = 1 / 2;

	var material = new THREE.MeshLambertMaterial({
		color: 0x00FF00,
		transparent: true,
		opacity: 0.01
	});

	var mesh = new THREE.Mesh(geometry, material);
	if(!offWeb) mesh.scale.set(0.01, 0.01, 0.01);
	mesh.geometry.computeBoundingBox();
	mesh.geometry.boundingBox.min.x *= mesh.scale.x;
	mesh.geometry.boundingBox.max.x *= mesh.scale.x;
	mesh.geometry.boundingBox.min.y = -.1;//mesh.scale.y;
	mesh.geometry.boundingBox.max.y = 1;//mesh.scale.y;

	mesh.position.x = index;
	mesh.position.y = height - .9 / 2;

	mesh.name = "spike";
	scene.add(mesh);

	var frame = new THREE.WireframeHelper( mesh );
	frame.material.color.set( 0x00ff00 );
	scene.add( frame );


	return mesh;
}

function verticleLaser(index, height, length){
	if(length == null) length = 1;

	var geometry = new THREE.BoxGeometry(.5, .1, .5);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, .1 / 2, 0));
	geometry.originOffset = .1 / 2;

	var material = new THREE.MeshLambertMaterial({
		color: 0xFF0000,
		transparent: true,
		opacity: 0.01
	});

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = index;
	mesh.position.y = height;

	mesh.name = "laser";
	scene.add(mesh);
	
	laserBeam = new THREEx.LaserBeam();
	mesh.add(laserBeam.object3d);
	mesh.laserCooked = new THREEx.LaserCooked(laserBeam, length);

	mesh.geometry.computeBoundingBox();
	mesh.geometry.boundingBox.min.x = -.2;
	mesh.geometry.boundingBox.max.x = .2;
	mesh.geometry.boundingBox.min.y = 0;
	mesh.geometry.boundingBox.max.y = 0;

	return mesh;
}