
const app = {
  state: {
    form:{
      sorts:0,
      name:'',
      info:'',
      categoryId:'',
      price:''
    },
    dishForm:{},
    dishIndex:0,
    dishType:true, //ture 新增，false修改
    dishData:[],
  },
  mutations: {
    SET_DISHFORM: ( state, data ) => {
      state.dishType=data.type;
      console.log(data)
      if(!data.type){
        state.dishIndex=data.index;
        state.dishForm=data.form;
      }else{
        state.dishForm=JSON.parse(JSON.stringify(state.form));
        console.log(state.dishForm)
      }
    },
    SET_DISHDATA: (state,data) => {
      if(state.dishType){
        state.dishData.push(data);
      }else{
        state.dishData.splice(state.dishIndex,1,data);
      }

    },
    Del_DISHDATA: (state) =>{
       state.dishData.splice(state.dishIndex,1);
    }
  },
  actions: {
    setDishForm({ commit }, data){
      commit('SET_DISHFORM', data);
    },
    setDishData({ commit }, data){
      commit('SET_DISHDATA', data);
    },
    delDish({ commit }, index){
      commit('Del_DISHDATA', index);
    }
  }
}

export default app
