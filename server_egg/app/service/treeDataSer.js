const Service = require('egg').Service;

const path = require('path')
const fs = require('fs')
class TreeDataService extends Service {
    treeData() {
        // let file = path.join(__dirname, '../data/treeData.json')
        // let file = path.join(__dirname, '../data/data.json')
        let file = path.join(__dirname, '../data/volleybal.json')
        let data =  fs.readFileSync(file)
        let res = data.toString();
        const treeList = JSON.parse(res);
        return treeList
    }
}
module.exports = TreeDataService;