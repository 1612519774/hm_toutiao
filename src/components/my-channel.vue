<template>
     <el-select :value="value" @change='fn' placeholder="频道选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   默认频道数据
      channelOptions: []
    }
  },
  created () {
    // 调用这个方法获取频道数据
    this.getChannelOptions()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    // 使用async和await进行数据的调用
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>

</style>
