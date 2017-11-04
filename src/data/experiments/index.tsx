import * as React from "react";
import { observer } from 'mobx-react';
import { MascotControls } from './Mascot';
import { Hamburgers } from './Hamburgers';
import { Particles } from './Particles';

import { PageMaker, IPage, IInlineStyles, IDictionary, arrayToDictionary, colors } from '..';
import { InternalLink, UnderlineSwitch } from '../../widgets';

const MENU_NAME = "Lab Menu";

@observer
export class LabMenu extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: {
            position: "relative",
            textAlign: "center",
            width: "100%"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {EXPERIMENTS.map((experiment, i) =>
                    (experiment.name !== MENU_NAME
                        ?   <div key={`link-${i}`}>
                                <UnderlineSwitch
                                    height={1}
                                    underlineColor={colors.blk}
                                >
                                    <InternalLink
                                        path={experiment.path}
                                    >
                                        {experiment.name}
                                    </InternalLink>
                                </UnderlineSwitch>
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
    ),
    new PageMaker(
        "Hamburgers",
        <Hamburgers/>
    ),
    new PageMaker(
        "Particles",
        <Particles/>
    )
];

export const EXPERIMENTS_PATHS: string[] = EXPERIMENTS.map(experiment => experiment.path);
export const EXPERIMENTS_DICT: IDictionary<IPage> = arrayToDictionary(EXPERIMENTS, "path");

export { MascotControls }
