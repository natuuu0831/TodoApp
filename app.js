new Vue({
  el: '#app',
  data: {
    input:'',
    lists:[],
    uid: 0,
  },
  methods: {
    enter(list){
      let text= this.input;
      if(text==""){
        return
      }
      this.lists.push({
        id:this.uid++,
        text:text,
        show:true,
        select:"未着手",
        class:""
      })
      this.input = ''  
    },
    changeClass(list){
      if(list.select == "完了"){
        list.class ="comp"
      }else if(list.select == "作業中"){
        list.class ="work"
      }else{
        list.class ="";
      }
    },
    listRemove(list) {
      let index = this.lists.indexOf(list)
      this.lists.splice(index, 1)
    }
  }
});
