import * as React from 'react';

interface IProps {
    scrollY: number
}

export class ScrollSink extends React.Component<IProps, {}> {

    scrollMethod = document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop;

    componentDidUpdate(prevProps) {
        if (prevProps.scrollTop !== this.props.scrollY) {

            if (!!this.scrollMethod) {
                document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop = this.props.scrollY;
            } else {
                window[!!window.scrollTo ? `scrollTo` : `scroll`](0, this.props.scrollY);
            }
        }
    }

    render(): JSX.Element {
        return null;
    }
}
