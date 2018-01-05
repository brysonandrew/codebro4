import * as React from 'react';
import { IInlineStyles } from '../..';
import {buttons} from './buttons';
import {ButtonsControls} from './ButtonsControls';

const STYLES: IInlineStyles = {
    p: {
        id: "buttons",
        position: "relative",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh"
    },
    button: {
        margin: 20
    }
};

export const Buttons = () => {
    return  <div style={STYLES.p}>
                {buttons.map((button, i) =>
                    <div
                        key={`button-${i}`}
                        style={STYLES.button}
                    >
                        <ButtonsControls button={button} index={i}/>
                    </div>)}
            </div>
};
