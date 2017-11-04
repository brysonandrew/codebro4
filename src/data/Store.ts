import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import { IParams, buildMap, breakPointTests, IDictionary, setBodyStyle, toParams } from '.';
import { ITabData } from '../app/main';
import { MAIN_PAGES } from './pages';

export class Store {
    isWideHeaderItemMounted: boolean;
    @observable isIntroMounted: boolean;
    @observable isAnimating: boolean;
    @observable isMainMounted: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable isCollapseMenuOpen: boolean;
    @observable isToggleMenuMounted: boolean;
    @observable isResizing: boolean;
    @observable isTabsMeasured: boolean;
    @observable wakeUpDuration: number;
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
    timeoutStopDelay = 50;

    constructor(initialState?: { store: Store }) {
        this.isIntroMounted = false;
        this.isWideHeaderItemMounted = false;
        this.isAnimating = false;
        this.isMainMounted = false;
        this.isCollapseMenuOpen = false;
        this.isToggleMenuMounted = false;
        this.isResizing = false;
        this.isTabsMeasured = false;
        this.wakeUpDuration = 800;
        this.currentIndex = 0;
        this.hoverMenuIndex = -1;
        this.projectOffsetList = [];
        this.projectOffsets = {};
        this.pagesLength = MAIN_PAGES.length;
        this.width = 0;
        this.height = 0;
        this.docScroll = 0;
        this.savedParams = buildMap({
            activePagePath: "",
            activeViewPath: ""
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
        if (isCollapseMenuOpen) {
            console.log("close");
        } else {
            console.log("open");
        }
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
    public onMainMount = (isMounted: boolean) => {
        setBodyStyle('position', isMounted ? 'static' : 'fixed');
        this.isMainMounted = isMounted;
        this.wakeUpDuration = 400;
    };

    @action
    public onIntroMount = (isMounted: boolean) => {
        this.isIntroMounted = isMounted;
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
                activePagePath: 'intro'
            });
            console.log("yo intro");
            browserHistory.push('/intro');
        }
        this.onMeasureViewport(window.innerWidth, window.innerHeight);
        this.onAnimationStart();
        this.onMainMount(true);
    };

    @action
    public reset = () => {
        setTimeout(() => {
            this.isIntroMounted = false;
            this.isWideHeaderItemMounted = false;
            this.isAnimating = false;
            this.isMainMounted = false;
            this.isCollapseMenuOpen = false;
            this.isToggleMenuMounted = false;
            this.isResizing = false;
            this.currentIndex = 0;
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
