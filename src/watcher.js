import watchUtil from 'watch'
import DirectoryTree from './directorytree'

export default class Watcher {
    constructor(rootDirectory, watchOptions) {
        this._directoryTree = new DirectoryTree(rootDirectory)
        watchUtil.createMonitor(rootDirectory, watchOptions, monitor => {
            this._monitor = monitor
            this._monitor.on('created', this.handleCreated)
            this._monitor.on('changed', this.handleChanged)
            this._monitor.on('removed', this.handleRemoved)
        })
    }
    Stop() {
        this._directoryTree.RestoreTree()
        this._monitor.stop()
    }
    //f is the absolutely path of target file
    handleCreated(f, stat) {
        this._directoryTree.CreateFile(f, stat)
    }

    handleChanged(f, curStat, prevStat) {
        this._directoryTree.ChangeFile(f, curStat)
    }

    handleRemoved(f, stat) {
        this._directoryTree.RemoveFile(f, stat)
    }
}