import * as React from 'react';
import { observer } from 'mobx-react';

interface IProps {}

@observer
export class MascotBackground extends React.Component<IProps, {}> {

    render(): JSX.Element {
        return (
            <g id="Canvas" transform="translate(-750 -5513)">
                <clipPath id="clip-0" clipRule="evenodd">
                    <path d="M 750 5513L 900 5513L 900 5663L 750 5663L 750 5513Z" fill="#FFFFFF"/>
                </clipPath>
                <g id="Mascot_001 Copy" clipPath="url(#clip-0)">
                    <path d="M 750 5513L 900 5513L 900 5663L 750 5663L 750 5513Z" fill="#FFFFFF"/>
                    {this.props.children}
                </g>
            </g>
        );
    }
}
