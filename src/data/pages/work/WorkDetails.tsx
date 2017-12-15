import * as React from 'react';

interface IProps {
    width: number
}

export const WorkDetails = (props: IProps) => {

    return (
        <div style={{width: props.width}}>
            DETAILS
        </div>
    );
};
