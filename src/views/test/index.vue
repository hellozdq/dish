
<template>

      <div class="content">
        {{currentIndex}}
          <div class="left" ref="left">
            <ul>
              <li v-for="(item ,index) in left" :key="index"
               :class="{current: currentIndex === index}"
               @click="selectItem(index,$event)"><span>{{item}}</span></li>
            </ul>
          </div>

          <div class="right" ref="right">
            <ul>
              <li v-for="(items, index) in right" :key="index" class="right-item-hook">
                <div>{{ items.name}}</div>
                 <ul>
                 	<li  v-for="(item, key) in items.data" :key="key" style="height: 50px;">
                    <div>{{items.name+item}}</div>
                  </li>
                 </ul>
              </li>
            </ul>
          </div>
      </div>
    </template>
        //数据
    <script>
    import Bscroll from 'better-scroll'
    export default {
      data(){
        return {
          left: ['菜单1', '菜单2','菜单3', '菜单4', '菜单5', '菜单6'],
          right: [
            { name: '菜单1', data: ['1', '2', '3', '4', '5']},
            { name: '菜单2', data: ['3', '4', '5', '6']},
            { name: '菜单3', data: ['1', '2', '3', '4', '5','6','7']},
            { name: '菜单4', data: [ '5', '6','7']},
           { name: '菜单5', data: [ '4','5', '6','7']},
            { name: '菜单6', data: [ '3','4','5', '6','7']},
          ],
          clickEvent:false,
          scrollY: 0,//获取实时滚动位置
          listHeight: []//获取每一个li的高度
        }
      },
      created(){
          //因为 _scrollInit函数需要操作DOM，因此必须在DOM元素存在文档中才能获取DOM节点
          //因此在 nextTick回调函数里面调用可以是实现此功能
          this.$nextTick(() => {
             setTimeout(()=>{
                this._initScroll();
               console.log("---------------+++")
               this._getHeight();
             },20)
          })
      },
      computed:{
        currentIndex(){
          console.log(this.listHeight)
           for(let i=0; i<this.listHeight.length;i++){
            let height = this.listHeight[i];
            let height2= this.listHeight[i+1];

            if(!height2||(this.scrollY>=height&&this.scrollY<height2)){
              console.log('height  '+height)
              console.log(this.scrollY)
              console.log('height2  '+height2)
              console.log('index'+i)
              return i;
              // if(this.clickEvent){
              //   return i+1;
              // }else{
              //   return i;
              // }
            }
          }
            return 0;
        }
//
      },
      methods:{
        _initScroll(){
            this.lefts=new Bscroll(this.$refs.left,{
              click:true
            })
            this.rights=new Bscroll(this.$refs.right,{
              probeType:3
            })
            this.rights.on('scroll',(pos)=>{
              this.scrollY = Math.abs(Math.round(pos.y));
            })
          },
            _getHeight(){
              let rightItems=this.$refs.right.getElementsByClassName('right-item-hook')
              console.log(rightItems)
              console.log(rightItems[1])
              console.log('----1  clientHeight'+rightItems[1].clientHeight)
               console.log('----1  offsetTop'+rightItems[1].offsetTop)
              console.log('----0  clientHeight'+rightItems[0].clientHeight)
              console.log('----0  offsetTop'+rightItems[0].offsetTop)


              let height=0;
              for(let i=0; i<rightItems.length; i++){
                this.listHeight.push(height);
                let item=rightItems[i];
                height+=item.clientHeight;

              }
              console.log(this.listHeight)
           },
           selectItem(index,event){
             // console.log(index)
             this.clickEvent=true;
             if(!event._constructed){
               return
             }else{
               let rightItems=this.$refs.right.getElementsByClassName('right-item-hook');
               // console.log(rightItems)
               let el=rightItems[index];
               // console.log(el)
               this.rights.scrollToElement(el,300)
             }
           }
      }
    }
    </script>

    <style scoped="scoped" lang="scss">
      .content{
        display: flex;
        position: absolute;
        top: 0;
        height: 200px;
        width: 100%;
        overflow: hidden;
        background: #eee;
      }
      .left{
        flex:0 0 80px;
        width:80px;
        background: #f3f5f7;

      }
      .left li{
        width: 100%;
        height: 100%;
      }
      .current{
        background: red;
      }
      .left-item{
        display:block;
        width: 100%;
        height: 100px;
        line-height: 50px;
        text-align:center;
        border-bottom: solid 1px yellow;
      }
      .right{
        flex:1;
      }
      .righ-item{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-bottom:solid 1px yellow;
      }
    </style>
