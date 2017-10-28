import * as React from 'react';
import { observer } from 'mobx-react';
import {IInlineStyles} from '../../data';
import {CollapseHeaderToggle} from './CollapseHeaderToggle';
import {CollapseHeaderMenu} from './CollapseHeaderMenu';

const STYLES: IInlineStyles = {
    p: {
        id: "collapse header",
        position: 'relative',
        width: "100%"
    },
    toggle: {
        position: 'relative',
        width: 100,
        height: 100
    }
};

@observer
export class CollapseHeader extends React.Component<{}, {}> {

    render(): JSX.Element {
        return (
            <div style={STYLES.p}>
                <div style={STYLES.toggle}>
                    <CollapseHeaderToggle/>
                </div>
                <CollapseHeaderMenu/>
            </div>
        );
    }
}
