import * as React from 'react';
import { findLetter } from "./letters/letters";
import {prefixer} from '../../data/helpers/prefixer';
import {colors} from '../../data/themeOptions';
import {isEqual} from '../../data/helpers/index';

interface IProps {
    letter: string
    index: number
}

export const Letter = (props: IProps) => {

    const columns = Array.apply(null, new Array(4));
    const rows = Array.apply(null, new Array(4));
    const size = 40;

    const { letter } = props;
    const transform = "translate(-50%, -50%)";
    const transition = "transform 400ms";

    const styles = {
        letter: {
            display: "inline-block",
            height: size
        },
        letter__column: {
            display: "inline-block",
            height: "100%"
        },
        letter__row: {
            position: "relative",
            width: "100%",
            height: `${100 / columns.length}%`,
        },
        letter__strokeForward: prefixer({
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 6,
            borderRadius: 4,
            height: "160%",
            background: "#FFFFFF",
            transform: "rotate(45deg)",
            transition: transition
        }),
        letter__strokeBackward: prefixer({
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 6,
            borderRadius: 4,
            height: "160%",
            background: "#FFFFFF",
            transform: "rotate(-45deg)",
            transition: transition
        })
    } as any;

    return (
        <div style={ styles.letter }>
            {columns.map((_, columnIndex) => {
                const isColumnEmpty = findLetter(letter).filter(stroke =>
                  stroke.columnIndex === columnIndex).length === 0;
                if (!isColumnEmpty) {
                    return <div key={columnIndex}
                                style={{...styles.letter__column, width: isColumnEmpty ? 0 : size / columns.length}}>
                                {rows.map((_, rowIndex) =>
                                    <div
                                        key={`row-${rowIndex}`}
                                        style={ styles.letter__row }
                                    >
                                        {findLetter(props.letter).map((stroke, strokeIndex) => {
                                            if (isEqual(stroke.type, "forward")) {
                                                return isEqual(stroke.columnIndex, columnIndex)
                                                    && isEqual(stroke.rowIndex, rowIndex)
                                                    &&
                                            <div key={strokeIndex} style={styles.letter__strokeForward}/>;
                                            } else if (isEqual(stroke.type, "backward")) {
                                                return isEqual(stroke.columnIndex, columnIndex)
                                                    && isEqual(stroke.rowIndex, rowIndex)
                                                    &&
                                            <div key={strokeIndex} style={styles.letter__strokeBackward}/>;
                                            }
                                        })}
                                    </div>)}
                            </div>;
                }})
            }
        </div>
    );
};
