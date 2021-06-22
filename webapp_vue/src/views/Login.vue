<template>
  <div class="login-page">
    <div class="login-box">
      <el-form :model="userInfo">
        <el-form-item label="名称">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        name: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: absolute;
  background: red;
}
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
