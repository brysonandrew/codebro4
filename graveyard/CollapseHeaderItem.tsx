// import * as React from 'react';
// import { IPage, IInlineStyles, Store, colors } from '../src/data';
// import { inject, observer } from 'mobx-react';
// import { UnderlineSwitch } from '../src/widgets';
//
// const FONT_SIZE = 14;
//
// interface IProps {
//     page: IPage
//     store?: Store
// }
//
// interface IState {
//     isHovered
// }
//
// @inject('store')
// @observer
// export class CollapseHeaderItem extends React.Component<IProps, IState> {
//
//     public constructor(props?: any, context?: any) {
//         super(props, context);
//         this.state = {
//             isHovered: false
//         };
//     }
//
//     STYLES: IInlineStyles = {
//         p: {
//             margin: 0,
//             padding: 16,
//             fontSize: FONT_SIZE
//         }
//     };
//
//     handleMouseEnter = () => {
//         this.setState({
//             isHovered: true
//         })
//     };
//
//     handleMouseLeave = () => {
//         this.setState({
//             isHovered: false
//         })
//     };
//
//     render(): JSX.Element {
//         return (
//             <div
//                 key={this.props.page.name + 1}
//                 style={this.STYLES.p}
//                 onMouseEnter={this.handleMouseEnter}
//                 onMouseLeave={this.handleMouseLeave}
//             >
//                 <UnderlineSwitch>
//                     {this.props.page.name}
//                 </UnderlineSwitch>
//             </div>
//         );
//     }
// }
