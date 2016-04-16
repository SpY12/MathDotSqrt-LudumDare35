var player = {
	obj: null,
	constructor: function(){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({color: 0xFF00FF});
		this.obj = new THREE.Mesh(geometry, material);
	},

	update: function (){
		var scale = Math.sin(clock.getElapsedTime());
		this.obj.scale.set(scale, scale, scale);
	}
}