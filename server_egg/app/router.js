module.exports = app => {
    const { router, controller } = app;

    const { testTodos } = controller
    router.get('/', controller.home.index);
    router.get('/testTree', controller.tree.treeDataCon.getTreeData);

    // todo 增删改查
    router.get('/test/todo', testTodos.testTodos.todoPage)
    router.post('/test/todoAdd', testTodos.testTodos.addTodos)
};