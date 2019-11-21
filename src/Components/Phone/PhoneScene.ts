import * as THREE from 'three';
import { PhoneObject } from './PhoneObject';
import { UIState, UIStateEntries } from './UIState';
import { mapValue, animationTiming } from '../../Lib/utils/utils';

export class PhoneScene {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;

    private phone: PhoneObject;

    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Set the scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color().setHSL(0.6, 0, 1);
        this.scene.fog = new THREE.Fog(this.scene.background.getHex(), 1, 1000);

        // Set the lights
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
        this.scene.add(dirLight);

        // Set camera
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);

        // Create the miata
        this.phone = new PhoneObject();

        window.addEventListener(
            'resize',
            () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.render(this.scene, this.camera);
            },
            false
        );

        // Load Models asynchronously
        this.loadModels();
    }

    private loadModels = async (): Promise<void> => {
        await this.phone.loadModels();

        this.scene.add(this.phone.mesh);

        this.animate();
    };

    private animate = (): void => {
        const uiState: UIState = UIState.getInstance();
        uiState.on('CHANGE', (state: UIStateEntries) => {
            const { pullOutTime, moveAndRotateTime } = state;

            // Pull out animation
            const positionTiming: number = animationTiming(pullOutTime, 0.5, 1);
            const newPositionZ: number = mapValue(positionTiming, 0, 1, -5, -150);
            const newRotationZ: number = mapValue(positionTiming, 0, 1, -Math.PI / 2, 0);

            // Move and rotate animation
            const newPositionX: number = mapValue(moveAndRotateTime, 0, 1, 0, -75);
            const newRotationY: number = mapValue(moveAndRotateTime, 0, 1, 0, Math.PI / 1.6);

            this.phone.mesh.position.set(newPositionX, 0, newPositionZ);
            this.phone.mesh.rotation.z = newRotationZ;
            this.phone.mesh.rotation.y = newRotationY;
            this.renderer.render(this.scene, this.camera);
        });
    };

    public getDomElement = (): HTMLCanvasElement => {
        return this.renderer.domElement;
    };
}
