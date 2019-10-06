<template>
  <div class="contain">
   <header class="f_header">
      <x-header :left-options="{showBack: true, preventGoBack:true }" @on-click-back="back" title="菜品">
        <a @click="addDish" slot="right">添加菜品</a>
      </x-header>
    </header>
    <main>
      <div class="left" ref="left">
        <ul>
        	<li v-for="(item ,index) in left" :key="index"
        	 :class="{current: currentIndex === index}"
        	 @click="selectItem(index,$event)"><span>{{item}}</span></li>
        </ul>
      </div>
      <div class="right" ref="right">
         <ul>
         	<li v-for="(items, index) in right" :key="index" class="right-item">
            <div class="item-header">{{items.name}}</div>
            <ul>
              <li v-for="(item, key) in items" :key="key">
                <div class="card_l"><img src="" alt=""/></div>
                <div class="card_r">
                  <div class="card_r_m">
                    <div class="dishName">{{item.name}}</div>
                    <div class="dishInfo">{{item.info}}</div>
                  </div>
                  <div class="card_r_f">
                    <div class="price">￥{{item.price}}</div>
                    <div class="edit" @click="editDish">编辑</div>
                  </div>
                </div>
              </li>
            </ul>
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
        left: ['菜单1', '菜单2','菜单3', '菜单4', '菜单5', '菜单6',7,8,9],
        right: [
          { name: '菜单1', data: ['1', '2', '3', '4', '5']},
          { name: '菜单2', data: ['3', '4', '5', '6']},
          { name: '菜单3', data: ['1', '2', '3', '4', '5','6','7']},
          { name: '菜单4', data: [ '5', '6','7']},
         { name: '菜单5', data: [ '4','5', '6','7']},
          { name: '菜单6', data: [ '3','4','5', '6','7']},
          { name: '菜单7', data: [ '3','4','5', '6','7']},
          { name: '菜单8', data: [ '3','4','5', '6','7']},
          { name: '菜单9', data: [ '3','4','5', '6','7']},
        ],
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
       console.log(this.categoryData)
       console.log(this.dishData)
       function compare(key){
             return function(value1,value2){
                 var val1=value1[key];
                var val2=value2[key];
                return val1-val2;
            }
       }
       this.categoryData.sort(compare('num'));
       this.dishData.sort(compare('sorts'));
       let that=this;
       let right=this.categoryData.map(function(item){
         let arr=that.dishData.filter(function(j){
           return item.categoryId===j.categoryId;
         })
         let form={
           name:item.categoryName,
           data:arr
         }
         return form
       })
       this.right=right.filter(function(item){
         return item.data.length!=0;
       })
       this.left=this.right.map(function(item){
         return item.name;
       })
       console.log(this.left)
       console.log(this.right)
    },
    computed: {
      currentIndex() {
         for(let i=0; i<this.listHeight.length;i++){
            let height = this.listHeight[i];
            let height2= this.listHeight[i+1];

            //右边实时位置在哪个为位置
            if(!height2||(this.scrollY>=height&&this.scrollY<height2)){
              return i;
            }
          }
          return 0;
      }
    },
    mounted(){
      setTimeout(()=>{
        this._initScroll();
        this._getHeight();
      },20)
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
      _initScroll(){
        this.lefts=new Bscroll(this.$refs.left,{
          click:true
        })
        this.rights=new Bscroll(this.$refs.right,{
          probeType:3
        })
        console.log(this.rights)

        this.rights.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _getHeight(){
          let rightItems=this.$refs.right.getElementsByClassName('right-item')
          let height=0;
          Array.prototype.slice.call(rightItems).forEach((li, index)=>{
              this.listHeight.push(height);
              height = height + li.clientHeight //当前的位置=上一个的位置+这个的高度
          })
       },
        selectItem(index,event){
         console.log(index)
         this.clickEvent=true;
         if(!event._constructed){
           return
         }else{
           let rightItems=this.$refs.right.getElementsByClassName('right-item');
           let el=rightItems[index];
           this.rights.scrollToElement(el,300);
           console.log()
         }
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
    height: 100%;
    padding-top: 46px;
    position: relative;
    main{
      position: absolute;
      bottom: 0;
      height: calc(100% - 46px);
      display: flex;
      overflow: hidden;
      width: 100%;
      .left{
        flex: 0 0 100px;
        width: $leftWidth;
        height: 100%;
        width: 100px;
        li{
          width: 100%;
        }
      }
      .right{
        flex: 1;
        width: calc(100% - #{$leftWidth});
        height: 100%;
        padding: 5px;
        ul{
          .right-item{
            .item-header{
              border-top: solid 1px #ccc;
              border-bottom: solid 1px #ccc;
              padding: 5px 0;
            }
             ul{
              li{
                display: flex;
                width: 100%;
                border-bottom: #f5f5f5;
                height: 100px;
                .card_l{
                  width: $imgHW;
                  height: $imgHW;
                  border: solid 1px #ccc;
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
      }

    }
  }
</style>
