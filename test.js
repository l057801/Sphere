function init(){
	// renderer
	const container = document.getElementById('canvas')
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( container.clientHeight, container.clientWidth);
	container.appendChild( renderer.domElement )
	
	// scene
	const scene = new THREE.Scene();

	// camera
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 20, 20, 20);
	camera.lookAt( 0, 0, 0 );
	
	// cube geometry
	const cube_geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( cube_geometry, material );
	scene.add( cube );
	
	// spehere geometry
	//let sphere_geometry = new THREE.BufferGeometry();

	// animate
	animate()
}


function animate() {
	let rot = document.getElementById('rotation').value / 1000
	requestAnimationFrame( animate );
	cube.rotation.x += rot;
	cube.rotation.y += rot;
	
	if (lines){
		lines.forEach(line => {line.dispose()});
	}

	lines = sphere();
	renderer.render( scene, camera );

};


function sphere() {

	const points = [];
	let latPts = document.getElementById('latitude').value;
	let longPts = document.getElementById('longitude').value;

	const R = 10;

	deltaTheta = Math.PI / latPts;
	deltaPsi = 2 * Math.PI / longPts;
	console.log('No: ' + latPts + ' - deltaTheta: ' + deltaTheta)
	console.log('No: ' + longPts + ' - deltaPsi: ' + deltaPsi)
	for (let i = 0; i < latPts + 1; i++){
		z = Math.cos(i * deltaTheta) * R;
		Rlevel = Math.sin(i * deltaTheta) * R ; 
		let row = [];
		for (let v = 0; v < longPts + 1; v++){
			x = Math.cos(v * deltaPsi) * Rlevel;
			y = Math.sin(v * deltaPsi) * Rlevel;
			row.push(new THREE.Vector3(x,y,z));
		}
		points.push(row);
		
	}
	
	let lines = [];
	for (let i = 0; i < points.length; i++){ 
		let geometry = new THREE.BufferGeometry().setFromPoints(points[i]);
		let line = new THREE.Line( geometry, material );
		scene.add ( line );
		lines.push(line);
	}
	return lines;
}

init()
