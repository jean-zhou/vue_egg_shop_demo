const Controller = require('egg').Controller;

class TreeController extends Controller {
    async getTreeData() {
        const { ctx } = this
        ctx.body = 'Hello getTreeData -----';
    }
}
module.exports = TreeController;