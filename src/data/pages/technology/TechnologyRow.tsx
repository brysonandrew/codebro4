import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../../';
import {ITechnology} from './index';
import {TechnologyItem} from './TechnologyItem';

interface IProps {
    techRow: ITechnology
    techCol: ITechnology[]
}

@observer
export class TechnologyRow extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            id: "row",
            position: "relative",
            cursor: "pointer"
        },
        techRowName: {
            id: "techRowName",
            position: "absolute",
            left: "17.5%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            opacity: 0.66
        }
    };

    render(): JSX.Element {
        return (
            <div
                style={{
                    ...this.STYLES.p,
                    height: `${100 / this.props.techCol.length}%`
                }}
            >
                <div style={{...this.STYLES.techRowName, color: this.props.techRow.backgroundColor}}>
                    {this.props.techRow.name}
                </div>
                {this.props.techRow.technologies.map(tech =>
                    <TechnologyItem
                        key={tech.id}
                        tech={tech}
                        techRow={this.props.techRow}
                    />)}
            </div>
        );
    }
}
