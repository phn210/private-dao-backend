import { LeafInserted, LeafModel } from "../../internal/models/fund"
import { TreeInfo } from "../../internal/models/leaf";
import Tree from '../../internal/utils/merkle-tree'
import {
    Element,
} from "fixed-merkle-tree";
async function getTree(): Promise<TreeInfo> {
    let data = await LeafModel.find()
    let path = new Array<string[]>(data.length)
    let treeInfo:TreeInfo = {};
    let tree = Tree.getPoseidonHashTree() 
    for (let i = 0; i < data.length; i++) {
        tree.insert(BigInt(data[i].commitment).toString());
    }
    for (let i = 0; i < data.length; i++) {
        let leafInfo = tree.path(i);
        path[i] = leafInfo.pathElements.map(e => e.toString())
        treeInfo[data[i].commitment] = {
            pathElement: path[i],
            pathPosition: leafInfo.pathPositions,
            pathIndices: leafInfo.pathIndices,
            pathRoot: leafInfo.pathRoot.toString()
        }
    }

    return treeInfo;
}

export { getTree }