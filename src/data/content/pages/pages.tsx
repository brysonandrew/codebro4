import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models/models';

function PortfolioProject(name) {
    this.name = name;
    this.path = toPath(this.name);
}

export const pageList: IPage[] = [
    new PortfolioProject(
        "Bro"
    ),
    new PortfolioProject(
        "Syn"
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
