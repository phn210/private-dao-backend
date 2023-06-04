import { LeafInserted, LeafModel } from "../../internal/models/fund"
import Tree from '../../internal/utils/merkle-tree'
import {
    Element,
} from "fixed-merkle-tree";
async function getTree(): Promise<Array<Array<string>>> {
    let data = await LeafModel.find()
    let path = new Array<string[]>(data.length)
    let tree = Tree.getPoseidonHashTree()
    for (let i = 0; i < data.length; i++) {
        tree.insert(data[i].commitment);
    }
    for (let i = 0; i < data.length; i++) {
        let leafInfo = tree.path(i);
        path[i] = leafInfo.pathElements.map(e => e.toString())
    }

    return path;
}

export { getTree }