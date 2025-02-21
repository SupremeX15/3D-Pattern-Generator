
let scene, camera, renderer, particles, light;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particles = new THREE.Group();
    scene.add(particles);

    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    for (let i = 0; i < 100; i++) {
        let geometry = new THREE.SphereGeometry(0.15, 32, 32);
        let material = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            metalness: 0.5,
            roughness: 0.4,
        });
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            Math.random() * 6 - 3,
            Math.random() * 6 - 3,
            Math.random() * 6 - 3
        );
        particles.add(sphere);
    }
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.005;
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document
    .getElementById("complexity")
    .addEventListener("input", (event) => {
        let value = event.target.value;
        particles.children.forEach((p) =>
            p.scale.set(value / 5, value / 5, value / 5)
        );
    });

init();
