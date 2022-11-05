<template>
  <div class="pagination">
    {{ startAndEndNum }}
    <button :disabled="pageNo==1" @click="$emit('currentPage',pageNo-1)">上一页</button>
    <button v-if="startAndEndNum.start>=2" @click="$emit('currentPage',1)">1</button>
    <button v-if="startAndEndNum.start>=3">···</button>
    <button v-for="page in  startAndEndNum.end" :key="page" v-show="page>=startAndEndNum.start" :class="{active:pageNo==page}" @click="$emit('currentPage',page)">{{page}}</button>
    <button v-if="startAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startAndEndNum.end < totalPage" @click="$emit('currentPage',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('currentPage',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    //通过父组件传递数据total/pageSize计算出一共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的数字(开始数字|结束数字)【比如:8  6 7 8 9 10】
    startAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      //连续页码的开始数字|结束数字
      let start = pageNo - parseInt(continues / 2);
      let end = pageNo + parseInt(continues / 2);
      //还有一些不符合条件的需要纠正数字
      
      //pageNO 1  2 
      if (start < 1) {
        start = 1;
        end = continues;
      }
      //pageNo 32 33
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      //当前这个计算属性。需要把开始与结束数字返回，只能返回一个对象
      //底下的对象：KV一致省略V
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>