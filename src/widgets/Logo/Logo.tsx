import * as React from 'react';
import { Word } from './Word';

export const Logo = () => {
    const styles = {
        logo: {
            id: "logo",
            display: "inline-block",
            verticalAlign: "middle"
        }
    } as any;
    const words = ["c", "b"];

    return (
        <div style={styles.logo}>
            {words.map(word =>
                <Word
                    key={word}
                    word={word}
                />)}
        </div>
    );
};
