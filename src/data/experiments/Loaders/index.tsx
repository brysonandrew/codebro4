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
    }
};

const Loaders = () => {
    return  <div style={STYLES.p}>
                {loaders.map((loaders, i) =>
                    <div key={`loader-${i}`}>
                        {loaders}
                    </div>)}
            </div>
};

export { Loaders, TextLoader };
