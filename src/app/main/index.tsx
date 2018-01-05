import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { WideHeader, WideHeaderItem, ITabData } from "./WideHeader";
import { Pages } from "./Pages";
import { prefixer, Background, Store, IInlineStyles } from '../../data';
import { MotionScroll, Logo } from '../../widgets';
import { GrowingCircleLoader } from '../../data/experiments/Loaders';

const STYLES: IInlineStyles = {
    mainHeader: {
        id: "main home header",
        display: "inline-block",
        verticalAlign: "middle",
        paddingLeft: 20
    },
    header: {
        id: "wide header",
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
        transform: "rotate(-90deg) translate(50%, -25%)",
        transition: "400ms opacity"
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

    render(): JSX.Element {
        const { width, height, docScroll, projectOffsets, isAnimating, savedParams
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
                <div style={{...STYLES.title, top: height * 0.85, opacity: docScroll === 0 ? 1 : 0.06}}>
                    <Logo/>
                    <h1 style={STYLES.mainHeader}>
                        code bro
                    </h1>
                </div>
                <div style={ STYLES.header }>
                    <WideHeader/>
                </div>
                <Pages/>
                {!!projectOffsets
                    ?   <MotionScroll
                            docScroll={docScroll}
                            isAnimating={isAnimating}
                            scrollTarget={projectOffsets[savedParams.get("activePagePath")]}
                            onRest={onAnimationEnd}
                        />
                    :   null}
                {isAnimating
                    ?   <div style={{...STYLES.loader}}>
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
