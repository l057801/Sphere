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

camera.position.z = 5;


function animate() {
	let rot = document.getElementById('rotation').value / 1000
	requestAnimationFrame( animate );
	cube.rotation.x += rot;
	cube.rotation.y += rot;
	renderer.render( scene, camera );
};

animate();
