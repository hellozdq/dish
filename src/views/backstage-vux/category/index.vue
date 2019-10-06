<template>
  <div class="contain">
    <header class="f_header">
      <x-header :left-options="{backText: ''}" title="品类">
        <a @click="addCategory" slot="right">新增</a>
      </x-header>
    </header>
    <main>
      <div class="row" v-for="(item,index) in categoryData" :key="index">
        <div class="num">{{item.num}}</div>
        <div class="name">{{item.categoryName}}</div>
        <div class="operate" @click="editCategory(index,item)">编辑</div>
      </div>
    </main>
  </div>
</template>

<script>
  import { XHeader } from 'vux'

   export default{
      components: {
        XHeader
      },
      data() {
        return {
          categoryData:[],
        }
      },
      created() {
        this.categoryData=this.$store.getters.categoryData;
        console.log(this.categoryData);
      },
      methods:{
        addCategory(){
          this.$store.dispatch("setCategoryForm",{type:true});
          this.$router.push({ path:"/category/addition"})
        },
        editCategory(index,item){
          this.$store.dispatch("setCategoryForm",{ type:false, index:index, form:item});
          this.$router.push({ path:"/category/addition"})
        }
      }
    }
  </script>

</script>

<style scoped="scoped" lang="scss">
  .contain{
    height: 100%;
    main{
      position: absolute;
      bottom: 0;
      height: calc(100% - 46px);
      // display: flex;
      overflow: hidden;
      width: 100%;
      .row{
          display: -webkit-flex;
          display: flex;
          flex-flow: row nowrap;
          width: 100%;
          padding-top: 5px;
          .num{
            text-align: center;
            width: 30px;
            padding: 5px;
          }
          .name{
            width: calc(100% - 74px);
            padding: 5px;
            border-left: solid 1px #f5f5f5;
          }
          .operate{
            width: 40px;
            padding: 5px;
            border-left: solid 1px #f5f5f5;
            color: #30B08F;
          }
      }
    }
  }
</style>
