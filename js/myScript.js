//THREE JS
let renderer;
let scene;
let camera;
let sphere;

//CANNON
let world;
let sphereBody;

let init = function()
{
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Setup our world
    world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s²

    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        new THREE.MeshBasicMaterial({wireframe: true})
    );
    scene.add(sphere);

    // Create a sphere
    var radius = 1; // m
    sphereBody = new CANNON.Body({
       mass: 5, // kg
       position: new CANNON.Vec3(0, 0, 10), // m
       shape: new CANNON.Sphere(radius)
    });
    world.addBody(sphereBody);

    // Create a plane
    var groundBody = new CANNON.Body({
        mass: 0 // mass == 0 makes the body static
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    world.addBody(groundBody);
};

let animate = function()
{
    requestAnimationFrame(animate);

    //60fps.
    world.step(1/60);

    console.log(sphereBody.position);
    sphere.position.copy(sphereBody.position);
    renderer.render(scene, camera);
}

init();
animate();
