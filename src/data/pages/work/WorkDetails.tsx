import * as React from 'react';
import {IWorkLabel} from '../../labels';
import {workDetails, IInlineStyles} from '../..';

const STYLES: IInlineStyles = {
    row: {
        position: "relative"
    },
    name: {
        position: "absolute",
        top: "50%",
        left: 5,
        fontSize: 12,
        transform: "translateY(-50%)"
    },
    info: {
        textAlign: "right"
    }
};

interface IProps {
    width: number
    work: IWorkLabel
    faintColor: string
}

export const WorkDetails = (props: IProps) => {

    return (
        <div style={{width: props.width}}>
            {workDetails(props.work).map(details =>
                <div
                    key={details.id}
                    style={STYLES.row}
                >
                    <div style={STYLES.name}>
                        {details.name}
                    </div>
                    <div style={STYLES.info}>
                        {details.info}
                    </div>
                </div>)}
        </div>
    );
};
