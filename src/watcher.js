import watchUtil from 'watch'
import Rsyncer from './rsyncer'
import TreeFactory from './factory/tree'
import Configer from './configer'

export default class Watcher {
    constructor(rootDirectory, watchOptions) {
        this._directoryTree = TreeFactory(rootDirectory)
        this._rsyncer = new Rsyncer(rootDirectory)
        watchUtil.createMonitor(rootDirectory, watchOptions, monitor => {
            this._monitor = monitor
            this._monitor.on('created', this.handleCreated.bind(this))
            this._monitor.on('changed', this.handleChanged.bind(this))
            if(Configer.Get("delete")) {
                this._monitor.on('removed', this.handleRemoved.bind(this))
            }
        })
    }
    Stop() {
        this._directoryTree.RestoreTree()
        this._monitor.stop()
    }
    //f is the absolutely path of target file
    handleCreated(f, stat) {
        this._rsyncer.SyncDir()
        this._directoryTree.CreateFile(f, stat)
    };

    handleChanged(f, curStat, prevStat) {
        this._rsyncer.SyncDir()
        this._directoryTree.ChangeFile(f, curStat)
    }

    handleRemoved(f, stat) {
        this._rsyncer.SyncRemove()
        this._directoryTree.RemoveFile(f, stat)
    }
}