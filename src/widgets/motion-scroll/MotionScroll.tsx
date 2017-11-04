import * as React from 'react';
import { ScrollSink } from "./ScrollSink";
import { Motion, spring } from 'react-motion';

interface IProps {
    scrollTarget: number
    docScroll: number
    isAnimating: boolean
    onRest: () => void
}

export class MotionScroll extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAnimating !== this.props.isAnimating
            && nextProps.isAnimating
            && (nextProps.scrollTarget === nextProps.docScroll || typeof nextProps.scrollTarget === "undefined")) {
            nextProps.onRest();
        }
    }

    render(): JSX.Element {
        const { isAnimating, docScroll, scrollTarget, onRest } = this.props;

        return  <Motion
                    defaultStyle={{
                        scrollY: docScroll
                    }}
                    style={{
                        scrollY: spring(isAnimating ? scrollTarget : docScroll)
                    }}
                    onRest={onRest}
                >
                {(currentStyles) =>
                    this.props.isAnimating
                        &&  <ScrollSink
                                scrollY={currentStyles.scrollY}
                            />}
                </Motion>;
    }
}
