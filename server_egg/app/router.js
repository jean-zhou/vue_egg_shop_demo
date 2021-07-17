module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/testTree', controller.tree.treeData.getTreeData);
};