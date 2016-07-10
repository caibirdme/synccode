export default class FakeTree {
    constructor(rootDir) {
        //console.log(`this is fake tree`)
        this._rootDir = rootDir
    }

    Stop() {
        //console.log('fake stop')
    }

    CreateFile(f, stat) {
        //console.log('fake create')
    }

    ChangeFile(f, stat) {
        //console.log('fake change')
    }

    RemoveFile(f, stat) {
        //console.log('fake remove')
    }

    RestoreTree() {
        //console.log('fake restore')
    }
}