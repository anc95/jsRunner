import {
    Entry
} from '../interfaces'
import fsExtra from 'fs-extra'
import path from 'path'

export default class EntryImpl implements Entry {
    private entryDir: string = ''

    constructor(
        private root: string,
        private tmpDirName: string
    ) {
        this.entryDir = path.join(this.root, this.tmpDirName || '.jsrunner-entry')
        this.processExitEvent()
    }

    private processExitEvent() {
        process.on('SIGINT', () => {
            fsExtra.removeSync(this.entryDir)
        })
    }

    public ensureEntryDir() {
        fsExtra.ensureDirSync(this.entryDir)
        return this.entryDir
    }
}