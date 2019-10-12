<template>
  <div class="contain">
    <van-nav-bar :fixed="true" :title="dishType?'添加菜品':'修改菜品'" left-text="返回" right-text="保存" @click-left="back" @click-right="save" left-arrow />
    <main>
      <van-cell-group>
        <!-- <van-field :label-width="lableWidth" label="序号" v-model="form.num" placeholder="请输入序号" /> -->
        <van-field :label-width="lableWidth" label="序号" v-model="form.num" placeholder="请输入序号" />
        <van-field :label-width="lableWidth" label="菜名" v-model="form.name" placeholder="请输入菜名" />
        <van-field :label-width="lableWidth" label="备注" v-model="form.info" type="textarea" placeholder="请输入备注" />
        <van-field :label-width="lableWidth" label="价格" v-model="form.price" placeholder="请输入价格" />
        <van-field
          :label-width="lableWidth"
          readonly
          clickable
          label="分类"
          :value="form.categoryName"
          placeholder="选择分类"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="categorys"
            value-key="categoryName"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-cell :label-width="lableWidth">
          <template slot="title">
            <span>上传图片</span>
           <van-uploader v-model="fileList" multiple :after-read="afterRead" :max-count="1" />
          </template>
        </van-cell>
      </van-cell-group>
    </main>
    <footer class="f_footer">
      <van-button v-if="!dishType" type="danger" size="large" @click="delDish">删除</van-button>
    </footer>
  </div>
</template>

<script>
  // import { XHeader,Group,XInput,XButton,XNumber,Selector,XTextarea,Cell } from 'vux'
  // import Uploader from 'vux-uploader'
  import {
    CellGroup,
    Uploader,
    NavBar,
    Field,
    Stepper,
    Cell,
    Button,
    Toast,
    Picker,
    Popup
  } from 'vant';

  export default{
    components: {
      [Uploader.name]:Uploader,
      [NavBar.name]:NavBar,
      [Field.name]:Field,
      [Stepper.name]:Stepper,
      [CellGroup.name]:CellGroup,
      [Cell.name]:Cell,
      [Button.name]:Button,
      [Toast.name]:Toast,
      [Picker.name]:Picker,
      [Popup.name]:Popup,
    },
    data() {
      return {
        value:5,
        categorys: [],
        form:{},
        showPicker:false,
        fileList: [],
        lableWidth:"60px",
        dishType:false,
      }
    },
    created(){
      this.form=this.$store.getters.dishForm;
      this.categorys=this.$store.getters.categoryData;
      this.dishType=this.$store.getters.dishType;
      if(!this.dishType){
        let pic={};
        if(this.form.picUrl.indexOf('data:')!=-1 && this.form.picUrl.indexOf('base64')!=-1){//是否base64
          pic.content=this.form.picUrl;
        }else{
          pic.url=this.form.picUrl;
        }

        this.fileList.push(pic);
      }
    },
    methods:{
      save(){
        if(this.fileList.length===0){
          Toast('请上传图片！');
          return false;
        }
        this.form.picUrl=this.fileList[0].url?this.fileList[0].url:this.fileList[0].content;
        this.$store.dispatch("setDishData",this.form);
        this.$router.push({ path:"/dish"});
        Toast.success('保存成功！');
      },
      back(){
        this.$router.push({ path:"/dish"});
      },
      afterRead(file,detail){

      },
      delDish(){
        this.$store.dispatch("delDish");
        this.$router.push({ path:"/dish"});
        Toast.success('删除成功！');
      },
      onConfirm(value) {
        console.log(value)
        this.form.categoryId = value.categoryId;
        this.form.categoryName = value.categoryName;
        this.showPicker = false;
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .contain{
    // height: 100%;
    padding-top:46px;
    main{
      .uploadFile{
        display: flex;
        justify-content:flex-start;
      }
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
