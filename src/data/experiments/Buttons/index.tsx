import * as React from 'react';
import { IInlineStyles } from '../..';
import {buttons} from './buttons';

const STYLES: IInlineStyles = {
    p: {
        id: "buttons",
        position: "relative",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh"
    },
    loaderFrame: {
        position: "relative",
        display: "inline-block",
        width: 300,
        height: 300
    },
    loader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 100,
        height: 100
    }
};

export const Buttons = () => {
    return  <div style={STYLES.p}>
                {buttons.map((loaders, i) =>
                    <div
                        key={`loader-${i}`}
                        style={STYLES.loaderFrame}
                    >
                        <div
                            style={STYLES.loader}
                        >
                            {loaders}
                        </div>
                    </div>)}
            </div>
};
