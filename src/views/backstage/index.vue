<template>
  <div class="backstage">
    <div class="contain">
      <setting v-if="activeName==='setting'"></setting>
      <home v-if="activeName==='home'"></home>
    </div>

   <div class="buttonNav f_footer">
      <ul class="iconContent">
        <li :class="{active:activeName=='home'}" @click="activeName='home'">
          <div><i class="iconfont icon-zhuye"></i></div>
          <div class="iconTitle">主页</div>
        </li>
        <!-- <li>
          <div><i class="el-icon-user-solid icon"></i></div>
          <div class="iconTitle">待定</div>
        </li> -->
        <li :class="{active:activeName==='setting'}" @click="activeName='setting'">
         <div><i class="iconfont icon-shezhi"></i></div>
         <div class="iconTitle">设置</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Setting from './components/Setting/Menu'
  import Home from './components/Home/index'
  export default{
    components: {
      Setting,
      Home
    },
    data() {
      return {
        activeName:"setting",
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .backstage{
    height: 100%;
    .contain{
      height: calc(100% - 50px);
    }
    .buttonNav{
      background: #f5f7fa;
      height: 50px;
      display: -webkit-flex;
      display: flex;
      flex-direction:column;
      justify-content:center;
      .iconContent{
        display: flex;
        justify-content : space-around;
        .active{
          color: #1989FA;
        }
        li{
          min-width: 20%;
          text-align: center;
          .iconfont{
            font-size: 20px;
          }
          .iconTitle{
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
