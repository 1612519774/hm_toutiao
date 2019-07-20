<template>
  <div class="publish_container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form :model=" articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quillEditor ref="editor" v-model="articleForm.content" :options="editorOptions"></quillEditor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 文章ID
      articleId: null,
      articleForm: {
        // 声明变量
        title: '',
        content: '',
        cover: {
          type: 1,
          // 单张或者三张
          images: []
        },
        channel_id: null
      },
      // 编辑器配置
      editorOptions: {
        // 占位符置空
        placeholder: '',
        // 工具栏中的相关配置
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 获取文章数据
    this.articleId && this.getArticle(this.articleId)
  },
  // 修改后重置发布文章页面
  watch: {
    $route () {
      this.articleId = this.$route.query.id
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },

  methods: {
    // 获取文章内容
    async getArticle (id) {
      const {
        data: { data }
      } = await this.axios.get('articles/' + id)
      this.articleForm = data
    },
    // 重置图片数据
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表文章
    async publish (draft) {
      // 校验
      await this.axios.post('articles?draft' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 修改文章内容
    async edit (draft) {
      await this.axios.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less">
</style>
