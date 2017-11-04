import * as React from 'react';
import { HamburgerControls } from "./HamburgerControls";
import { hamburgers } from './hamburgers';
import { IInlineStyles } from '../..';

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

const Hamburgers = () => {
    return  <div style={STYLES.p}>
                {hamburgers.map((hamburger, i) =>
                    <HamburgerControls
                        key={`hamburger-${i}`}
                        index={i}
                        hamburger={hamburger}
                    />)}
            </div>
};

export { Hamburgers };
export { SVGBurger } from "./SVGBurger";
