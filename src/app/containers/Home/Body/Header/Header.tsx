import * as React from 'react';
import { computed } from 'mobx';
import { pageList } from '../../../../../data/content/pages/pages';
import { HeaderSelector } from './HeaderSelector';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class Header extends React.Component<IProps, IState> {

    @computed public get styles(): any {
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

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div style={ this.styles.header }>
                {pageList.map((page, i) =>
                    <div key={`page-${i}`}
                         style={ this.styles.header__selector }>
                        <HeaderSelector
                            page={page}
                        />
                    </div>
                    )}
            </div>
        );
    }
}
