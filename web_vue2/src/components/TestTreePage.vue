<template>
  <div class="testTreePage">
    ----test
    {{ moduleId }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      moduleId: "1111",
      treeData: {},
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      console.log("----");
      this.treeData = await this.$api.testTreeData.getTreeData();
    },
  },
};
</script>
