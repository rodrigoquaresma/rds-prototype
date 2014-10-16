var DateHelper = {
  toDate : function(dateString) {
    // from http://stackoverflow.com/questions/8098202/javascript-detecting-valid-dates
    if(!dateString) return null;

    var comp = dateString.split('/');
    if (comp.length != 3) return null;

    var d = parseInt(comp[0], 10);
    var m = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
      return date;
    } else {
      null;
    }
  },

  lastDayInMonth : function(date) {
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
  },

  pad : function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  },

  formatToMonthAndYear : function(date) {
    return DateHelper.pad(date.getMonth() + 1, 2) + DateHelper.yearStr(date)
  },

  monthAndYearStr : function(date) {
    return "/" + DateHelper.formatToMonthAndYear(date);
  },

  yearStr : function(date) {
    return "/" + date.getFullYear();
  },

  range : function(start, end, max, posfix) {
    var range = [];
    var size = (end - start + 1) % max;
    for(var i = 0; i < size; i++) {
      range.push(encodeURIComponent(DateHelper.pad(start + i, 2) + posfix));
    }
    return range;
  }

};
