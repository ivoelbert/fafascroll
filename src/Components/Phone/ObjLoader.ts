import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export class ObjLoader {
    private loader: GLTFLoader;

    constructor() {
        this.loader = new GLTFLoader();
    }

    public loadObject = (path: string): Promise<THREE.Object3D> => {
        return new Promise((resolve, reject) => {
            const basePath = `./models`;

            const objPath: string = `${basePath}/${path}.gltf`;

            const onLoad = (gltf: GLTF): void => {
                resolve(gltf.scene)
            }

            this.loader.load(objPath, onLoad, () => {}, reject);
        });
    };
}
