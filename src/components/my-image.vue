<template>
  <div class="myimg_containter" v-loading="loading">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog()">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 点击图片按钮弹出对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框组 -->
          <div style="margin-bottom:10px">
            <el-radio-group v-model="reqParams.collect" size="small" @change="search">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <!-- 将数据渲染到页面上 -->
          <div
            class="img_item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页区 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片的上传位置 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      defaultImage,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选项卡默认选中素材库
      activeName: 'image',
      //   请求素材列表的参数
      reqParams: {
        collect: false,
        // 分一页
        page: 1,
        // 一页分8条
        per_page: 8
      },
      // 素材列表
      images: [],
      selectedImageUrl: null,
      // 分页相关
      total: 0,
      // 上传图片预览地址
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm_toutiao')).token
      },
      loading: false
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        // 为了严谨如果没有选择中封面图做判断
        if (!this.selectedImageUrl) return this.$message.info('请选中封面图')
        // 使用selecttedImageUrl
        // 通知父组件数据发生改变
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 使用imageUrl
        // 为了严谨如果没有选择中上传封面图做判断
        if (!this.imageUrl) return this.$message.info('请上传封面图')
        // 通知父组件数据发生改变
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    //   上传成功后的预览
    handleSuccess (res) {
      // 预览需要地址
      this.imageUrl = res.data.url
    },
    //   打开对话框
    openDialog () {
      this.dialogVisible = true
      // 把上一次的数据清空
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 选中当前点击的图片通过url
    selected (url) {
      this.selectedImageUrl = url
    },
    // 获取列表
    async getImages () {
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.img_btn {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.myimg_containter{
  width: 150px;
  height: 120px;
  margin-right: 20px;
  display: inline-block;
}
.img_item {
  display: inline-block;
  width: 150px;
  height: 120px;
  border: 1px dashed #eee;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center/ 60px 60px;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    // 图片属性，让图片按照等比例缩放显示在容器内
    object-fit: contain;
  }
}
</style>
