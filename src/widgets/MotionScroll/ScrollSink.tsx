import * as React from 'react';

interface IProps {
    scrollTop: number
}

export class ScrollSink extends React.Component<IProps, any> {
    public constructor(props?: any, context?: any) {
        super(props, context);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.scrollTop !== this.props.scrollTop) {
            document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop = this.props.scrollTop;
        }
    }
    render(): JSX.Element {
        return null;
    }
}
