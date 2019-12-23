let vm = new Vue({
  el: "#app",
  data: {
    input: "",
    selectedFilteringItem: null,
    progressLists: [
      { name: "未着手", value: "yet", done: false },
      { name: "作業中", value: "work", done: false },
      { name: "完了", value: "comp", done: false }
    ],
    filteringLimit: false,
    listId: 0,
    taskLists: [],

    // v-calender Data
    mode: "single",
    formats: {
      input: ["YYYY-MM-DD"]
    },
    selectedDate: new Date()
  },
  methods: {
    addTask() {
      var text = this.input;
      if (!text) return;
      this.taskLists.push({
        id: this.listId++,
        text: text,
        progress: "yet",
        _progress: "yet",
        date: this.selectedDate,
        show: false,
        limit: this.diffDate(this.selectedDate)
      });
      this.input = "";
    },
    listRemove(list) {
      let index = this.taskLists.indexOf(list);
      var result = confirm("削除してもよろしいですか？");
      if (result) {
        this.taskLists.splice(index, 1);
      } else {
        list.show = list.show;
        return false;
      }
      this.taskLists.splice(index, 1);
    },
    ToggleModal(list) {
      if (list.show == true) {
        // 閉じる時
        list.progress = list._progress;
        list.limit = this.diffDate(list.date);
        list.limit < 0 ? (list.limit = 0) : list.limit;
      }
      list.show = !list.show;
    },

    diffDate(date2) {
      let date1 = new Date();
      let compDate = (date2 - date1) / 86400000;
      return Math.ceil(compDate);
    },

    filterItemSelect(progressList) {
      let sFI = this.selectedFilteringItem;
      let selectValue = progressList.value;

      if (sFI !== selectValue) {
        sFI = selectValue;
      } else {
        sFI = null;
      }
      let noSelectedFilterItem = 0;
      let l = this.progressLists;
      for (let i in l) {
        if (l[i].done == false) {
          noSelectedFilterItem++;
        }
        if (noSelectedFilterItem !== l.length) {
          l[i].done = false;
          progressList.done = true;
          if (sFI == null) {
            progressList.done = false;
          }
        }
      }
    },
    filterLimit() {
      this.filteringLimit = !this.filteringLimit;
    }
  },
  computed: {
    listCount() {
      return this.taskLists.length;
    },
    ｆilteredlist() {
      let sFI = this.selectedFilteringItem;
      let fL = this.filteringLimit;
      return this.taskLists.filter(function(el) {
        if (sFI && !fL) {
          return el.progress == sFI;
        } else if (fL) {
          if (sFI) {
            return el.progress == sFI && el.limit <= 3;
          } else if (!sFI) {
            return el.limit <= 3;
          }
        } else {
          return this.taskLists;
        }
      }, this);
    },
    ｆilteredlistCount() {
      return this.ｆilteredlist.length;
    }
  },
  filters: {
    customformat: function(value) {
      return moment(value).format("YYYY/MM/DD");
    },
    changeProgressLang(value) {
      switch (value) {
        case "comp":
          return "完了";
        case "work":
          return "作業中";
        case "yet":
          return "未着手";
        default:
          break;
      }
    }
  }
});
