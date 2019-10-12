<template>
  <div class="contain">
    <div class="card_t">
      <i :class="[iconName]"></i>
    </div>
    <div class="card_b">
      {{textName}}
    </div>
  </div>
</template>

<script>
  export default{
    name:'IconCard',
    props:{
      iconName:String,
      textName:String,
    },
    data() {
      return {
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .contain{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 80px;
    justify-content: center;
    text-align: center;
    .card_t{
      padding: 3px;
      .iconfont{
        font-size: 36px;
      }
    }
    .card_b{
      font-size: 16px;
      padding: 3px;
    }
  }
</style>
