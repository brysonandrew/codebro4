import {observable, action, computed} from 'mobx';
import { browserHistory } from 'react-router';
import { IParams, buildMap, breakPointTests, IDictionary, setBodyStyle, toParams } from '.';
import { ITabData } from '../app/main';
import { MAIN_PAGES, MAIN_PAGES_PATHS } from './pages';
const AWAKE_DURATION = 5000;

export class Store {
    isWideHeaderItemMounted: boolean;
    @observable isAnimating: boolean;
    @observable isAwake: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable isCollapseMenuOpen: boolean;
    @observable isToggleMenuMounted: boolean;
    @observable isResizing: boolean;
    @observable isTabsMeasured: boolean;
    @observable width: number;
    @observable height: number;
    @observable docScroll: number;
    @observable currentIndex: number;
    @observable hoverMenuIndex: number;
    @observable projectOffsetList: number[];
    @observable projectOffsets: IDictionary<number>;
    @observable savedParams: Map<string, string>;
    tabDimensions: Array<ITabData> = [];
    pagesLength;
    timeoutId;
    sleepTimeoutId;
    zoomIntervalId;
    timeoutStopDelay = 50;

    constructor(initialState?: { store: Store }) {
        this.isWideHeaderItemMounted = false;
        this.isAnimating = false;
        this.isAwake = false;
        this.isCollapseMenuOpen = false;
        this.isToggleMenuMounted = false;
        this.isResizing = false;
        this.isTabsMeasured = false;
        this.currentIndex = 0;
        this.hoverMenuIndex = -1;
        this.projectOffsetList = [];
        this.projectOffsets = {};
        this.pagesLength = MAIN_PAGES.length;
        this.width = 0;
        this.height = 0;
        this.docScroll = -5000;
        this.savedParams = buildMap({
            activePagePath: "",
            activeViewPath: ""
        });
    }

    @computed public get scrollHeight(): number {
        return this.height + this.width * (this.pagesLength - 1)
    }

    @action
    public onScroll = () => {
        this.onSetDocScroll((!!document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
        this.timeoutId = setTimeout(() => {
            if (!this.isAnimating && MAIN_PAGES_PATHS.indexOf(this.savedParams.get('activePagePath')) > -1) {
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

        this.onCurrentIndexChange(currentIndex);

        if (currentIndex > -1 && MAIN_PAGES[currentIndex].path !== this.savedParams.get('activePagePath')) {
            const nextPath = `/${MAIN_PAGES[currentIndex].path}`;
            browserHistory.push(nextPath);
        }
    };

    @action onMeasureTabByRef = (ref: HTMLDivElement, index: number) => {

        if (ref) {
            this.tabDimensions[index] = {
                width: ref.clientWidth,
                xOffset: ref.getBoundingClientRect().left
            };
            this.isTabsMeasured = true;
        }
    };

    @action
    public onCurrentIndexChange = (index: number) => {
        this.currentIndex = index;
    };

    @action
    public onHoverMenuIndexChange = (index: number) => {
        this.hoverMenuIndex = index;
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
    public onCollapseMenuToggle = (isCollapseMenuOpen: boolean) => {
        this.isCollapseMenuOpen = isCollapseMenuOpen
    };

    @action
    public onMeasureViewport = (width: number, height: number) => {
        this.isResizing = true;
        this.onAnimationStart();
        this.width = width;
        this.height = height;
        this.isMobile = breakPointTests.isMobile(width);
        this.isTablet = breakPointTests.isTablet(width);
        this.isLaptop = breakPointTests.isLaptop(width);
        this.projectOffsetList = MAIN_PAGES.map((_, i) => i * width);
        this.projectOffsets = this.projectOffsetList.reduce((acc, curr, i) => {
            acc[MAIN_PAGES[i].path] = curr;
            return acc;
        }, {});
        setTimeout(() => {
            this.isResizing = false;
        }, 200);
    };

    @action
    public onLocationListen = (nextParams: IParams) => {
        this.savedParams = buildMap(nextParams);
    };

    @action
    public onAwake = (isAwake: boolean) => {
        this.isAwake = isAwake;
        this.incrementDocScroll();
        this.sleepTimeoutId = setTimeout(() => {
        // back to sleep
            this.isAwake = false;
        }, AWAKE_DURATION);
    };

    @action
    public onWideHeaderItemMount = (isMounted: boolean) => {
        this.isWideHeaderItemMounted = isMounted;
    };

    @action
    public onLoad = (nextParams: IParams) => {
        if (nextParams.activePagePath.length > 0) {
            this.savedParams = buildMap(nextParams);
        } else {
            this.savedParams = buildMap({
                activePagePath: ''
            });
            browserHistory.push('/');
        }
        this.onMeasureViewport(window.innerWidth, window.innerHeight);
        this.onAnimationStart();
    };

    @action
    public incrementDocScroll = () => {
        this.zoomIntervalId = setInterval(() => {
            if (this.docScroll < 0) {
                this.onIncrementDocScroll(200);
            } else {
                clearInterval(this.zoomIntervalId);
            }
        }, 100);
    };

    @action
    public onIncrementDocScroll = (inc: number) => {
        this.docScroll += inc;
        this.setBodyBackground(this.docScroll);
    };

    @action
    public onSetDocScroll = (nextDocScroll: number) => {
        this.docScroll = nextDocScroll;
        this.setBodyBackground(this.docScroll);
    };

    @action
    public setBodyBackground = (docScroll: number) => {
        setBodyStyle("background", `hsl(${360 / this.scrollHeight * this.docScroll}, 65%, 35%)`);
    };

    @action
    public reset = () => {
        setTimeout(() => {
            this.isWideHeaderItemMounted = false;
            this.isAnimating = false;
            this.isAwake = false;
            this.isCollapseMenuOpen = false;
            this.isToggleMenuMounted = false;
            this.isResizing = false;
            this.currentIndex = 10;
            this.projectOffsetList = [];
            this.projectOffsets = {};
            this.pagesLength = MAIN_PAGES.length;
            this.width = 0;
            this.height = 0;
            this.docScroll = 0;
            this.savedParams = buildMap({
                activePagePath: ''
            });
            this.onLoad(toParams("/"));
        }, 0);
    };

}
