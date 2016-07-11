import Rsync from 'rsyncwrapper'
import Configer from './configer'

export default class Rsyncer {
    constructor(workDir) {
        this._workDir = workDir
    }

    mergeArray(arr1, arr2) {
        return arr1.concat(arr2.filter((value, index) => arr1.indexOf(value)<0 ))
    }

    runSync(option = {}) {
        let dest = Configer.Get("host")
        if(dest === "") {
            return
        }
        let defaultOption = {
            src: this._workDir,
            dest,
            recursive: true,
            exclude: Configer.Get("exclude"),
            ssh: true,  
        }
        let newOption = Object.assign(defaultOption, option)
        if(!(newOption.exclude instanceof Array)) {
            delete newOption.exclude
        }
        Rsync(newOption, (err, stdout, stderr, cmd) => {
            if(Configer.Get("debug")) {
                if(err) {
                    console.error(`error: ${err} stderr: ${stderr}`)
                }
                console.log(cmd)
            }
        })
    }

    SyncDir() {
        this.runSync()
    }
    SyncRemove() {
        this.runSync({delete: true})
    }
}