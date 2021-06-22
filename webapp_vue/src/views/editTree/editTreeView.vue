<template>
  <div class="editTreeView">
    <!-- 使用组件 -->
    <div id="contentMain"></div>
  </div>
</template>
<script>
import contentMain from "./editTree";
export default {
  date() {
    return {
      test: "使用组件位置",
    };
  },
  mounted() {
    this.initTreeView();
  },
  methods: {
    initTreeView() {
      console.log("---初始化view组件---");
      let params = {
        el: document.getElementById('contentMain'),
      };
      new contentMain(params);
    },
  },
};
</script>
