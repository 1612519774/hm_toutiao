<template>
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
          <el-select v-model="reqParams. channel_id">
              <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="时间：">
        <el-date-picker
          v-model="dataValues"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
          <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      //   默认频道数据
      channelOptions: [{
        name: 'java', id: 1
      }],
      dateValues: []

    }
  }
}
</script>

<style>
</style>
