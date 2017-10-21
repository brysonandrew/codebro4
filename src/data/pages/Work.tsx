import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import {IInlineStyles} from '../models';

const WORK = [
    "Porizi Software",
    "Co-workz Coworking Spaces",
    "Roman Gulumjan Consulting",
    "phonetradr"
];

@observer
export class Work extends React.Component<{}, {}> {

    @computed static get styles(): IInlineStyles {
        return {
            coversInner: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }
        };
    }
    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div style={Work.styles.coversInner}>
                {WORK.map((work) => <div key={work}>{work}</div>)}
            </div>
        );
    }
}
