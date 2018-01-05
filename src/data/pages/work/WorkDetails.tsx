import * as React from 'react';
import {workDetails, IInlineStyles} from '../..';
import {isArray} from '../..';
import {IWorkLabel} from './labels/models';

const STYLES: IInlineStyles = {
    p: {
        maxHeight: "80vh",
        overflow: "auto"
    },
    row: {
        id: "work details",
        position: "relative",
        textAlign: "left"
    },
    name: {
        id: "work details --- name",
        display: "inline-block",
        verticalAlign: "middle"
    },
    info: {
        float: "right"
    },
    info__item: {
        display: "inline-block",
        verticalAlign: "top"
    }
};

interface IProps {
    isTablet: boolean
    width: number
    work: IWorkLabel
    faintColor: string
}

function fontSize(isTablet) {
    return isTablet ? 16 : 20;
}

export const WorkDetails = (props: IProps) => {

    return (
        <div style={{...STYLES.p, width: props.width}}>
            {workDetails(props.work).map(details =>
                <div
                    key={details.id}
                    style={STYLES.row}
                >
                    <div style={{...STYLES.name, fontSize: fontSize(props.isTablet) * 0.75}}>
                        {details.name}
                    </div>
                    <div style={{...STYLES.info, fontSize: fontSize(props.isTablet)}}>
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
