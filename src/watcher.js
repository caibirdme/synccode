import watchUtil from 'watch'

export default class Watcher {
    constructor(rootDirectory, watchOptions) {
        watchUtil.createMonitor(rootDirectory, watchOptions, monitor => {
            this._monitor = monitor
            this._monitor.on('created', this.handleCreated)
            this._monitor.on('changed', this.handleChanged)
            this._monitor.on('removed', this.handleRemoved)
        })
    }
    Stop() {
        this._monitor.stop()
    }
    handleCreated(f, stat) {

    }
    handleChanged(f, current, previous) {

    }
    handleRemoved(f, stat) {
        
    }
}