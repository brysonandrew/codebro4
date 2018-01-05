import * as React from 'react';
import {IDictionary, IInlineStyles} from '../../models';

interface IProps {
    isOpen?: boolean;
    icons?: string[];
    onClick?: () => void;
}

const STYLES: IInlineStyles = {
    p: {
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle",
        width: 40,
        height: 40,
        padding: 0,
        border: "none",
        background: "transparent",
        zIndex: 4,
        cursor: "pointer"
    },
    icon: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        opacity: 0,
        transformOrigin: "0 0",
        transform: "rotate(180deg) translate(-50%, -50%)",
        transition: "transform 200ms, opacity 200ms"
    },
    iconSelected:  {
        opacity: 1,
        transform: "rotate(0deg) translate(-50%, -50%)"
    }
};

const iconBackground = (icon: string): IDictionary<string> =>
        ({background: `url(/images/${icon}.svg)`});

const isShown = (i, isOn): boolean => (isOn && i === 0 || !isOn && i === 1);

const iconStyle = (icon, i, isOn) =>
    ({
        ...STYLES.icon,
        ...iconBackground(icon),
        ...isShown(i, isOn) ? null : STYLES.iconSelected
    });

export class SwitchButton extends React.Component<IProps, {}> {

    public render(): JSX.Element {
        const { isOpen, icons, onClick } = this.props;

        return (
            <button
                style={STYLES.p}
                onClick={onClick}
            >
                {icons.map((icon, i) => (
                    <div
                        key={`icon ${i}`}
                        style={iconStyle(icon, i, isOpen)}
                    />
                ))}
                {this.props.children}
            </button>
        );
    }
}
