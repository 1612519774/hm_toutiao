<template>
  <div class="image_container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group v-model="reqParams.collect" size="small"  @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          style="float:right"
          size="small"
          type="success"
          @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <ul class="img_list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleFav(item)"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        style="text-align: center;"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        // 从第一页开始
        page: 1,
        // 每页分成十条
        per_page: 10
      },
      // 素材列表
      images: [],
      // 分页相关
      total: 0,
      //   添加素材
      dialogVisible: false,
      //   预览的地址
      imageUrl: null,
      //   上传请求头并且携带token
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm_toutiao')).token
      },
      loading: false
    }
  },
  //   创建之前调用方法
  created () {
    this.getImages()
  },
  methods: {
    //   删除一个图片
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message('删除成功')
        this.getImages()
      }).catch(() => { })
    },
    //   收藏和取消收藏
    async toggleFav (item) {
      const {
        data: { data }
      } = await this.axios.put('user/images/' + item.id, {
        //    收藏成功
        collect: !item.is_collected
      })
      // 收藏成功后切换颜色 red类名
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    //   上传成功后的处理函数
    handleSuccess (res) {
      // 预览需要地址
      this.imageUrl = res.data.url
      // 上传成功后提示成功信息
      this.$message.success('上传成功')
      // 关闭后更新列表
      window.setTimeout(() => {
        // 添加成功后更新列表
        this.dialogVisible = false
        this.getImages()
        // 关闭后图片地址为空以为了下个图片的使用
        this.imageUrl = null
      }, 1500)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
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
<style lang="less" scoped>
.img_list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: 20px;
  li {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 300px;
    height: 300px;
    border: 1px dashed #ddd;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      margin-right: 20px;
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
