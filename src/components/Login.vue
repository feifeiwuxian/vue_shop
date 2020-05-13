<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/head.jpg" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form ref="ruleForm" class="login_form" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-yonghu"
            placeholder="请输入内容"
            v-model="loginForm.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
          username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ], // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginClick () {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid)
        if (valid) {
         const { data: res } = await this.$http.post('login', this.loginForm)
         if (res.meta.status !== 200) {
           return this.$message({
           message: '登录失败',
           type: 'error'
          })
         }
         this.$message({
           message: '恭喜你，登录成功',
           type: 'success'
         })
         console.log(res)
         window.sessionStorage.setItem('token', res.data.token)
         this.$router.push('/home')
        } else {
          return false
        }
      })
    },
    resetClick () {
      // console.log(this)
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
