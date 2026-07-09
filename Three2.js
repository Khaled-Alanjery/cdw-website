(function () {
  const container = document.getElementById('threejs-2');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f1118);
  scene.fog = new THREE.FogExp2(0x0f1118, 0.03);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(46, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2.8, 5.8);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.9;
  controls.minDistance = 3;
  controls.maxDistance = 14;
  controls.target.set(0, 0.2, 0);

  const ambient = new THREE.AmbientLight(0x9ab7ff, 0.25);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(4, 6, 2);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x6bffcb, 18, 20, 2);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  const group = new THREE.Group();
  scene.add(group);

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x7a8cff,
    roughness: 0.35,
    metalness: 0.1,
    emissive: 0x050816
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x6bf7c1,
    roughness: 0.2,
    metalness: 0.2,
    emissive: 0x03120d
  });

  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4, 4, 4, 4), baseMaterial);
  cube.position.y = 0.2;
  group.add(cube);

  const pyramid = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 5), accentMaterial);
  pyramid.position.set(0, 1.2, 0);
  group.add(pyramid);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 12, 140), accentMaterial);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.7;
  group.add(ring);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(6, 64),
    new THREE.MeshStandardMaterial({ color: 0x131725, roughness: 0.9, metalness: 0.05 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.4;
  scene.add(floor);

  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);

    group.rotation.y = t * 0.6;
    group.rotation.x = Math.sin(t * 0.8) * 0.2;
    pyramid.rotation.y = t * 0.8;
    cube.scale.setScalar(1 + Math.sin(t * 1.7) * 0.06);

    controls.update();
    renderer.render(scene, camera);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
