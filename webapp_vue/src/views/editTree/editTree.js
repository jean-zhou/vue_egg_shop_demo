import Viewer from './editTree.vue'

class contentMain {
    constructor(params) {
        console.log('组件的js params', params)
        new Viewer({
            el: params.el,
            // data:
        })
    }
}

export default contentMain