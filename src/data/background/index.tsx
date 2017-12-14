import * as React from 'react';
import * as THREE from 'three';
import { inject, observer } from 'mobx-react';
import { Amygdala, VERTICAL_CYLINDER, NUMBER_OF_ARMS, SCREEN } from '../experiments';
import { CenteredText } from '../../widgets';
import { Store, isGL } from '..';
const RX0 = Math.PI * 0.1;
const MAX = 20;

interface IState {
    isFallback: boolean
}

interface IProps {
    parentEl?: HTMLDivElement
    store?: Store
    docScroll: number
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
    prevDocScroll = 0;
    count = 0;

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
    docScroll = () => this.props.docScroll;

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
        this.removeExisting();

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.domElement.id = "background";
        this.renderer.setSize( this.width(), this.height() );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    removeExisting() {
        if (document.getElementById("background")) {
            this.props.parentEl.removeChild( document.getElementById("background" ));
        }
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width() / this.height(),
            1,
            8000
        );
        this.camera.rotation.x = RX0;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        let pointLeft = new THREE.PointLight( 0xFFFFFF, 0.5 );
        pointLeft.position.y += SCREEN.height * 1.5;
        pointLeft.position.x -= SCREEN.width;
        this.points.add(pointLeft);

        let pointRight = new THREE.PointLight( 0xFFFFFF, 0.5 );
        pointRight.position.y += SCREEN.height * 1.5;
        pointRight.position.x += SCREEN.width;
        this.points.add(pointRight);

        this.scene.add(this.points);
    }

    initAssets() {
        this.structureComponent = new Amygdala();
        this.initStructure();
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

    zoom(scrollPos, direction) {
        const d = {
            pz: -100,
            py: this.height() * 0.075,
            rx: RX0
        };

        this.camera.position.z = scrollPos + d.pz * this.count / MAX;
        this.camera.position.y = this.height() * 0.0025 + d.py * this.count / MAX;
        this.camera.rotation.x = d.rx * (1 - this.count / MAX);

        if (direction === "out" && this.count < MAX) {
            this.count++;
        } else if (direction === "in" && this.count > 0) {
            this.count--;
        }
    }

    renderMotion() {
        const scrollPos = -this.docScroll() / this.adjustedScrollHeight() * (VERTICAL_CYLINDER.height - VERTICAL_CYLINDER.height / NUMBER_OF_ARMS) + VERTICAL_CYLINDER.height * 0.5;
        this.structureComponent.animate(scrollPos, this.props.store.isAnimating);
        this.structure.rotation.y = this.docScroll() / this.adjustedScrollHeight() * (Math.PI * 2 -  Math.PI * 2 / NUMBER_OF_ARMS) + Math.PI * 0.5;
        if (this.props.store.isIn) {
            this.zoom(scrollPos, "in");
        } else {
            this.zoom(scrollPos, "out");
        }
        this.points.position.z = scrollPos;
        this.prevDocScroll = this.docScroll();

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
