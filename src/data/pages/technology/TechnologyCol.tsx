import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../..';
import {ITechnology} from '.';
import {TechnologyRow} from './TechnologyRow';
import {TECH_HEIGHT} from '.';

interface IProps {
    techCol: ITechnology[]
}

@observer
export class TechnologyCol extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            id: 'col',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            width: '33%',
            height: TECH_HEIGHT
        },
        row: {
            id: 'row',
            position: 'relative',
            cursor: 'pointer'
        }
    };

    render(): JSX.Element {
        return (
            <div
                style={this.STYLES.p}
            >
                {this.props.techCol.map((rowTech, i) =>
                    <div
                        key={rowTech.name}
                        style={{
                            ...this.STYLES.row,
                            height: `${100 / this.props.techCol.length}%`
                        }}
                    >
                        <TechnologyRow
                            key={`rowTech-${i}`}
                            techRow={rowTech}
                            techCol={this.props.techCol}
                        />
                    </div>)}
            </div>
        );
    }
}
