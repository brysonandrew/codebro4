import * as React from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { IInlineStyles, prefixer, colors, Store, IWorkLabel, WORK_LABELS, toPath } from '../..';
import { WorkItem } from './WorkItem';
import { WorkHeading } from './WorkHeading';
import { WorkDetails } from './WorkDetails';
export const ROW_HEIGHT = 30;
export const ROW_MARGIN = 10;
const TOP_MARGIN = 75;

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Work extends React.Component<IProps, {}> {

    TOTAL_HEIGHT = (ROW_HEIGHT + ROW_MARGIN) * (WORK_LABELS.length + 1);

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "work",
            position: "absolute",
            top: 0,
            left: "50%",
            color: colors.wht,
            fontSize: 20,
            transition: "transform 400ms"
        }),
        header: {
            opacity: 0.66,
            fontSize: 12
        }
    };

    handleItemClick = (title: string) => {
        if (!this.props.store.savedParams.get("activeViewPath")) {
            browserHistory.push(`/selected-work/${toPath(title)}`);
        } else {
            browserHistory.push("/selected-work");
        }
    };

    view = () => this.props.store.savedParams.get("activeViewPath");
    isMobile = () => this.props.store.isMobile;
    isTablet = () => this.props.store.isTablet;
    width = () => !!this.view() ? this.isMobile() ? 295 : this.isTablet() ? 590 : 885 : 295;

    renderItems() {
        const items = [
            {
                name:       "heading",
                condition:  !this.view(),
                component:  <WorkHeading
                                key="Work.WorkHeading"
                                isMobile={this.isMobile()}
                                isTablet={this.isTablet()}
                            />
            }
        ].concat(WORK_LABELS.map((work: IWorkLabel) => (
            {
                name: work.title,
                condition: (!this.view() || toPath(work.title) === this.view()),
                component:  <WorkItem
                                key={work.id}
                                width={this.width()}
                                work={work}
                                view={this.view()}
                                store={this.props.store}
                                onClick={this.handleItemClick}
                            />
            }
        )),
            [{
                name:       "item",
                condition:  !!this.view(),
                component:  <WorkDetails
                                key="Work.WorkDetails"
                                width={this.width()}
                                work={WORK_LABELS.filter(work => toPath(work.title) === this.view()).pop()}
                                faintColor={colors.faint}
                            />
            }]
        );

        return items.filter(item => item.condition).map(item => item.component);
    }

    inY = (height) => height * 0.5 - this.TOTAL_HEIGHT * 0.5;

    render(): JSX.Element {
        return (
            <div
                style={{
                    ...this.STYLES.p
                    , height: this.view() ? (this.props.store.height - TOP_MARGIN) : this.TOTAL_HEIGHT
                    , transform: `translate(-50%, ${this.view() ? TOP_MARGIN : this.inY(this.props.store.height)}px)`
                }}
            >
                {this.renderItems()}
            </div>
        );
    }
}
