<template>
  <div class="contain">
    <header class="f_header">
      <x-header :left-options="{backText: ''}" title="添加品类">
        <a @click="save" slot="right">保存</a>
      </x-header>
   </header>

    <main>
     <group>
        <x-number title="序号" v-model="form.num" :show-clear="false"></x-number>
        <x-input title="品类" v-model="form.categoryName" placeholder="填写品类名" :show-clear="false"></x-input>
      </group>
    </main>
    <footer class="f_footer">
      <x-button type="warn">删除</x-button>
    </footer>
  </div>
</template>

<script>
  import { XHeader,Group,XInput,XButton,XNumber } from 'vux'

  export default{
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      XNumber
    },
    data() {
      return {
        form:{}
      }
    },
    created() {
        this.form=this.$store.getters.categoryForm;
    },
    methods:{
      save(){
       this.form.categoryId=this.form.num;
       this.$store.dispatch("setCategoryData",this.form);
       this.$router.push({ path:"/category"});
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .contain{
    height: 100%;
    padding-top:46px;
    main{
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
