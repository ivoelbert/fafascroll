import * as THREE from 'three';
import { ObjLoader } from './ObjLoader';

export class PhoneObject {
    public mesh: THREE.Object3D;

    constructor() {
        this.mesh = new THREE.Object3D();
    }

    public loadModels = async (): Promise<void> => {
        const loader = new ObjLoader();
        this.mesh = await loader.loadObject('scene');
    };
}
