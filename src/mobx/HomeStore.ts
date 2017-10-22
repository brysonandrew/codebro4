import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { IParams, buildMap, breakPointTests, IDictionary } from '../data';
import { PAGES } from '../containers/Body/Pages';

export class HomeStore<Item> {

    // @observable items: Array<Item> = [];
    @observable isAnimating: boolean;
    @observable isAppMounted: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable width: number;
    @observable height: number;
    @observable docScroll: number;
    @observable projectOffsetList: number[];
    @observable projectOffsets: IDictionary<number>;
    @observable savedParams: Map<string, string>;
    pagesLength;
    timeoutId;
    timeoutStopDelay = 50;

    constructor(initialState?: { homeStore: HomeStore<Item> }) {
        // this.items = initialState && initialState.homeStore && initialState.homeStore.items ? initialState.homeStore.items : [];
        this.isAnimating = false;
        this.isAppMounted = false;
        this.projectOffsetList = [];
        this.projectOffsets = {};
        this.pagesLength = PAGES.length;
        this.width = 0;
        this.height = 0;
        this.docScroll = 0;
        this.savedParams = buildMap({
            activePagePath: ""
        });
    }

    @action
    public onScroll = () => {
        this.docScroll = (!!document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            if (!this.isAnimating) {
                this.changeProjectPathOnScroll();
            }
        }, this.timeoutStopDelay);
    };

    @action
    changeProjectPathOnScroll = () => {
        const approachingPageBuffer = 200;
        const pagesInnerScrolledPastOffsets = this.projectOffsetList.filter(offset => (offset - approachingPageBuffer) < window.scrollY);

        const currentIndex = pagesInnerScrolledPastOffsets.length > 0
            ?   pagesInnerScrolledPastOffsets.length - 1
            :   -1;

        if (currentIndex > -1 && PAGES[currentIndex].path !== this.savedParams.get("activePagePath")) {
            const nextPath = `/${PAGES[currentIndex].path}`;
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
        this.onAnimationStart();
        this.width = width;
        this.height = height;
        this.isMobile = breakPointTests.isMobile(width);
        this.isTablet = breakPointTests.isTablet(width);
        this.isLaptop = breakPointTests.isLaptop(width);
        this.projectOffsetList = PAGES.map((_, i) => i * width);
        this.projectOffsets = this.projectOffsetList.reduce((acc, curr, i) => {
            acc[PAGES[i].path] = curr;
            return acc;
        }, {});
    };

    @action
    public onLocationListen = (nextParams: IParams) => {
        this.savedParams = buildMap(nextParams);
    };

    @action
    public onLoad = (nextParams: IParams) => {
        if (nextParams.activePagePath.length > 0) {
            this.savedParams = buildMap(nextParams);
        } else {
            this.savedParams = buildMap({
                activePagePath: "intro"
            });
            browserHistory.push("/intro");
        }
        this.onAnimationStart();
        this.isAppMounted = true;
    };
}
