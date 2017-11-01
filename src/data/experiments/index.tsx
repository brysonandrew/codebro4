import * as React from "react";
import { observer } from 'mobx-react';
import { MascotControls } from './Mascot';
import { PageMaker, IPage, IInlineStyles, IDictionary, arrayToDictionary } from '..';
import { InternalLink } from '../../widgets';

const MENU_NAME = "Lab Menu";

@observer
export class LabMenu extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: {
            position: "relative",
            width: 320
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {EXPERIMENTS.map((experiment, i) =>
                    (experiment.name !== MENU_NAME
                        ?   <div key={`link-${i}`}>
                                <InternalLink
                                    path={experiment.path}
                                >
                                    {experiment.name}
                                </InternalLink>
                            </div>
                        :   null)
                )}
            </div>
        );
    }
}

export const EXPERIMENTS: IPage[] = [
    new PageMaker(
        MENU_NAME,
        <LabMenu/>
    ),
    new PageMaker(
        "Mascot",
        <MascotControls/>
    )
];

export const EXPERIMENTS_PATHS: string[] = EXPERIMENTS.map(experiment => experiment.path);
export const EXPERIMENTS_DICT: IDictionary<IPage> = arrayToDictionary(EXPERIMENTS, "path");

export { MascotControls }
