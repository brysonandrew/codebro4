import * as React from 'react';
import * as Immutable from 'immutable';
import * as THREE from 'three';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { isGL, IInlineStyles, colors } from "../../../data";
import { playerPositionX, playerPositionZ, playerRotationY, playerRotationX } from "../helpers";
import { CenteredText, UnderlineSwitch } from "../../../widgets";
import { ARM, NUMBER_OF_ARMS, VERTICAL_CYLINDER, SCREEN } from './models/amygdala';
import { MODELS, MODELS_DICT } from './models';
import { animateKey } from '../helpers/game/keyboard';
import { Amygdala } from './models/amygdala';

interface IState {
    isFallback: boolean
    keysPressed?: string[]
    mx?: number
    my?: number
}

interface IProps {
    parentEl?: HTMLDivElement
    width?: number
    height?: number
    savedParams?: Map<string, string>;
}

@inject('store')
@observer
export class Models extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    playerFocus = new THREE.Group;
    models;

    STYLES: IInlineStyles = {
        menu: {
            position: "absolute",
            top: 0,
            left: 0,
            padding: 20,
            background: colors.blk,
            cursor: "pointer"
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false,
            keysPressed: [],
            mx: 0,
            my: 0
        };
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);

        window.removeEventListener('keypress', this.handleKeyPress);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('mousemove', this.handleMouseMove);

        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement );
        }
    }

    componentWillReceiveProps(nextProps) {
        const { height, width, savedParams } = this.props;

        const isHeightChanged = nextProps.height !== height;
        const isWidthChanged = nextProps.width !== width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }

        const isParamsChanged = nextProps.savedParams.get("activeViewPath") !== savedParams.get("activeViewPath");

        if (isParamsChanged) {
            this.removeByName("models");
            this.initModels(MODELS_DICT[nextProps.savedParams.get("activeViewPath")].component);
        }
    }

    handleMenuClick = (i) => {
        browserHistory.push(`/models/${MODELS[i].path}`)
    };

    handleKeyPress = (e) => {
        const keysPressed = Immutable.List(this.state.keysPressed).push(e.key);

        this.setState({
            keysPressed: (this.state.keysPressed.indexOf(e.key) > -1) ? this.state.keysPressed : keysPressed.toArray()
        });
    };

    handleKeyUp = (e) => {
        const keysPressedList = Immutable.List(this.state.keysPressed);
        const nextKeysPressedList = keysPressedList.filter(item => !(item === e.key));

        this.setState({
            keysPressed: nextKeysPressedList.toArray()
        });
    };

    handleMouseMove = (e) => {
        this.setState({
            mx: e.pageX,
            my: e.pageY
        });
    };

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
        const { height, width } = this.props;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        const { height, width } = this.props;

        this.camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            1,
            8000
        );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xFFFFFF, 0.5 );
        this.playerFocus.add(this.point);
        this.scene.add(new THREE.AmbientLight( 0xFFFFFF, 0.25 ));
    }

    initAssets() {
        this.playerFocus.add(this.camera);
        this.playerFocus.position.set(0, 10, 100);
        this.playerFocus.rotation.order = "YXZ";
        this.scene.add(this.playerFocus);

        const component = this.props.savedParams.get("activeViewPath")
            ? MODELS_DICT[this.props.savedParams.get("activeViewPath")].component
            : MODELS[0].component;

        this.initModels(component);

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

    initModels(component) {
        this.models = component;
        if (this.models.init) {
            this.models.init();
        }
        if (this.models.render) {
            const modelsObj = this.models.render();
            modelsObj.name =  "models";
            this.scene.add(modelsObj);
        }
        if (this.models.addToScene) {
            this.models.addToScene(this.scene)
                .then(() => console.log("Object added"))
                .catch(() => console.error("Object failed"));
        }
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed } = this.state;

        const rotX = playerRotationX(keysPressed);
        const rotY = playerRotationY(keysPressed);

        const posX = playerPositionX(keysPressed, this.playerFocus.rotation.y);
        const posY = animateKey("t", keysPressed, 1) + animateKey("y", keysPressed, -1);
        const posZ = playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        this.playerFocus.rotation.x += rotX;
        this.playerFocus.rotation.y += rotY;

        this.playerFocus.position.x += posX;
        this.playerFocus.position.y += posY;
        this.playerFocus.position.z += posZ;

        if (this.models.animate) {
            this.models.animate(keysPressed);
        }

        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            this.state.isFallback
                ?   <CenteredText
                        content="Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."
                    />
                :   <div style={this.STYLES.menu}>
                    {MODELS.map((particle, i) =>
                        <div
                            key={`particle-${i}`}
                            onClick={() => this.handleMenuClick(i)}
                        >
                            <UnderlineSwitch>
                                {particle.name}
                            </UnderlineSwitch>
                        </div>)}
                    </div>
            );
    }
}

export { MODELS, MODELS_DICT, Amygdala, NUMBER_OF_ARMS, VERTICAL_CYLINDER, ARM, SCREEN }
