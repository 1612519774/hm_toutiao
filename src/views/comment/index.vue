<template>
  <div class="comment_container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title" width="400"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else size="mini" type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:center"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        //   当前第一页
        page: 1,
        // 一页分20条
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    //   获取所有评论信息
    this.getComments()
  },
  methods: {
    toggleStatus (row) {
      const text1 = '您确定要打开评论吗？'
      const text2 = '关闭后用户无法对该文章进行评论，您确认要关闭评论吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.axios.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status
        })
        this.$message.success('修改状态成功')
        row.comment_status = data.allow_comment
      }).catch(() => {
      })
    },
    //   给页码自定一个新的方法用来替换最新的页码
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less">
</style>
