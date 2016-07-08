import Rsync from 'rsyncwrapper'
import Configer from './configer'

export default class Rsyncer {
    constructor(workDir) {
        this._workDir = workDir
    }

    runSync(option = {}) {
        let defaultOption = {
            src: this._workDir,
            dest: Configer.Get('host'),
            recursive: true,
            exclude: [".git/*"],
            ssh: true,  
        }
        let newOption = Object.assign(defaultOption, option)
        Rsync(newOption, (err, stdout, stderr, cmd) => {})
    }

    SyncDir() {
        this.runSync()
    }
    SyncRemove() {
        this.runSync({delete: true})
    }
}