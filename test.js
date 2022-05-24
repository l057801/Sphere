const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const container = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer();
renderer.setSize( container.clientHeight, container.clientWidth);
container.appendChild( renderer.domElement )

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//camera.position.z = 5;
camera.position.set( 20, 20, 20);
camera.lookAt( 0, 0, 0 );

function animate() {
	let rot = document.getElementById('rotation').value / 1000
	requestAnimationFrame( animate );
	cube.rotation.x += rot;
	cube.rotation.y += rot;
	lines = sphere();
	renderer.render( scene, camera );

	for (i = 0; i < lines.length; i++) {
		scene.remove(lines[i]);
	}
};

animate();

function sphere() {

	const points = [];
	let latPts = document.getElementById('latitude').value;
	let longPts = document.getElementById('longitude').value;

	const R = 10;

	deltaTheta = Math.PI / latPts;
	deltaPsi = 2 * Math.PI / longPts;

	for (let i = 3; i < latPts + 1; i++){
		z = Math.cos(i * deltaTheta) * R;
		Rlevel = Math.sin(i * deltaTheta) * R ; 
		let row = [];
		for (let v = 3; v < longPts + 1; v++){
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

