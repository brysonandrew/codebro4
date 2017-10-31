import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, prefixer, colors, Store } from '../data';
import { GlitchText } from '.';

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class NotFound extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "not found",
            fontFamily: "'Advent Pro', 'arial', sans-serif",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            textAlign: "center",
            color: colors.blk,
            background: colors.wht,
            zIndex: 20
        }),
        content: prefixer({
            position: "absolute",
            top: "50%",
            right: "50%",
            fontSize: 24,
            transform: "translate(50%, -50%)",
        }),
        text: {
            margin: "10px 0"
        },
        video: {
            display: "inline-block"
        },
        backButton: {
            padding: "0 20px",
            border: `1px solid ${colors.blk}`,
            cursor: "pointer"
        }
    };

    handleBackClick = () => {
        browserHistory.push("/");
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <div style={this.STYLES.content}>
                    <h2>404 baby!</h2>
                    <div style={this.STYLES.text}>
                        Sorry but you [still] haven't found what you're looking for!
                    </div>
                    <div style={this.STYLES.text}>
                        Either
                    </div>
                    <div style={this.STYLES.text}>option 1. savor the moment with a song</div>
                    <div style={this.STYLES.video}>
                        <iframe src="https://player.vimeo.com/video/28494010" width="640" height="480" frameBorder="0" allowFullScreen={true}/>
                    </div>
                    <div style={this.STYLES.text}>
                        Or
                    </div>
                    <div style={this.STYLES.text}>
                        option 2. return to familiar territory.
                    </div>
                    <div
                        style={this.STYLES.backButton}
                        onClick={this.handleBackClick}
                    >
                        <GlitchText
                            fontSize={50}
                            width={600}
                            height={75}
                            intensity={75 / 100}
                            isActive={true}
                            textColor={colors.blk}
                            backgroundColor={colors.wht}
                            textContent="click here to return to codebro.io"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
