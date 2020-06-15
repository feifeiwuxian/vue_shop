<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-upload
        :action="uploadURL"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        list-type="picture"
        :headers="headerObj"
        :on-success="handleSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadURL: 'https://www.feifeifei.top:8888/api/private/v1/upload',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log('删除')
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log('预览')
      console.log(file)
    },
    handleSuccess(response) {
      console.log('成功')
      console.log(response)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
