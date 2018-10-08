import {
    Entry
} from '../interfaces'
import fs from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import _ from 'lodash'
import CONFIG from '../config'

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
            fs.removeSync(this.entryDir)
        })
    }

    public ensureEntryDir() {
        fs.ensureDirSync(this.entryDir)
        return this.entryDir
    }

    public generateEntryFile(jsFilePath: string): string {
        let content = fs.readFileSync(jsFilePath).toString()
        const hash = crypto.createHash('md5').update(content).digest('hex')
        const fileNameReult = /([a-zA-Z\.]+)\.[A-Za-z]*$/.exec(path.basename(jsFilePath))
        const fileName = fileNameReult && fileNameReult[1] || ''
        const entryFilePath = path.join(this.entryDir, `${hash}${fileName}.js`)

        fs.outputFileSync(
            entryFilePath,
            _.template(CONFIG.JS_TEMPLATE)({
                content: `import '${jsFilePath}'`
            })
        )

        return entryFilePath
    }
}