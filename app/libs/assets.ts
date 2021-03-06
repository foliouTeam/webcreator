import Configs from './configs';
import path from 'path';
import Files from './files';
import { Projects } from "./project"
const fse = require('fs-extra');
class Assets {
    private id: string
    private assetsdir: string
    private actdir: string
    constructor(id) {
        this.id = id;
        this.actdir = Projects.getProjectDir(id);
        this.assetsdir = path.resolve(this.actdir, './src/imaegs');
    }
    async upload(filePath) {
        let exists = await fse.exists(this.actdir);
        if (!exists) {
            throw new Error('项目文件夹不存在');
        }
        var res = await Files.createdirAsync(this.assetsdir);
        let extname = path.extname(filePath);
        let basename = path.basename(filePath, extname);
        let resfilepath = path.resolve(this.assetsdir, basename + extname);
        resfilepath = await Files.getAlivpath(resfilepath);
        await fse.copy(filePath, resfilepath);
        return resfilepath;
    }
    getList() {
        return Files.getTree(this.assetsdir);
    }
}
export default Assets;