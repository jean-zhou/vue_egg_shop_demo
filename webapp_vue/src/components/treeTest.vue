<template>
    <div class="testTreePage">
        -----test
        {{moduleId}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            moduleId: '1111'
        }
    },
    created() { 
        this.getTreeData()
    },
    methods: {
        getTreeData() {
            console.log('----')
        }
    }
}
</script>