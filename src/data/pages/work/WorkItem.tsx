import * as React from 'react';
import {ROW_MARGIN} from './Work';
import {Store, IInlineStyles} from '../..';
import {IWorkLabel} from './labels/models';

interface IProps {
    width: number
    work: IWorkLabel
    view: string
    store?: Store
    onClick: (title: string) => void
}

const STYLES: IInlineStyles = {
    info: {
        id: 'work info',
        cursor: 'pointer',
        transition: "width 400ms"
    },
    item: {
        display: 'inline-flex',
        verticalAlign: 'top',
        textAlign: 'left',
        alignItems: 'center',
        paddingLeft: 5,
        width: 290
    }
};

export const WorkItem = (props: IProps) => {
    const { width, view, work, store, onClick } = props;

    return (
        <div
            style={{
                ...STYLES.info
                , border: `1px solid ${work.color}`
                , margin: `${ROW_MARGIN * 0.5}px 0`
            }}
            onClick={() => onClick(work.title)}
        >
            <div style={{...STYLES.item, textAlign: view ? "center" : "left", width: width}}>
                {work.title}
            </div>
            {store.isMobile || view
                ?   null
                :   <div style={STYLES.item}>
                        {work.teamType}
                    </div>}
            {store.isTablet || view
                ?   null
                :   <div style={STYLES.item}>
                        {work.clientType}
                    </div>}
        </div>
    );
};
