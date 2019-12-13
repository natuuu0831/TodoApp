let vm = new Vue({
  el: "#app",
  data: {
    input: "",
    filterSelected: undefined,
    filterProgress: [
      { name: "未着手", value: "yet", done: false },
      { name: "作業中", value: "work", done: false },
      { name: "完了", value: "comp", done: false }
    ],
    filterLimit: [
      { name: "3日以内", value: "three", done: false },
      { name: "その他", value: "other", done: false }
    ],
    uid: 0,
    lists: [],
    mode: "single",
    formats: {
      input: ["YYYY-MM-DD"]
    },
    selectedDate: new Date(),
    fantactic: this.listFilter
  },
  methods: {
    enter() {
      var text = this.input;
      if (!text) return;
      this.lists.push({
        id: this.uid++,
        text: text,
        select: "yet",
        _select:"yet",
        date: this.selectedDate,
        show: false,
        limit: this.diffDate(this.selectedDate)
      });
      this.input = "";
    },
    listRemove(list) {
      let index = this.lists.indexOf(list);
      this.lists.splice(index, 1);
    },
    showModal(list) {
      if(list.show == true){// 閉じる時
        list.select = list._select;
        list.limit = this.diffDate(list.date);
        list.limit < 0 ? list.limit = 0 : list.limit;
      } 
      list.show = !list.show;
    },
    
    diffDate(date2) {
      let date1 = new Date();
      let compDate = (date2 - date1) / 86400000;
      return Math.ceil(compDate);
    },
   
    filterSelect(filterItem) {
      let selectValue = filterItem.value;
      if (this.filterSelected !== selectValue) {
        this.filterSelected = selectValue;
      } else {
        this.filterSelected = null;
      }
      let count = 0;
      let f = this.filterProgress;
      for (let i in f) {
        f[i].done == false&&count++;
        if (count !== f.length) {
          f[i].done = false;
          filterItem.done = true;
          if (this.filterSelected == null) {
            filterItem.done = false;
          }
        }
      }
    }
  },
  computed: {
    listCount() {
      return this.lists.length;
    },
    listFilter() {
      return this.lists.filter(function(el) {
        if (this.filterSelected) {
          return el.select == this.filterSelected;
        } else {
          return this.lists;
        }
      }, this);
    },
    listFilting() {
      return this.listFilter.length;
    }
  },
  filters: {
    customformat: function(value) {
      return moment(value).format("YYYY/MM/DD");
    },
    changeselect(value) {
      if (value == "comp") {
        return "完了";
      } else if (value == "work") {
        return "作業中";
      } else {
        return "未着手";
      }
    }
  }
});
