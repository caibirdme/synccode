import Configer from "../configer"
import Tree from "../tree/tree"
import FakeTree from "../tree/faketree"

export default function treeFactory(rootDir) {
    let experiment = Configer.Get("experiment")
    if (experiment) {
        return new Tree(rootDir)
    }
    return new FakeTree(rootDir)
}