<template>
  <div class="fans_container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="pic_list">
            <ul>
              <li v-for="item in images" :key="item.name">
                <div class="img_tu">
                  <img :src="item.photo" alt />
                </div>
                <div class="icon_text" style="text-align:center">
                  <p>{{item.id}}</p>
                  <p class="icon_wz">
                    <el-button type="primary" @click="seach()">+关注</el-button>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="charts">
          <div ref="bar" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // 素材列表
      images: [],
      activeName: 'list'
    }
  },
  mounted () {
    const dom = this.$refs.bar
    const myEcharts = echarts.init(dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  created () {
    this.getFans()
  },
  methods: {
    // 筛选调用方法
    search () {
      this.getFans()
    },
    async getFans () {
      const { data: { data } } = await this.axios.get('followers')
      console.log(data.results)
      this.images = data.results
    }
  }
}
</script>

<style lang="less" scoped>
.pic_list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    float: left;
    width: 200px;
    height: 200px;
    margin-right: 30px;
    margin-top: 20px;
    border: 1px dashed #ddd;
    .img_tu {
      position: relative;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .icon_text {
      width: 100%;
      height: 25px;
    }
  }
}
</style>
