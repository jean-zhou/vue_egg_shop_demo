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

    // 增 - 改
    async addTodos() {
        const { ctx } = this
        let todo = ctx.request.body
        let id = todo.id
        let time = todo.time
        let thing = todo.thing
        let updateStatus = false
        if (id === '' || time === '' || thing === '') {
            ctx.redirect('/test/todo')
            return
        }

        todos.forEach(i => {
            if (i.id === id) {
                i.time = time
                i.thing = thing
                updateStatus = true
            }
        })
        if (!updateStatus) {
            todos.push(todo)
        }
        ctx.redirect('/test/todo')
    }

    async searchTodo() {
        const { ctx } = this
        // get 请求参数 params  请求query
        ctx.body = `search: ${ctx.params.id} - ${ctx.query.time} -  ${ctx.query.name}`
    }
}
module.exports = TodoController