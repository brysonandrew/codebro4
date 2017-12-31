import * as React from 'react';

interface IProps {
    description: string[];
}

const STYLES = {
    p: {},
    description: {
        margin: "10px 0",
        fontSize: 14
    }
}

export const WorkDescription = (props: IProps) => {

    return (
        <div style={STYLES.p}>
            {props.description.map((sentence, i) =>
                <div
                    key={`sentence-${i}`}
                    style={STYLES.description}
                >
                    {sentence}
                </div>)}
        </div>
    );
};
