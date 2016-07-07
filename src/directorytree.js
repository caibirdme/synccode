import * as Path from 'path'
import * as fs from 'fs'
/*
DirectoryTree load synccode file or walk through the directory to initialize a tree in memory

*/

export default class DirectoryTree {
    constructor(workDir) {
        this._workDir = workDir
        this._dirTree = null
        this.loadSynccodeFile()
        this.initTree()
    }
    
    loadSynccodeFile() {
        let syncCodeFile = Path.resolve(this._workDir, './.synccode')
        if(!fs.existsSync(syncCodeFile)) {
            return
        }
        try {
            this._dirTree = JSON.parse(fs.readFileSync(syncCodeFile).toString())
        } catch(e) {
            return
        }
    }
    
    initTree() {
        if(this_dirTree === null) {
            this._dirTree = walkDir(this._workDir, file => false)
        }
    }
    
    walkDir(path, shouldIgnore) {
        let tree = {path}
        let stat
        try {
            stat = fs.statSync(path)
        } catch(e) {
            return null
        }
        if(stat.isFile()) {
            let name = Path.basename(path)
            if(shouldIgnore(name)) {
                return null
            }
            tree.lastModify = stat.mtime
            return tree
        }
        tree.children = fs
                        .readdirSync(path)
                        .map(fileName => {
                            return walkDir(Path.join(path, fileName), shouldIgnore)
                        })
                        .filter(e => !!e) //!!null === false
        if(tree.children.length === 0) {
            return null
        }
        return tree
    }

    createNewFile(path, stat) {

    }
    
    changeFile(path, stat) {

    }
    
    removeFile(path, stat) {

    }
    
    shouldSync(path) {

    }

    RestoreTree() {
        if(this_._dirTree === null) {
            return
        }
        JSON.stringify(this._dirTree)
    }
}