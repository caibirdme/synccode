import { workspace } from 'vscode'

export default class Configer {
    static Get(key) {
        return workspace.getConfiguration(key)
    }
}