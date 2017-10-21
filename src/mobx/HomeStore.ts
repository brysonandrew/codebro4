import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { IParams, buildMap, breakPointTests, IDictionary } from '../data';
import {pageList} from '../data/pages/index';

export class HomeStore<Item> {

    // @observable items: Array<Item> = [];
    @observable isWheelRecorded: boolean;
    @observable isAnimating: boolean;
    @observable isAppMounted: boolean;
    @observable isWheel: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable width: number;
    @observable height: number;
    @observable scrollY: () => number;
    @observable docScroll: number;
    @observable projectOffsetList: number[];
    @observable projectOffsets: IDictionary<number>;
    @observable savedParams: Map<string, string>;
    timeoutId;
    timeoutStopDelay = 50;

    constructor(initialState?: { homeStore: HomeStore<Item> }) {
        // this.items = initialState && initialState.homeStore && initialState.homeStore.items ? initialState.homeStore.items : [];
        this.isWheelRecorded = false;
        this.isAnimating = false;
        this.isAppMounted = false;
        this.isWheel = false;
        this.projectOffsetList = [];
        this.projectOffsets = {};
        this.width = 0;
        this.height = 0;
        this.docScroll = 0;
        this.savedParams = buildMap({
            activePagePath: ""
        });
    }

    @action
    public onScroll = () => {
        if (!this.isAnimating) {
            this.changeProjectPathOnScroll();
        }
        this.docScroll = this.scrollY();
        this.isWheel = true;
    };

    @action
    public onWheel = () => {
        this.isWheel = true;
        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.isWheel = false;
            },
            this.timeoutStopDelay);
        if (this.isAnimating) {
            this.docScroll = this.scrollY();
        }
    };

    @action
    changeProjectPathOnScroll = () => {
        const approachingProjectBuffer = 200;
        const PagesInnerScrolledPastOffsets = this.projectOffsetList.filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = PagesInnerScrolledPastOffsets.length > 0
            ?   PagesInnerScrolledPastOffsets.length - 1
            :   -1;

        if (currentIndex > -1 && pageList[currentIndex].path !== this.savedParams.get("activePagePath")) {
            const nextPath = `/${pageList[currentIndex].path}`;
            browserHistory.push(nextPath);
        }
    };

    @action
    public onAnimationStart = () => {
        this.isAnimating = true;
    };

    @action
    public onAnimationEnd = () => {
        this.isAnimating = false;
    };

    @action
    public onResizeViewport = (width: number, height: number) => {
        this.width = width;
        this.height = height;
        this.isMobile = breakPointTests.isMobile(width);
        this.isTablet = breakPointTests.isTablet(width);
        this.isLaptop = breakPointTests.isLaptop(width);
        this.projectOffsetList = pageList.map((_, i) => i * width);
        this.projectOffsets = this.projectOffsetList.reduce((acc, curr, i) => {
            acc[pageList[i].path] = curr;
            return acc;
        }, {});
    };

    @action
    public onLocationListen = (nextParams: IParams) => {
        this.savedParams = buildMap(nextParams);
    };

    @action
    public onLoad = (nextParams: IParams) => {
        setTimeout(() => {
            this.isAppMounted = true;
        }, 800);
        this.scrollY = () => (!!document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        this.savedParams = buildMap(nextParams);
    };
}
