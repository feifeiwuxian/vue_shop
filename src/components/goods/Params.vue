<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            ref="elcascader"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
            @visible-change="elCascaderOnlick"
            @expand-change="elCascaderOnlick"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabed">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabed">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catelist: [],
      cateProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: 'many'
    }
  },
  computed: {
    isBtnDisabed() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.catelist = res.data
      console.log(this.catelist)
    },
    handleChange() {
      console.log(this.selectedCateKeys)
      //   if (this.$refs.elcascader) {
      //     this.$refs.elcascader.dropDownVisible = false
      //   }
      this.getParamsData()
    },
    getParamsData() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        // this.manyTableData = []
        // this.onlyTableData = []
      }
    },
    elCascaderOnlick() {
      const that = this
      setTimeout(function() {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click()
            that.$refs.elcascader.dropDownVisible = false
          }
        })
        document
          .querySelectorAll('.el-cascader-panel .el-radio')
          .forEach(el => {
            el.onclick = function() {
              that.$refs.elcascader.dropDownVisible = false
            }
          })
      }, 100)
    },
    handleTabClick() {
      console.log(this.activeName)
      this.getParamsData()
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
