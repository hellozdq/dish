<template>
  <div class="backstage">
    <div class="contain">
      <setting></setting>
    </div>

   <!-- <div class="buttonNav f_footer">
      <ul class="iconContent">
        <li>
          <div><i class="el-icon-user-solid icon"></i></div>
          <div class="iconTitle">abcd</div>
        </li>
        <li>
          <div><i class="el-icon-user-solid icon"></i></div>
          <div class="iconTitle">abcd</div>
        </li>
        <li>
          <div><i class="el-icon-user-solid icon"></i></div>
          <div class="iconTitle">设置</div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
  import Setting from './components/Setting/Menu'
  export default{
    components: {
      Setting,
    },
    dadata() {
      return {
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .backstage{
    min-height: 100%;
    .contain{
      min-height: calc(100% - 50px);
    }
    .buttonNav{
      background: #f5f7fa;
      height: 50px;/* no */
      display: -webkit-flex;
      display: flex;
      flex-direction:column;
      justify-content:center;
      .iconContent{
        display: flex;
        justify-content : space-around;
        li{
          min-width: 20%;
          text-align: center;
          .icon{
            font-size: 24px;
          }
          .iconTitle{
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
