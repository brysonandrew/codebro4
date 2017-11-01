import * as React from 'react';
import {EMascotMood, mascotSteps} from './mascotSteps';

interface IProps {
    currentStep: EMascotMood
}

export const MascotArmLeft = (props: IProps) => {
    return (
        <g id="mascot_arm_left">
            <g id="Group 4">
                <g id="Path 2">
                    <path
                        id="path14_stroke"
                        transform="matrix(0.731354 -0.681998 0.681998 0.731354 786.343 5592.78)"
                        fill="#2F2B64"
                        d={mascotSteps[props.currentStep].leftArmPath}
                    >
                        <animate
                            from={mascotSteps[EMascotMood.MONEY].leftArmPath}
                            to={mascotSteps[EMascotMood.APPROVE_WITH_SMILE_HANDS_UP_03].leftArmPath}
                            fill="freeze"
                            repeatCount="indefinite"
                            dur="2s"
                            attributeName="d"
                        />
                    </path>
                </g>
                <g id="Group 5">
                    <g id="Line">
                        <path
                            id="path1_stroke"
                            transform="translate(780 5578)"
                            fill="#A499FF"
                            d="M 8.48842 2.60473C 9.92697 1.7827 10.4268 -0.0498645 9.60473 -1.48842C 8.7827 -2.92697 6.95014 -3.42676 5.51158 -2.60473L 8.48842 2.60473ZM -1.48842 1.39527C -2.92697 2.2173 -3.42676 4.04986 -2.60473 5.48842C -1.7827 6.92697 0.0498645 7.42676 1.48842 6.60473L -1.48842 1.39527ZM 5.51158 -2.60473L -1.48842 1.39527L 1.48842 6.60473L 8.48842 2.60473L 5.51158 -2.60473Z"
                        />
                    </g>
                    <g id="Line Copy">
                        <path
                            id="path2_stroke"
                            transform="translate(781 5583)"
                            fill="#A499FF"
                            d="M 8.18176 2.75744C 9.70465 2.10477 10.4101 0.341131 9.75743 -1.18176C 9.10477 -2.70465 7.34113 -3.4101 5.81824 -2.75744L 8.18176 2.75744ZM -1.18176 0.242565C -2.70465 0.895232 -3.4101 2.65887 -2.75744 4.18176C -2.10477 5.70465 -0.341131 6.4101 1.18176 5.75744L -1.18176 0.242565ZM 5.81824 -2.75744L -1.18176 0.242565L 1.18176 5.75744L 8.18176 2.75744L 5.81824 -2.75744Z"
                        />
                    </g>
                    <g id="Line Copy">
                        <path
                            id="path3_stroke"
                            transform="translate(784 5571)"
                            fill="#A499FF"
                            d="M -0.431529 12.1373C -0.0795641 13.7563 1.51825 14.7835 3.13729 14.4315C 4.75633 14.0796 5.78349 12.4817 5.43153 10.8627L -0.431529 12.1373ZM 2.93153 -0.637289C 2.57956 -2.25633 0.98175 -3.28349 -0.637289 -2.93153C -2.25633 -2.57956 -3.28349 -0.98175 -2.93153 0.637289L 2.93153 -0.637289ZM 5.43153 10.8627L 2.93153 -0.637289L -2.93153 0.637289L -0.431529 12.1373L 5.43153 10.8627Z"
                        />
                    </g>
                    <g id="Line Copy 2">
                        <path
                            id="path4_stroke"
                            transform="translate(783 5587)"
                            fill="#A499FF"
                            d="M 6.54349 2.57248C 7.96423 1.72003 8.42492 -0.122746 7.57248 -1.54349C 6.72003 -2.96423 4.87725 -3.42492 3.45651 -2.57248L 6.54349 2.57248ZM -1.54349 0.427521C -2.96423 1.27997 -3.42492 3.12275 -2.57248 4.54349C -1.72003 5.96423 0.122746 6.42492 1.54349 5.57248L -1.54349 0.427521ZM 3.45651 -2.57248L -1.54349 0.427521L 1.54349 5.57248L 6.54349 2.57248L 3.45651 -2.57248Z"
                        />
                    </g>
                </g>
            </g>
        </g>
    );
};
