import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WideHeader, WideHeaderItem, ITabData } from "./WideHeader";
import { Pages } from "./Pages";
import { prefixer, Background, Store, IInlineStyles } from '../../data';
import { ScreenSaver, MotionScroll } from '../../widgets';
import { GrowingCircleLoader } from '../../data/experiments/Loaders';

const STYLES: IInlineStyles = {
    header: {
        id: "home header",
        position: "fixed",
        left: 0,
        top: 0,
        textAlign: "left",
        width: "100%",
        zIndex: 10
    },
    title: prefixer({
        id: "home title",
        position: "absolute",
        left: 0,
        fontSize: 28,
        transform: "rotate(-90deg) translate(50%, -25%)"
    }),
    background: {
        position: "fixed",
        top: 0,
        left: 0
    },
    loader: {
        position: "fixed",
        bottom: 20,
        right: 20
    }
};

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Main extends React.Component<IProps, {}> {

    backgroundRef;

    componentDidMount() {
        this.props.store.onMainMount(true);
    }

    render(): JSX.Element {
        const { width, height, docScroll, isMainMounted, projectOffsets, isAnimating, savedParams
            , onAnimationEnd, isResizing } = this.props.store;

        return (
            <div>
                <div
                    style={{...STYLES.background}}
                    ref={el => el ? (this.backgroundRef = el) : null}
                >
                    {!!this.backgroundRef && width > 0 && height > 0 && !isResizing
                        ?   <Background
                                docScroll={docScroll}
                                parentEl={this.backgroundRef}
                            />
                        :   null}
                </div>
                <div style={{...STYLES.title, top: height * 0.85}}>
                    <h1>code bro</h1>
                </div>
                <div style={ STYLES.header }>
                    <WideHeader/>
                </div>
                <Pages/>
                <ScreenSaver
                    isScreenSaver={!isMainMounted}
                    wakeUpDuration={this.props.store.wakeUpDuration}
                />
                {!!projectOffsets
                    ?   <MotionScroll
                            docScroll={docScroll}
                            isAnimating={isAnimating}
                            scrollTarget={projectOffsets[savedParams.get("activePagePath")]}
                            onRest={onAnimationEnd}
                        />
                    :   null}
                {isAnimating
                    ?   <div
                            style={{...STYLES.loader}}
                        >
                            <GrowingCircleLoader
                                size={40}
                            />
                        </div>
                    :   null}
            </div>
        );
    }
}

export { WideHeader };
export { WideHeaderItem, ITabData };
export { Pages };
