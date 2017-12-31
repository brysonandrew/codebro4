import * as React from 'react';
import {IWorkLabel} from '../../labels';
import {workDetails, IInlineStyles} from '../..';
import {isArray} from '../..';

const STYLES: IInlineStyles = {
    p: {
        maxHeight: "80vh",
        overflow: "auto"
    },
    row: {
        id: "work details",
        position: "relative",
        textAlign: "right"
    },
    name: {
        id: "work details --- name",
        position: "absolute",
        top: "50%",
        left: 5,
        fontSize: 16,
        transform: "translateY(-50%)"
    },
    info: {
        id: "work details --- info",
        display: "inline-block",
        width: "80%"
    },
    info__item: {
        display: "inline-block",
        verticalAlign: "top",
        margin: "10px 0",
        fontSize: 18
    }
};

interface IProps {
    width: number
    work: IWorkLabel
    faintColor: string
}

export const WorkDetails = (props: IProps) => {

    return (
        <div style={{...STYLES.p, width: props.width}}>
            {workDetails(props.work).map(details =>
                <div
                    key={details.id}
                    style={STYLES.row}
                >
                    <div style={STYLES.name}>
                        {details.name}
                    </div>
                    <div style={STYLES.info}>
                        {isArray(details.info)
                        ?   (details.info as (string | JSX.Element)[]).map((item, i) =>
                                <div
                                    key={`item-${i}`}
                                    style={STYLES.info__item}
                                >
                                    {item}
                                </div>)
                        :   details.info}
                    </div>
                </div>)}
        </div>
    );
};
