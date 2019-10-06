
const app = {
  state: {
    form:{
      categoryName:'',
      num:0
    },
    categoryForm:{},
    categoryIndex:0,
    categoryType:true, //ture 新增，false修改
    categoryData:[]
  },
  mutations: {
    SET_CATEGORYFORM: ( state, data ) => {
      state.categoryType=data.type;
      if(!data.type){
        state.categoryIndex=data.index;
        state.categoryForm=data.form;
      }else{
        state.categoryForm=JSON.parse(JSON.stringify(state.form));
      }
    },
    SET_CATEGORYDATA: (state,data) => {
      if(state.categoryType){
        state.categoryData.push(data);
      }else{
        state.categoryData.splice(state.categoryIndex,1,data);
      }
    },
    Del_CATEGORYDATA: (state) =>{
       state.categoryData.splice(state.categoryIndex,1);
    }
  },
  actions: {
    setCategoryForm({ commit }, data){
      commit('SET_CATEGORYFORM', data);
    },
    setCategoryData({ commit }, data){
      commit('SET_CATEGORYDATA', data);
    },
    delCategory({ commit }){
      commit('Del_CATEGORYDATA');
    }
  }
}

export default app
