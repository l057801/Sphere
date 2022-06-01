
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
	renderer.render( scene, camera );
}
init()
