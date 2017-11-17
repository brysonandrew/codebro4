import * as React from 'react';
import { loaders } from './loaders';
import { IInlineStyles } from '../..';
import { TextLoader } from "./TextLoader";

const STYLES: IInlineStyles = {
    p: {
        id: "hamburgers",
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

const Loaders = () => {
    return  <div style={STYLES.p}>
                {loaders.map((loaders, i) =>
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

export { Loaders, TextLoader };
export { GrowingCircleLoader } from "./GrowingCircleLoader";
