var Helper = {

  forceReload : function(iframeSrc) {
    timestamp = new Date().getTime();
    var newSrc = Helper.removeQueryParameter(iframeSrc, 'forceReloadTimestamp');
    return Helper.prependParameter(newSrc, 'forceReloadTimestamp=' + timestamp);
  },

  changeReport : function(iframe, reportId, query) {
    iframe.attr('src', function(i, src) {
      var newSrc = src;
      if (reportId) {
        newSrc = newSrc.replace(/\/obj\/\d+/, '/obj/' + reportId);
      }
      if (query){
        var filterName = query.split('=')[0];
        var filterValue = query.split('=')[1];
        newSrc = Helper.removeQueryParameter(newSrc, filterName);
        newSrc = Helper.prependParameter(newSrc, filterName + '=' + filterValue);
      }
      return Helper.forceReload(newSrc);
    });
  },

  updateFilter : function(iframe, filterName, filterValue) {
    iframe.attr('src', function(i, src) {
      var newSrc = Helper.removeQueryParameter(src, filterName);
      if(filterValue) newSrc = Helper.prependParameter(newSrc, filterName + '=' + filterValue);
      return newSrc;
    });
  },

  clearFilter : function(iframe, filterName) {
    Helper.updateFilter(iframe, filterName, '');
  },

  removeQueryParameter : function(url, queryParameterName) {
    var escaped = Helper.escapeRegExp(queryParameterName)
    var removed = url.replace(new RegExp(escaped + "=[^&#]+"), '');
    return Helper.cleanUpNotNecessaryParameterTokens(removed);
  },

  cleanUpNotNecessaryParameterTokens : function(url) {
    return url.replace('?&', '?').replace(/[\?&]#/, '#').replace(/&+/, '&');
  },

  prependParameter : function(url, query) {
    var newUrl = url;
    if(/\?[^#]+#/.test(newUrl)) newUrl = newUrl.replace('?', "?&");
    return newUrl.replace(/(\?(&)?|^([^#?]+)(#.*)$)/, '$3?' + query + '$2$4');
  },

  escapeRegExp : function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  updateDateRangeFilter : function(iframe, filterName, dateRangeQuery) {
    iframe.attr('src', function(i, src) {
      var newSrc = src;
      newSrc = Helper.removeQueryParameter(newSrc, filterName + ".aag81lMifn6q");
      newSrc = Helper.removeQueryParameter(newSrc, filterName + ".acv81lMifn6q");
      newSrc = Helper.removeQueryParameter(newSrc, filterName + ".date.ddmmyyyy");
      if(dateRangeQuery) newSrc = Helper.prependParameter(newSrc, dateRangeQuery);
      return newSrc;
    });
  },

  setActive : function(element) {
    var self = $(element);
    self.parents('.btn-group').find('.btn.active').removeClass('active');
    self.addClass('active');
  },

  getInsidePanel : function(element, selector) {
    return $(element).parents('.panel').find(selector);
  },

  getIFrame : function(element) {
    return Helper.getInsidePanel(element, 'iframe');
  },

  getReportId : function(iFrame) {
    var src = iFrame.attr('src');
    return src.match(/\/obj\/(\d+)/)[1];
  },

  toValsQuery : function(values, separator) {
    separator = separator || ',';
    values = values.filter(function(e) {
      return e && e.trim().length;
    });
    return values.length ? 'vals=' + values.join(separator) : ''
  },

  buildDateFilterQuery : function(attributeName, startDate, endDate) {
    var sameYear = startDate.getFullYear() == endDate.getFullYear();
    var sameMonth = sameYear && startDate.getMonth() == endDate.getMonth();

    var days, months, years = [];

    var maxStartDay = DateHelper.lastDayInMonth(startDate);
    var maxEndDay = DateHelper.lastDayInMonth(endDate);

    var startDay = startDate.getDate();
    var endDay = endDate.getDate();

    if(sameMonth) {
      days = days.concat(DateHelper.range(startDay, endDay, maxStartDay, DateHelper.monthAndYearStr(startDate)));
    } else {
      days = days.concat(DateHelper.range(startDay, maxStartDay, maxStartDay, DateHelper.monthAndYearStr(startDate)));
      days = days.concat(DateHelper.range(1, endDay, maxEndDay, DateHelper.monthAndYearStr(endDate)));
    }

    var startMonth = startDate.getMonth() + (startDay == 1 ? 1 : 2);
    var endMonth = endDate.getMonth() + (endDay == maxEndDay ? 1 : 0);

    var maxMonth = 12;
    if(sameYear) {
      months = months.concat(DateHelper.range(startMonth, endMonth, maxMonth, DateHelper.yearStr(startDate)));
    } else {
      months = months.concat(DateHelper.range(startMonth, maxMonth, maxMonth, DateHelper.yearStr(startDate)));
      months = months.concat(DateHelper.range(1, endMonth, maxMonth, DateHelper.yearStr(endDate)));
    }

    var startYear = startDate.getFullYear() + (startMonth == 1 ? 0 : 1);
    var endYear = endDate.getFullYear() + (endMonth == maxMonth ? 0 : -1);

    years = years.concat(DateHelper.range(startYear, endYear, 9999999, ""));

    var filterQuery = [];

    if( years.length >  0 ) filterQuery.push(attributeName + '.aag81lMifn6q=vals='  + years.join());
    if( months.length > 0 ) filterQuery.push(attributeName + '.acv81lMifn6q=vals='  + months.join());
    if( days.length >   0 ) filterQuery.push(attributeName + '.date.ddmmyyyy=vals=' + days.join());

    return filterQuery.join("&");
  }

};
