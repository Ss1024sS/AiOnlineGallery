import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

let camera, scene, renderer;
let model, controls;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 在init函数中设置OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // 禁用缩放
    controls.enablePan = false; // 禁用平移

    // 添加一个事件监听来更新模型的旋转
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function onDocumentMouseMove(event) {
        if (model) {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
            model.rotation.y = mouseX * Math.PI; // 左右移动影响Y轴旋转
            model.rotation.x = -mouseY * Math.PI / 2; // 上下移动影响X轴旋转，注意这里的负号
        }
    }
    


    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 0, 1, 0 ); //default; light shining from top
    directionalLight.castShadow = true; // default false
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('model2/scene.gltf', function (gltf) {
        model = gltf.scene;
        model.traverse((object) => {
            if (object.isMesh) {
                object.material.emissive = new THREE.Color(0x222222); // 给材质添加微弱的自发光颜色
                object.material.emissiveIntensity = 0; // 增加自发光强度
                object.material.metalness = 0; // 减少金属感，因为金属材质不会散射光线
                object.material.roughness = 0.5; // 增加一些粗糙度，以散射更多的光
            }
        });
    scene.add(model);
    model.scale.set(0.002, 0.002, 0.002); // 根据需要调整模型大小
    animate();
}, undefined, function (error) {
    console.error(error);
});

    window.addEventListener('resize', onWindowResize);

}

function fadeInElement(...ids) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = 0.8;
            }, 100);
        }
    });
}

// 同时渐显标题和按钮
setTimeout(() => {
    fadeInElement('left-title', 'right-title', 'explore-button');
}, 2500); // 延迟2.5秒后开始显示

// 为按钮添加点击事件
document.getElementById('explore-button').addEventListener('click', function() {
    window.location.href = 'index2.html'; // 连接到 index2.html
});
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    animate();
}

function render() {
    renderer.render(scene, camera);
}


