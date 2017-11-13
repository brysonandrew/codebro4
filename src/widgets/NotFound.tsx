import * as React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { IInlineStyles, prefixer, colors, Store } from '../data';
import { GlitchText } from './GlitchText';
import { CSS_FONT_STRING } from './Fonts';

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class NotFound extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "not found",
            fontFamily: `'${CSS_FONT_STRING}', 'arial', sans-serif`,
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflowY: "auto",
            textAlign: "center",
            zIndex: 20
        }),
        content: prefixer({
            position: "absolute",
            top: 0,
            left: "50%",
            fontSize: 24,
            padding: "24px 0",
            transform: "translateX(-50%)",
        }),
        text: {
            margin: "10px 0"
        },
        eitherOr: {
            position: "absolute",
            left: 0
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
        this.props.store.reset();
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <div style={this.STYLES.content}>
                    <GlitchText
                        fontSize={50}
                        width={600}
                        height={75}
                        intensity={75 / 100}
                        isActive={true}
                        textColor={colors.blk}
                        backgroundColor={colors.wht}
                        textContent="Achtung Baby! 404"
                    />
                    <div style={this.STYLES.text}>
                        Sorry but you [still] haven't found what you're looking for!
                    </div>
                    <div style={this.STYLES.eitherOr}>
                        Either
                    </div>
                    <div style={this.STYLES.text}>option 1. savor the moment with a song</div>
                    <div style={this.STYLES.video}>
                        <iframe src="https://player.vimeo.com/video/28494010" width="640" height="480" frameBorder="0" allowFullScreen={true}/>
                    </div>
                    <div style={this.STYLES.eitherOr}>
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
                            textContent="click here to go back"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
