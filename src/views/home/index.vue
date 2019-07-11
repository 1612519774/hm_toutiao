<template>
  <el-container class="home-container">
    <el-aside width="200px">
       侧边
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <el-dropdown  style=" float: right">
  <span class="el-dropdown-link">
      <img src="../../assets/images/avatar.jpg" style=" vertical-align: middle" with='30px' height='30px' >
      <b style=" vertical-align: middle;padding-left:5px">黑马小哥哥</b>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人设置</el-dropdown-item>
    <el-dropdown-item>退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {}
</script>

<style lang="less">
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;

    }
    .text{
        padding-left: 10px;
        vertical-align: middle;
    }
  }
}
</style>
