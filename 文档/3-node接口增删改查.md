### egg 接口增删改查

1，显示list页面

```js
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
```



2， 增 - 改

```js
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
```

3，删

```js

```

