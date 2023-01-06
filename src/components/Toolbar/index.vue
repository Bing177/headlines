<template>
  <el-backtop  :bottom="200" :visibility-height="500">
    <div>
      <i class="el-icon-caret-top"></i>
      UP
    </div>
  </el-backtop>
</template>

<script>
export default {
    name:'Toolbar'
}
</script>

<style lang="less">
.el-backtop{
  height:55px !important;
  div{
    height: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e8e8f8;
    border-radius: 5px;
    text-align: center;
    line-height: 25px;
    color: #000;
  }
}

</style>