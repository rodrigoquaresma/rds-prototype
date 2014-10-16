/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'logo\'">' + entity + '</span>' + html;
	}
	var icons = {
		'logoicon-resultados': '&#xe600;',
		'logoicon-digitais': '&#xe601;',
		'logoicon-rd': '&#xe602;',
		'logoicon-station': '&#xe603;',
		'logoicon-resultados-digitais': '&#xe604;',
		'logoicon-rd-station': '&#xe605;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/logoicon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
