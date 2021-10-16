module.exports = app => {
    const { router, controller } = app;

    const { testTodos } = controller
    router.get('/', controller.home.index);
    router.get('/testTree', controller.tree.treeDataCon.getTreeData);

    // todo 增删改查
    router.get('/test/todo', testTodos.testTodos.todoPage)
    // post 请求参数 - 比如更新
    router.post('/test/todoAdd', testTodos.testTodos.addTodos)
    // get 请求参数 - 比如搜索
    router.get('/test/search/:id', testTodos.testTodos.searchTodo)

};