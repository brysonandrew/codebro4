import * as React from 'react';
import { HamburgerControls } from "./HamburgerControls";
import { hamburgers } from './hamburgers';

const Hamburgers = () => {
    return  <div>
                {hamburgers.map((hamburger, i) =>
                    <HamburgerControls
                        key={`hamburger-${i}`}
                        index={i}
                        hamburger={hamburger}
                    />)}
            </div>
};

export { Hamburgers };
