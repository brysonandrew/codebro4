import * as React from 'react';
import THREE = require('three');
import {isGL} from '..';
import {Flame} from './fire';
import {CenteredText} from '../../widgets';

interface IProps {
    docScroll?: number
    width?: number
    height?: number
    parentEl?: HTMLDivElement
}

interface IState {
    isFallback?: boolean
}

export class Background extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    point;
    particles: Flame = new Flame();
    playerFocus = new THREE.Group;
    circleLights;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
        };
    }

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
        this.initAssets();
        this.initCamera();
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true });
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize( this.props.width, this.props.height );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initAssets() {
        this.scene.add(this.particles.render());
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, this.props.width / this.props.height, 1, 4000 );
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const inc = this.props.docScroll * 0.0001;
        this.particles.animate();
        this.camera.position.set(0, 0, (this.props.docScroll - 2100));
        // this.camera.rotation.set(Math.cos(inc), Math.sin(inc), 0);
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            this.state.isFallback
            &&  <CenteredText
                    content={"Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."}
                />
        );
    }
}
