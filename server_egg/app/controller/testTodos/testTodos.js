const Controller = require('egg').Controller

let todos = [
    {
        id: '1212',
        time: '13:00',
        thing: 'sleep'
    },
    {
        id: '1213',
        time: '14:00',
        thing: 'work'
    },
    {
        id: '1214',
        time: '15:00',
        thing: 'code'
    },
]
class TodoController extends Controller {
    // todoy页面
    async todoPage() {
        const { ctx } = this
        let formHtml = `
            <form method='post' action='/test/todoAdd'>
                <input name='id'> - <input name='time'> - <input name='thing'>
                <button> Add </button>
            </form>
        `
        let ulHtml = '<ul>'
        todos.forEach(i => {
            ulHtml += `<li>
                <input type='checkbox'>
                <span>${i.id} - ${i.time} - ${i.thing} </span>
            </li>`
        })
        ulHtml += '</ul>'
        ctx.body = formHtml + ulHtml
    }

    // 增
    async addTodos() {
        const { ctx } = this
        let todo = ctx.request.body
        let id = todo.id
        let time = todo.time
        let thing = todo.thing

        if (id !== '' || time !== '' || thing !== '') {
            todos.push(todo)
        }

        ctx.redirect('/test/todo')
    }
}
module.exports = TodoController