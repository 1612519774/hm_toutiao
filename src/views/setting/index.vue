<template>
  <div class="setting_container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.pxid}}</el-form-item>
            <el-form-item label="手机号码：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" v-model="userForm.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <p style="text-align:center">修改头像</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      },
      imageUrl: null
    }
  },

  created () {
    this.getUser()
  },
  methods: {
    //   上传头像并保存头像
    upload (data) {
      //   把文件数据放在formData中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.axios.patch('user/photo', formData).then(res => {
        // 更新设置的头像
        this.userForm.photo = res.data.data.photo
        // 更新头部
        eventBus.$emit('updateHeaderPhoto', res.data.data.photo)
        //   保存 sessionStorage 信息
        // 先取出 sessionStorage 信息
        const localUser = JSON.parse(window.sessionStorage.getItem('hm_toutiao'))
        // 重新复制新的name
        localUser.photo = res.data.data.photo
        //  更新到 sessionStorage
        window.sessionStorage.setItem('hm_toutiao', JSON.stringify(localUser))
      })
    },
    // 修改用户信息
    async updateUser () {
      const {
        data: { data }
      } = await this.axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      eventBus.$emit('updateHeaderName', data.name)
      //   保存 sessionStorage 信息
      // 先取出 sessionStorage 信息
      const localUser = JSON.parse(window.sessionStorage.getItem('hm_toutiao'))
      // 重新复制新的name
      localUser.name = data.name
      //  更新到 sessionStorage
      window.sessionStorage.setItem('hm_toutiao', JSON.stringify(localUser))
    },
    //   获取用户个人资料
    async getUser () {
      const {
        data: { data }
      } = await this.axios.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style>
</style>
