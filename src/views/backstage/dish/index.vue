<template>
  <div class="contain">
   <header class="f_header">
      <x-header :left-options="{showBack: true, preventGoBack:true }" @on-click-back="back" title="菜品">
        <a @click="addDish" slot="right">添加菜品</a>
      </x-header>
    </header>
    <main>
      <div class="right">
        <ul>
          <li v-for="(item, index) in dishData" :key="index">
            <div class="card_l"><img class="img" :src="item.picUrl" alt=""/></div>
            <div class="card_r">
              <div class="card_r_m">
                <div class="dishName">{{item.name}}({{item.sorts}})</div>
                <div class="dishInfo">{{item.info}}</div>
              </div>
              <div class="card_r_f">
                <div class="price">￥{{item.price}}</div>
                <div class="edit" @click="editDish(index,item)">编辑</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import Bscroll from 'better-scroll'
  export default{
    components:{
      XHeader
    },
    data(){
      return{
        dishData:[],
        categoryData:[],
        clickEvent:false,
        scrollY: 0,//获取实时滚动位置
        listHeight: []//获取每一个li的高度
      }
    },
    created() {
       this.categoryData=this.$store.getters.categoryData;
       this.dishData=this.$store.getters.dishData;
    },
    computed: {
    },
    mounted(){

    },
    methods: {
      addDish(){
        this.$store.dispatch("setDishForm",{type:true});
        this.$router.push({ path:"/dish/addition"})
      },
      editDish(index,item){
        this.$store.dispatch("setDishForm",{ type:false, index:index, form:item});
        this.$router.push({ path:"/dish/addition"})
      },
      back(){
          console.log("----------------------1")
          this.$router.push({ path:"/"});
     }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  $imgHW: 80px;
  $editWidth:50px;
  $height: 20px;
  $leftWidth:100px;

  .current{
    background: red;
  }
  .contain{
    // height: 100%;
    padding-top: 46px;
    // position: relative;
    main{
      height: 100%;
      // position: absolute;
      // bottom: 0;
      height: calc(100% - 46px);
      display: flex;
      overflow: hidden;
      width: 100%;
      ul{
        padding: 15px;
        li{
          display: flex;
          width: 100%;
          border-bottom: #f5f5f5;
          height: 100px;
          .card_l{
            .img{
              width: $imgHW;
              height: $imgHW;
              border: solid 1px #ccc;
            }
          }
          .card_r{
            width: calc(100% - #{$imgHW});
            height: $imgHW;
            padding:0 5px;
            .card_r_m{
              height: calc(100% - #{$height});
              .dishName{
                font-size: 16px;
                font-weight: bold;
              }
              .dishInfo{
                font-size:12px;
                color: #ccc;
              }
            }
            .card_r_f{
              display: flex;
              width: 100%;
              height: $height;
              .price{
                width: calc(100% - #{$editWidth});
                line-height: $height;
              }
              .edit{
                width: $editWidth;
                font-size: 12px;
                color: skyblue;
                line-height: $height;
                text-align: right;
              }
            }
          }

        }
      }


    }
  }
</style>
