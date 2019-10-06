<template>
  <div class="contain">
    <header class="f_header">
      <x-header :left-options="{backText: ''}" title="添加菜品">
        <a @click="save" slot="right">保存</a>
      </x-header>
   </header>

    <main>
     <group label-width="4.5em" label-margin-right="2em" label-align="justify">
        <x-number title="序号" v-model="form.sorts" align="left" :value="form.sorts" :min="0" :max="1000"></x-number>
        <x-input title="菜品名" v-model="form.name" :show-clear="false"></x-input>
        <x-textarea title="详细描述" v-model="form.info" :rows="1" :max="20"></x-textarea>
        <selector title="分类" v-model="form.categoryId" :options="categorys" :value-map="['categoryId', 'categoryName']"></selector>
        <x-input title="价格" v-model="form.price" :show-clear="false"></x-input>
        <cell primary="content" title="图片" value-align="left">
          <template>
            <div>
              <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="1" />
               <!-- <uploader
                :max="varmax"
                :images="images"
                :handle-click="false"
                :show-header="false"
                :readonly="false"
                :upload-url="uploadUrl"
                :auto-upload="false"
                name="img"
                :params="params"
                size="small"
                @preview="previewMethod"
                @add-image="addImageMethod"
                @remove-image="removeImageMethod"
                @upload-image="uploadImage"
              ></uploader> -->
            </div>
          </template>
        </cell>
      </group>

    </main>
    <footer class="f_footer">
      <x-button type="warn">删除</x-button>
    </footer>
  </div>
</template>

<script>
  import { XHeader,Group,XInput,XButton,XNumber,Selector,XTextarea,Cell } from 'vux'
  // import Uploader from 'vux-uploader'
  import { Uploader, NavBar, Field   } from 'vant';
  export default{
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      XNumber,
      Selector,
      XTextarea,
      Cell
    },
    data() {
      return {
        categorys: [],
        form:{
          sorts:'',
          name:'',
          info:'',
          categoryId:'',
          price:''
        },
        fileList: [],
      }
    },
    created(){
      this.form=this.$store.getters.dishForm;
      console.log(this.form)
      let pic={};
      pic.url=this.form.picUrl;
      this.categorys=this.$store.getters.categoryData;
    },
    methods:{
      save(){
        this.form.picUrl=this.fileList.url?this.fileList.url:this.fileList[0].content;
        this.$store.dispatch("setDishData",this.form);
        this.$router.push({ path:"/dish"});
      },
      back(){

      },
      afterRead(file,detail){
        console.log(file)
        console.log(detail)
        console.log(this.fileList)
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
