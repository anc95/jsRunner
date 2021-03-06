import {
    Entry, Option
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
        private tmpDirName: string,
        private option: Option
    ) {
        this.entryDir = path.resolve(this.root, this.tmpDirName || '.jsrunner-entry')
    }

    public exit() {
        fs.removeSync(this.entryDir)
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
                js: jsFilePath,
                excutor: this.option.excutor
            })
        )

        return entryFilePath
    }
}