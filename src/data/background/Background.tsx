import * as React from 'react';
import THREE = require('three');
import { Particles } from '.';
import { isGL } from '..';
import { CenteredText } from '../../widgets';

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
    particles: Particles = new Particles();
    playerFocus = new THREE.Group;

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
            this.renderer.setSize( nextProps.width, nextProps.height );
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
        this.particles.animate();
        this.camera.position.set(0, 0, 4200 - this.props.docScroll * 0.66);
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
