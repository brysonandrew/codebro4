import * as React from 'react';
import { IInlineStyles } from '../../models';
import { ROW_HEIGHT } from './Work';

const STYLES: IInlineStyles = {
    header: {
        opacity: 0.66,
        fontSize: 12
    },
    item: {
        display: 'inline-flex',
        verticalAlign: 'top',
        textAlign: 'left',
        alignItems: 'center',
        height: ROW_HEIGHT,
        paddingLeft: 5,
        width: 290
    }
};

const headers = (isMobile, isTablet) => {
    if (isMobile) {
        return [
            ""
        ]
    } else if (isTablet) {
        return [
            "",
            "CLIENT"
        ]
    } else {
        return [
            "",
            "TEAM",
            "CLIENT"
        ]
    }
};

interface IProps {
    isMobile: boolean
    isTablet: boolean
}

export const WorkHeading = (props: IProps) => {

    return (
        <div>
            {headers(props.isMobile, props.isTablet).map(head =>
                <div
                    key={`Work.head ${head}`}
                    style={{...STYLES.item, ...STYLES.header}}
                >
                    {head}
                </div>)}
        </div>
    );
};
