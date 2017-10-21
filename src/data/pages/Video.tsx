import * as React from 'react';
import { observer } from 'mobx-react';
import {IInlineStyles} from '../models';

const STYLES: IInlineStyles = {
    video: {
        id: "video",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
};

@observer
export class Video extends React.Component<{}, {}> {

    PLAYLIST_ID = "PLEJAFE35LZu1hhfSYmFtQsZVtFyJ03C8y";
    src = `https://www.youtube.com/embed/?listType=playlist&list=${this.PLAYLIST_ID}`;

    render(): JSX.Element {
        return (
            <div style={STYLES.video}>
                <iframe width="560" height="315" src={this.src} frameBorder="0" allowFullScreen={true}/>
            </div>
    );
    }
}
