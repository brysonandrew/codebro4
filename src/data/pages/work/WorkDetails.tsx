import * as React from 'react';
import {IWorkLabel} from '../../labels';
import {workDetails, IInlineStyles} from '../..';
import {WorkDescription} from './WorkDescription';

const STYLES: IInlineStyles = {
    p: {
        maxHeight: "80vh",
        overflow: "auto"
    },
    row: {
        id: "work details",
        position: "relative"
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
                        {details.info}
                    </div>
                    <WorkDescription description={details.description}/>
                </div>)}
        </div>
    );
};
