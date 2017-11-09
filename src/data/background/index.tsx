import * as React from 'react';
import THREE = require('three');
import { inject, observer } from 'mobx-react';
import { isGL } from '../helpers';
import { Amygdala, VERTICAL_CYLINDER, NUMBER_OF_ARMS, ARM } from '../experiments';
import { CenteredText } from '../../widgets';
import { Store } from '../Store';

interface IState {
    isFallback: boolean
}

interface IProps {
    parentEl?: HTMLDivElement
    store?: Store
    docScroll?: number
}

@inject('store')
@observer
export class Background extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    playerFocus = new THREE.Group;
    structure;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
        };
        this.animate = this.animate.bind(this);
    }

    width = () => this.props.store.width;
    height = () => this.props.store.height;

    componentDidMount() {
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);

        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement );
        }
    }

    initGL() {
        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.initLighting();
        this.initAssets();
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true });
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize( this.width(), this.height() );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width() / this.height(),
            1,
            8000
        );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xFFFFFF, 0.75 );
        this.playerFocus.add(this.point);
        this.scene.add(new THREE.AmbientLight( 0xFFFFFF, 0.1 ));
    }

    initAssets() {
        const index = 0;
        const buffer = 100;

        const y = (VERTICAL_CYLINDER.height * index / NUMBER_OF_ARMS)
            - (VERTICAL_CYLINDER.height * 0.5)
            + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);

        const z = ARM.height + buffer;

        this.playerFocus.add(this.camera);
        this.playerFocus.position.set(0, -y, z);
        this.playerFocus.rotation.order = 'YXZ';
        this.scene.add(this.playerFocus);

        const component = new Amygdala();
        this.initStructure(component);

        // Promise.all([
        //     loadGround(),
        //     loadBackground()
        // ]).then((meshes) => {
        //     meshes.map(mesh => this.scene.add(mesh));
        // });
    }

    removeByName(name) {
        const obj = this.scene.getObjectByName(name);
        this.scene.remove(obj);
    }

    initStructure(component) {
        component.init();
        this.structure = component.render();
        this.scene.add(this.structure);
    }

    animate() {
        this.animateLoop = requestAnimationFrame(this.animate);
        this.renderMotion();
    }

    renderMotion() {
        this.structure.rotation.y = -this.props.docScroll / this.props.store.scrollHeight * Math.PI * 2;
        this.camera.position.y = -this.props.docScroll / this.props.store.scrollHeight * VERTICAL_CYLINDER.height;
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            this.state.isFallback
                ?   <CenteredText
                        content="Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."
                    />
                :   null
        );
    }
}
