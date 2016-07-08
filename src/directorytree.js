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
            this._dirTree = convertDirIntoTree(this._workDir, file => false)
        }
    }
    
    convertDirIntoTree(path, shouldIgnore) {
        let name = Path.basename(path)
        if(shouldIgnore(name)) {
            return null
        }
        let tree = { name }
        let stat
        try {
            stat = fs.statSync(path)
        } catch(e) {
            return null
        }
        if(stat.isFile()) {
            tree.lastModify = stat.mtime
            return tree
        }
        tree.children = {}
        fs
        .readdirSync(path)
        .forEach(fileName => {
            let subtree = convertDirIntoTree(Path.join(path, fileName), shouldIgnore)
            if(subtree !== null) {
                tree.children[fileName] = subtree
            }
        })
        if(this.isEmptyObject(tree.children)) {
            return null
        }
        return tree
    }

    getRelativePath(path) {
        if(path.length <= this._workDir || path.indexOf(this._workDir) === -1) {
            return ""
        }
        return path.substr(this._workDir.length).trim("/")
    }

    resolvePathToArray(path) {
        return this.getRelativePath(path).split("/")
    }

    resolveObjectInTree(path) {
        let pathArr = this.resolvePathToArray(path)
        let tree = this._dirTree
        if(pathArr.length === 0) {
            return [tree, false, 0]
        }
        for(let i = 0; i<pathArr.length; i++) {
            let fileName = pathArr[i]
            if(!tree.children[fileName]) {
                return [tree, false, i]
            }
            tree = tree.children[fileName]
        }
        return [tree, true, i]
    }

    isEmptyObject(obj) {
        for(let key in obj) {
            return false
        }
        return true
    }

    buildFullPathInTree(path, resolvedObject = null) {
        let [tree, ok, depth] = resolvedObject instanceof Array ? resolvedObject : this.resolveObjectInTree(path)
        if(ok) {
            return tree
        }
        let pathArr = this.resolvePathToArray(path)
        //the last param of pathArr must be a file rather than a directory
        for(let i = depth; i < pathArr.length-1; i++) {
            tree.children[pathArr[i]] = { children: {}}
            tree = tree.children[pathArr[i]]
        }
        return tree
    }

    CreateFile(path, stat) {
        let tree = this.buildFullPathInTree(path)
        let fileName = Path.basename(path)
        tree.children[fileName] = {
            lastModify: stat.mtime
        }
    }
    
    ChangeFile(path, stat) {
        let [tree, ok, depth] = this.resolveObjectInTree(path)
        if(ok) {
            tree.lastModify = stat.mtime
            return
        }
        this.CreateNewFile(path, stat)
    }
    
    RemoveFile(path, stat) {
        let parentPath = path.substring(0, path.trim('/').lastIndexOf('/'))
        let fileName = Path.basename(path)
        let [tree, ok, depth] = this.resolveObjectInTree(parentPath)
        //In fact the ok must equal true or it is a bug
        if(ok) {
            delete tree.children[fileName]
            if(tree !== this._dirTree && this.isEmptyObject(tree.children)) {
                this.RemoveFile(parentPath)
            }
        }
    }
    
    shouldSync(path) {

    }

    RestoreTree() {
        if(this_._dirTree === null) {
            return
        }
        const content = JSON.stringify(this._dirTree)
        fs.writeFileSync(Path.resolve(this._workDir, './.synccode'), content)
    }
}