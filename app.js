Vue.component('modal',{

})
new Vue({
  el: '#app',
  data: {
    input: '',
    lists: [],
    uid: 0,
    mode: 'single',
    formats: {
      input: ['YYYY-MM-DD'],
    },
    selectedDate: new Date(),
  },
  methods: {
    enter() {
      var text = this.input;
      if (!text) {
        return
      }
      this.lists.push({
        id: this.uid++,
        text: text,
        select: "未着手",
        class: "",
        date:this.selectedDate,
        show:false,
      })
      this.input = '';
    },
    changeClass(list) {
      if (list.select == "完了") {
        list.class = "comp"
      } else if (list.select == "作業中") {
        list.class = "work"
      } else {
        list.class = "";
      };
    },
    listRemove(list) {
      let index = this.lists.indexOf(list)
      this.lists.splice(index, 1)
    },
    showModal(list){
      return list.show = !list.show;
    }
  },
  computed:{
    addDate(){
      let date1 = new Date();
      let date2 = this.selectedDate;
      let compDate = (date2 - date1) / 86400000;
      return Math.ceil(compDate);
    },
  },
  filters:{
    customformat: function(value){
      return moment(value).format('YYYY-MM-DD');
    }
  }
});
