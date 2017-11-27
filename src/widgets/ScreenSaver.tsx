import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { colors, IInlineStyles, prefixer, Store, GrowingCircleLoader } from '../data';
import { TypingTextInterval, TYPING_SPEED } from './TypingTextInterval';

const TEXT_CONTENT = "Hi, my name is Andrew and I make websites ";

interface IProps {
    store?: Store
}

interface IState {
    isMounted: boolean
}

@inject('store')
@observer
export class ScreenSaver extends React.Component<IProps, IState> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "screen saver",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: colors.blk,
            transition: "2000ms opacity",
            zIndex: 20
        }),
        center: prefixer({
            id: "screen saver__center",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
        }),
        loader: {
            id: "screen saver__l",
            display: "inline-block",
            transition: `transform ${TEXT_CONTENT.length * TYPING_SPEED}ms`
        }
    };

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: true
        };
    }

    fontSize = () => this.props.store.isMobile ? 12 : this.props.store.isTablet ? 20 : 24;

    handleAwake = () => {
        this.props.store.onAwake(true);
    };

    handleTransitionEnd = () => {
        this.setState({
            isMounted: !this.props.store.isAwake
        });
    };

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isAwake } = this.props.store;

        return (
            isMounted
                ?   <div
                        style={{
                            ...this.STYLES.p,
                            opacity: isAwake ? 0 : 1
                        }}
                        onClick={this.handleAwake}
                        onMouseMove={this.handleAwake}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <div
                            style={{
                                ...this.STYLES.center,
                                lineHeight: this.fontSize() * 2,
                                fontSize: this.fontSize()
                            }}
                        >
                            <div style={{display: "inline-block"}}>
                                <TypingTextInterval
                                    textContent={TEXT_CONTENT}
                                />
                                <div
                                    style={{
                                        ...this.STYLES.loader,
                                        transform: `scale(${isAwake ? 1 : 0})`
                                    }}
                                >
                                    <GrowingCircleLoader size={this.fontSize() * 2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                :   null
        );
    }
}
