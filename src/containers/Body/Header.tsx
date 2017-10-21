import * as React from 'react';
import { computed } from 'mobx';
import { pageList } from '../../data/pages/index';
import { HeaderItem } from './';
import { observer } from 'mobx-react';

@observer
export class Header extends React.Component<{}, {}> {

    @computed static get styles(): any {
        return {
            header: {
                position: "fixed",
                left: 0,
                top: 0,
                textAlign: "left",
                width: "100%",
                zIndex: 10
            },
            header__selector: {
                display: "inline-block",
                padding: "14px 0px",
                width: 100 / pageList.length + "%"
            }
        };
    }

    render(): JSX.Element {
        return (
            <div style={ HeaderItem.styles.header }>
                {pageList.map((page, i) =>
                    <div key={`page-${i}`}
                         style={ HeaderItem.styles.header__selector }>
                        <HeaderItem
                            page={page}
                        />
                    </div>
                    )}
            </div>
        );
    }
}
