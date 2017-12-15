import * as React from 'react';
import {IWorkLabel} from '.';
import {EClientType, ETeamType} from './index';

const BOX_CONFIGS = [
    // First row
    { x: 0, y: 10, color: "#12ccaf" },
    { x: 0, y: 20, color: "#12ccaf" },
    { x: 0, y: 30, color: "#12ccaf" },
    // Second row
    { x: 10, y: 0,  color: "#A49EFC" },
    { x: 10, y: 20, color: "#A49EFC" },
    // Third row
    { x: 20, y: 10, color: "#A49EFC" },
    // Fifth row
    { x: 40, y: 10, color: "#A49EFC" },
    // Sixth row
    { x: 50, y: 0,  color: "#A49EFC" },
    { x: 50, y: 20, color: "#A49EFC" },
    { x: 50, y: 30, color: "#12ccaf" }
];

export const WORK_LABELS: IWorkLabel[] = [
    {
        id     : 'phonetradr-work-svg',
        title  : 'Phonetradr',
        link   : 'https://www.phonetradr.com/',
        color: "#12ccaf",
        teamType: ETeamType.TwoToFive,
        clientType: EClientType.StartUp,
        content:
            <svg viewBox="0 0 60 40">
                {BOX_CONFIGS.map((config, i) =>
                    <rect
                        key={`box-${i}`}
                        x={config.x}
                        y={config.y}
                        width="10"
                        height="10"
                        fill={config.color}
                    />)}
            </svg>
    },
    {
        id: 'gulumjan-work-svg',
        title: 'Gulumjan Consulting',
        link: 'http://www.gulumjan-consulting.de/home/de',
        color: "#3F51B5",
        teamType: ETeamType.Individual,
        clientType: EClientType.Individual,
        content:
            <svg
                viewBox="0 0 256 256"
                xmlSpace="preserve"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.41421"
            >
                <path
                    d="M89.684,118.449l0,46.834l-0.146,0l0.146,0.437c-7.855,5.914 -17.987,8.872 -30.399,8.872c-15.127,0 -27.296,-4.485 -36.507,-13.454c-9.212,-8.969 -13.818,-21.26 -13.818,-36.871c0,-14.836 4.582,-26.981 13.745,-36.435c9.163,-9.454 20.726,-14.181 34.689,-14.181c11.539,0 21.09,2.23 28.653,6.691l0,12.654c-7.951,-5.237 -17.162,-7.855 -27.635,-7.855c-10.957,0 -19.878,3.564 -26.762,10.691c-6.885,7.127 -10.327,16.605 -10.327,28.435c0,12.121 3.394,21.647 10.181,28.58c6.788,6.933 16.145,10.4 28.072,10.4c6.594,0 12.702,-1.309 18.326,-3.927l0,-30.544l-21.526,0l0,-10.327l33.308,0Z"
                    fill="#333"
                    fillRule="nonzero"
                />
                <path
                    d="M118.337,135.466c-3.685,-3.684 -5.527,-8.29 -5.527,-13.817c0,-5.527 1.818,-10.133 5.454,-13.818c3.636,-3.684 8.218,-5.527 13.745,-5.527c5.43,0 10.012,1.867 13.745,5.6c3.733,3.733 5.6,8.315 5.6,13.745c0,5.43 -1.843,10.012 -5.527,13.745c-3.685,3.733 -8.242,5.599 -13.673,5.599c-5.527,0 -10.132,-1.842 -13.817,-5.527Z"
                    fill="#333"
                    fillRule="nonzero"
                />
                <path
                    d="M245.895,79.323l0,12.073c-4.267,-2.231 -8.097,-3.83 -11.491,-4.8c-3.393,-0.97 -7.854,-1.455 -13.381,-1.455c-10.569,0 -19.369,3.588 -26.399,10.764c-7.03,7.175 -10.545,16.532 -10.545,28.071c0,12.024 3.491,21.623 10.473,28.799c6.981,7.175 16.241,10.763 27.78,10.763c9.309,0 17.26,-2.473 23.854,-7.418l0,12.363c-6.012,4.073 -14.254,6.109 -24.726,6.109c-14.739,0 -26.714,-4.533 -35.926,-13.599c-9.212,-9.067 -13.818,-21.406 -13.818,-37.017c0,-14.739 4.679,-26.738 14.036,-35.998c9.357,-9.261 21.114,-13.891 35.271,-13.891c10.182,0 18.472,1.746 24.872,5.236Z"
                    fill="#333"
                    fillRule="nonzero"
                />
            </svg>
    },
    {
        id     : 'eventerprise-work-svg',
        title  : 'Eventerprise',
        link   : 'https://www.eventerprise.com/',
        color: "#0071ba",
        teamType: ETeamType.FiveToTen,
        clientType: EClientType.StartUp,
        content:
            <img
                style={{height: "100%", width: "auto"}}
                src="/images/work/eventerprise.jpg"
            />
    },
    {
        id     : 'urban-circus-work-svg',
        title  : 'Urban Circus',
        link   : 'http://urbancircus.com.au/',
        color: "#f7921e",
        teamType: ETeamType.TwoToFive,
        clientType: EClientType.Company,
        content:
            <img
                style={{height: "100%", width: "auto"}}
                src="/images/work/urban-circus.png"
            />
    },
];
