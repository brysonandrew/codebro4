import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class OriginalsInner extends React.Component<IProps, IState> {

    PLAYLIST_ID = "PLEJAFE35LZu1hhfSYmFtQsZVtFyJ03C8y";
    src = `https://www.youtube.com/embed/?listType=playlist&list=${this.PLAYLIST_ID}`;

    @computed public get styles(): any {
        return {
            originalsInner: {
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
            <div style={this.styles.originalsInner}>
                <iframe width="560" height="315" src={this.src} frameBorder="0" allowFullScreen={true}/>
            </div>
    );
    }
}
