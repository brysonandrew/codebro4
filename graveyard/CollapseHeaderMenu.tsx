// import * as React from 'react';
// import { browserHistory } from 'react-router';
// import { observer, inject } from 'mobx-react';
// import { MAIN_PAGES, IInlineStyles, colors, Store, prefixer } from '../src/data';
// import { CollapseHeaderItem } from './CollapseHeaderItem';
//
// interface IProps {
//     store?: Store
// }
//
// @inject('store')
// @observer
// export class CollapseHeaderMenu extends React.Component<IProps, {}> {
//
//     STYLES: IInlineStyles = {
//         p: {
//             position: "absolute",
//             top: "50%",
//             right: 0,
//             width: 140,
//             height: 280,
//             background: colors.wht,
//             transitionOrigin: "0% 0%",
//             transition: "transform 400ms"
//         },
//         items: prefixer({
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             width: "100%",
//             transform: "translate(-50%, -50%)"
//         }),
//         item: {
//             position: "relative",
//             width: "100%",
//             cursor: "pointer"
//         }
//     };
//
//     handleClick = (path: string, index: number) => {
//         browserHistory.push(`/${path}`);
//         this.props.store.onCurrentIndexChange(index);
//         this.props.store.onAnimationStart();
//         this.props.store.onCollapseMenuToggle(false);
//     };
//
//     render(): JSX.Element {
//         const { isCollapseMenuOpen } = this.props.store;
//
//         return (
//             <div style={prefixer({
//                 ...this.STYLES.p,
//                 transform: `translateX(${isCollapseMenuOpen ? 0 : "100%"})`
//             })}>
//                 {isCollapseMenuOpen
//                     ?   <div style={this.STYLES.items}>
//                             {MAIN_PAGES.map((page, i) =>
//                                 <div
//                                     key={`page-${i}`}
//                                     style={this.STYLES.item}
//                                     onClick={() => this.handleClick(page.path, i)}
//                                 >
//                                     <CollapseHeaderItem
//                                         page={page}
//                                     />
//                                 </div>)}
//                         </div>
//                     :   null}
//             </div>
//         );
//     }
// }
