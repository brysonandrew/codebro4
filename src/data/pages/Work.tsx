import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IInlineStyles, prefixer, colors } from '..';
import { IWorkLabel, work } from '../labels';
import { Store } from '../Store';
const ROW_HEIGHT = 30;
const ROW_MARGIN = 10;
const TOTAL_HEIGHT = (ROW_HEIGHT + ROW_MARGIN) * (work.length + 1);

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Work extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "work",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: colors.wht,
            fontSize: 20,
            height: TOTAL_HEIGHT,
            transform: `translate(-50%, -${TOTAL_HEIGHT * 0.5}px)`
        }),
        header: {
            opacity: 0.66,
            fontSize: 12
        },
        info: {
            id: "work info",
            height: ROW_HEIGHT,
            margin: `${ROW_MARGIN * 0.5}px 0`,
            padding: "0 4px"
        },
        item: {
            display: "inline-flex",
            verticalAlign: "top",
            textAlign: "left",
            alignItems: "center",
            height: ROW_HEIGHT,
            width: 295
        }
    };

    headers = () => {
        if (this.props.store.isMobile) {
            return [
                ""
            ]
        } else if (this.props.store.isTablet) {
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

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                <div>
                    {this.headers().map(head =>
                        <div style={{...this.STYLES.item, ...this.STYLES.header}}>
                            {head}
                        </div>)}
                    {work.map((work: IWorkLabel, i) =>
                        <div
                            key={work.id}
                            style={{...this.STYLES.info, border: `1px solid ${work.color}`}}
                        >
                            <div style={this.STYLES.item}>
                                {work.title}
                            </div>
                            {this.props.store.isMobile
                                ?   null
                                :   <div style={this.STYLES.item}>
                                        {work.teamType}
                                    </div>}
                            {this.props.store.isTablet
                                ?   null
                                :   <div style={this.STYLES.item}>
                                        {work.clientType}
                                    </div>}
                        </div>
                    )}
                </div>

            </div>
        );
    }
}
