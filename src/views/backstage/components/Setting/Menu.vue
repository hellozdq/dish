<template>
  <div class="menu">
    <x-header class="header" :left-options="{showBack: false}" title="设置">
    </x-header>
    <div class="card" v-for="(item,index) in menuList" :key="index">
      <div class="c_title">
          {{item.title}}
      </div>
      <div class="c_main">
        <router-link class="c_main_item" v-for="(i,key) in item.content" :key="key" :to="i.url">
          <icon-card :iconName="i.icon" :textName="i.name"></icon-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import IconCard from './IconCard'
  import { XHeader } from 'vux'

  export default{
    name:'Menu',
    components: {
      IconCard,
      XHeader
    },
    data() {
      return {
        menuList:[
          {
            title:'菜单设置',
            content:[
              {
                name:'菜品',
                icon:'iconfont icon-caipin',
                url:'/dish',
              },
               {
                name:'分类',
                icon:'iconfont icon-icon',
                url:'/category',
              },
            ]
          }
        ]
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .menu{
    background: #f5f5f5;
    padding-top: 46px;
    // padding-bottom: 50px;
    .header{
      position: fixed;
      top: 0;
      width: 100%;
    }
    .card{
      margin-top: 10px;
      background: #fff;
      .c_title{
        border-bottom: solid 1px #f5f5f5;
        padding: 10px;
        font-size: 14px;
      }
      .c_main{
        display: -webkit-flex;
        display: flex;
        flex-flow:row wrap;
        justify-content:space-around;
        &_item{
          border-radius: 100%;
          // background: #1989FA;
        }
      }
    }
    .item-empty{
      width: 100px;
      height: 0;
    }

  }
</style>
