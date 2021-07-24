const Controller = require('egg').Controller;

class TreeController extends Controller {
    async getTreeData() {
        const { ctx } = this
        // ctx.body = 'Hello getTreeData -----';
        const treeData = await ctx.service.treeDataSer.treeData()
        console.log('treeData', treeData)
        ctx.status = 200
        ctx.body = {
            data: treeData
        }
    }
}
module.exports = TreeController;