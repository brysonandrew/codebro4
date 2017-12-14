import * as React from 'react';
import { Letter } from "./Letter";

interface IProps {
    word: string
}

export const Word = (props: IProps) => {
    return (
        <div style={{display: "inline-block"}}>
            {props.word.split('').map((letter, i) =>
                <Letter
                    key={`Word-${i}`}
                    index={i}
                    letter={letter}
                />)}
        </div>
    );
};
