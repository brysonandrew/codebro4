import * as React from "react";
import { ThreeBarLoader } from './ThreeBarLoader';
import { TextLoader } from "./TextLoader";
import { BoxLoader } from './BoxLoader';
import { BoxLoaderPT } from './BoxLoaderPT';
import { GrowingCircleLoader } from './GrowingCircleLoader';

export const loaders = [
    <ThreeBarLoader/>,
    <TextLoader/>,
    <BoxLoader
        size={100}
    />,
    <BoxLoaderPT/>,
    <GrowingCircleLoader
        size={50}
    />
];
