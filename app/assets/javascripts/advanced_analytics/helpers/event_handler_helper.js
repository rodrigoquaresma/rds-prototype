var EventHandler = {

  changeReportSelect : function(event) {
    event.preventDefault();

    var self = $(this);
    var reportIds = self.val().split(',');
    var iframes = Helper.getIFrame(self);

    if(reportIds.length != iframes.length) throw "the number of reportIds and iframes are different";

    for (var i = 0; i < iframes.length; i++) {
      Helper.changeReport($(iframes[i]), reportIds[i]);
    }
  },

  changeReport : function(event) {
    var self = $(this);

    if (!self.is('input[type="checkbox"]')) {
      event.preventDefault();
    }
    var reportId = self.data('report-id');
    var query = self.data('report-filter-query');
    var iframe = Helper.getIFrame(self);

    Helper.changeReport(iframe, reportId, query);
    Helper.setActive(self);
  },

  updateReportChangeSelect : function(event) {
    event.preventDefault();

    var self = $(this);
    var reportIdsArrays = self.data('report-ids-arrays').split(";");
    var select = Helper.getInsidePanel(self, '.report-change-select');
    var options = select.find('option');

    if(reportIdsArrays.length != options.length) throw "the number of reportIdsArrays and options are different";
    for (var i = 0; i < options.length; i++) {
      $(options[i]).val(reportIdsArrays[i])
    }
    select.change();

    Helper.setActive(self);
  },

  updateFilter : function(event) {
    event.preventDefault();

    var self = $(this);
    var filterName = self.data('filter-name');

    var values = self.find('input[type="text"], :checked').map(function() {
      return encodeURIComponent($(this).val());
    }).get();

    var iframe = Helper.getIFrame(self);
    Helper.updateFilter(iframe, filterName, Helper.toValsQuery(values, self.data('value-separator')));
  },

  updateFilterButtons : function(event) {
    event.preventDefault();

    var self = $(this);
    var filterName = self.parents('.report-filter-group-buttons').data('filter-name');
    var value = self.data('filter-value');

    self.parents('.btn-group').find(".active").removeClass('active');
    self.addClass('active');

    var iframe = Helper.getIFrame(self);

    Helper.updateFilter(iframe, filterName, Helper.toValsQuery([value], self.data('value-separator')));
  },

  updateDateRangeFilter : function(event) {
    event.preventDefault();

    var group = $(this).parents('.input-daterange');
    var startDate = DateHelper.toDate(group.find('input[name="start_date"]').val());
    var endDate = DateHelper.toDate(group.find('input[name="end_date"]').val());
    if (!startDate || !endDate || endDate < startDate) return;

    var filterName = group.data('filter-name');
    queryText = Helper.buildDateFilterQuery(filterName, startDate, endDate);

    var iframe = Helper.getIFrame(group);
    Helper.updateDateRangeFilter(iframe, filterName, queryText);
  },

  updateRangeFilter : function(event) {
    event.preventDefault();

    var group = $(this);
    var start = $('select[name*="from"]').val();
    var end = $('select[name*="to"]').val();
    if (!start || !end || parseInt(start) > parseInt(end)) return;

    var filterName = group.data('filter-name');
    var values = [];
    for(var i = parseInt(start); i <= parseInt(end); i++) {
      values.push(i);
    }

    var iframe = Helper.getIFrame(group);

    Helper.updateFilter(iframe, filterName, Helper.toValsQuery(values, group.data('value-separator')));
  },

  updateFixedDateRangeFilter : function(event) {
    event.preventDefault();

    var group = $(this);
    var start = group.find('input[name*="start"]').val();
    var end = group.find('input[name*="end"]').val();
    if (!start && !end) {
      Helper.clearFilter(Helper.getIFrame(group), group.data('filter-name'));
      return;
    }

    if (!start || !end) return;

    var startMonth = start.split('/')[0];
    var startYear = start.split('/')[1];
    var startDate = new Date(startYear, startMonth - 1, 1);

    var endMonth = end.split('/')[0];
    var endYear = end.split('/')[1];
    var endDate = new Date(endYear, endMonth - 1, 1);

    if (startDate > endDate) {
      $.bootstrapGrowl("A data de início deve ser anterior a data final.", {
        type: 'danger',
        width: 600,
        allow_dismiss: true,
      });
      event.stopPropagtion();
      return;
    }

    var filterName = group.data('filter-name');

    var values = [];
    while(startDate <= endDate) {
      values.push(encodeURIComponent((startDate.getMonth() + 1) + "/" + startDate.getFullYear()));
      startDate.setMonth(startDate.getMonth() + 1);
    }

    var iframe = Helper.getIFrame(group);

    Helper.updateFilter(iframe, filterName, Helper.toValsQuery(values, group.data('value-separator')));
  }

};
