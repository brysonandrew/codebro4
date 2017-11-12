import * as React from 'react';
import THREE = require('three');
import { inject, observer } from 'mobx-react';
import { Amygdala, VERTICAL_CYLINDER, NUMBER_OF_ARMS } from '../experiments';
import { CenteredText } from '../../widgets';
import { Store, isGL } from '..';
import {SCREEN} from '../experiments/Structures/structureModels/amygdala';

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
    points = new THREE.Group;
    playerFocus = new THREE.Group;
    structureComponent;
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
    adjustedScrollHeight = () => this.props.store.scrollHeight - this.height();

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
        this.camera.rotation.x = Math.PI * 0.1;
        this.camera.position.y = this.height() * 0.015;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        let pointLeft = new THREE.PointLight( 0xFFFFFF, 2 );
        pointLeft.position.y += SCREEN.height * 1.5;
        pointLeft.position.x -= SCREEN.width;
        this.points.add(pointLeft);

        let pointRight = new THREE.PointLight( 0xFFFFFF, 2 );
        pointRight.position.y += SCREEN.height * 1.5;
        pointRight.position.x += SCREEN.width;
        this.points.add(pointRight);

        this.scene.add(this.points);
    }

    initAssets() {
        this.structureComponent = new Amygdala();

        this.initStructure();
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

    initStructure() {
        this.structureComponent.init();
        this.structure = this.structureComponent.render();

        this.structure.rotation.x = Math.PI * 0.5;

        this.scene.add(this.structure);
    }

    animate() {
        this.animateLoop = requestAnimationFrame(this.animate);
        this.renderMotion();
    }

    renderMotion() {
        const scrollPos = -this.props.docScroll / this.adjustedScrollHeight() * (VERTICAL_CYLINDER.height - VERTICAL_CYLINDER.height / NUMBER_OF_ARMS) + 0.5 * VERTICAL_CYLINDER.height;
        this.structureComponent.animate(scrollPos);
        this.structure.rotation.y = this.props.docScroll / this.adjustedScrollHeight() * (Math.PI * 2 -  Math.PI * 2 / NUMBER_OF_ARMS) + Math.PI * 0.5;
        this.camera.position.z = scrollPos;
        this.points.position.z = scrollPos;

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
