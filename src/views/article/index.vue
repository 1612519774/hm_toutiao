<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
          <el-button type="warning" @click="rest()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b>条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template lazy slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt width="100" height="75" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1" type="info">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger" @click="dele(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 日期控件的数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 获取频道下拉数据内容
  created () {
    // 获取列表项
    this.getArticle()
  },
  methods: {
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除一条信息
    dele (id) {
      this.$confirm('亲,此操作将永久删除该文章,是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`articles/${id}`)
          // 删除成功后
          this.getArticle()

          this.$message.success('删除成功')
        })
        .catch(() => {
          // 点击取消
        })
    },
    // 分页条数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    // 筛选调用方法
    search () {
      this.reqParams.page = 1
      this.getArticle()
    },
    rest () {
      this.getrest()
    },
    // 动态获取时间
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    //  获取文章列表信息
    async getArticle () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    getrest () {
      this.reload()
    }
  }

}
</script>

<style scoped lang="less" >
.el-card {
  margin-bottom: 20px;
  .box {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
