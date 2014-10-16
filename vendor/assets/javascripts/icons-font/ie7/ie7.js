/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'xicons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'xicon-arrow4-left': '&#xe670;',
		'xicon-arrow4-down': '&#xe671;',
		'xicon-arrow4-up': '&#xe672;',
		'xicon-arrow4-right': '&#xe66f;',
		'xicon-arrow1-left': '&#xe665;',
		'xicon-arrow1-down': '&#xe666;',
		'xicon-arrow1-up': '&#xe667;',
		'xicon-arrow1-right': '&#xe668;',
		'xicon-arrow-right2': '&#xe657;',
		'xicon-arrow-left2': '&#xe658;',
		'xicon-arrow3-left': '&#xe651;',
		'xicon-arrow3-down': '&#xe652;',
		'xicon-arrow3-up': '&#xe653;',
		'xicon-arrow3-right': '&#xe654;',
		'xicon-graduation': '&#xe63c;',
		'xicon-directions': '&#xe63d;',
		'xicon-statistics': '&#xe63e;',
		'xicon-bars3': '&#xe63f;',
		'xicon-mail2': '&#xe640;',
		'xicon-tag-sell': '&#xe641;',
		'xicon-magnet': '&#xe642;',
		'xicon-facebook2': '&#xe645;',
		'xicon-twitter2': '&#xe646;',
		'xicon-google-plus2': '&#xe647;',
		'xicon-linkedin2': '&#xe648;',
		'xicon-checkmark3': '&#xe659;',
		'xicon-help': '&#xe65c;',
		'xicon-flow-cascade': '&#xe660;',
		'xicon-login': '&#xe65f;',
		'xicon-calendar': '&#xe65e;',
		'xicon-logout': '&#xe664;',
		'xicon-expand': '&#xe669;',
		'xicon-contract': '&#xe66a;',
		'xicon-expand2': '&#xe66b;',
		'xicon-contract2': '&#xe66c;',
		'xicon-loop': '&#xe66d;',
		'xicon-shuffle': '&#xe66e;',
		'xicon-arrow2-up-left': '&#xe649;',
		'xicon-tag': '&#xe600;',
		'xicon-arrow2-up': '&#xe64a;',
		'xicon-tags': '&#xe601;',
		'xicon-arrow2-up-right': '&#xe64b;',
		'xicon-download': '&#xe602;',
		'xicon-arrow2-right': '&#xe64c;',
		'xicon-fire': '&#xe643;',
		'xicon-arrow2-down-right': '&#xe64d;',
		'xicon-upload': '&#xe603;',
		'xicon-arrow2-down': '&#xe64e;',
		'xicon-cogs': '&#xe644;',
		'xicon-arrow2-down-left': '&#xe64f;',
		'xicon-plus': '&#xe604;',
		'xicon-arrow2-left': '&#xe650;',
		'xicon-star': '&#xe605;',
		'xicon-star2': '&#xe606;',
		'xicon-pie': '&#xe607;',
		'xicon-info': '&#xe655;',
		'xicon-bars': '&#xe608;',
		'xicon-bars2': '&#xe609;',
		'xicon-eye': '&#xe60a;',
		'xicon-eye-blocked': '&#xe60b;',
		'xicon-copy': '&#xe60c;',
		'xicon-mail': '&#xe60d;',
		'xicon-envelope': '&#xe60e;',
		'xicon-pencil': '&#xe60f;',
		'xicon-file': '&#xe610;',
		'xicon-profile': '&#xe611;',
		'xicon-user': '&#xe612;',
		'xicon-users': '&#xe613;',
		'xicon-remove': '&#xe614;',
		'xicon-signup': '&#xe615;',
		'xicon-checkmark-circle': '&#xe616;',
		'xicon-radio-unchecked': '&#xe617;',
		'xicon-radio-checked': '&#xe618;',
		'xicon-checkbox-unchecked': '&#xe619;',
		'xicon-checkbox-checked': '&#xe61a;',
		'xicon-checkmark': '&#xe61b;',
		'xicon-checkmark2': '&#xe61c;',
		'xicon-flag': '&#xe61d;',
		'xicon-arrow-up-left': '&#xe61e;',
		'xicon-arrow-up': '&#xe61f;',
		'xicon-arrow-up-right': '&#xe620;',
		'xicon-arrow-right': '&#xe621;',
		'xicon-arrow-down-right': '&#xe622;',
		'xicon-arrow-down': '&#xe623;',
		'xicon-arrow-down-left': '&#xe624;',
		'xicon-arrow-left': '&#xe625;',
		'xicon-lab': '&#xe626;',
		'xicon-copy2': '&#xe627;',
		'xicon-meter': '&#xe628;',
		'xicon-compass': '&#xe629;',
		'xicon-user2': '&#xe62a;',
		'xicon-stack': '&#xe62b;',
		'xicon-bubbles': '&#xe62c;',
		'xicon-search': '&#xe62d;',
		'xicon-linkedin': '&#xe62e;',
		'xicon-link': '&#xe62f;',
		'xicon-google-plus': '&#xe630;',
		'xicon-twitter': '&#xe631;',
		'xicon-facebook': '&#xe632;',
		'xicon-filter': '&#xe633;',
		'xicon-trophy': '&#xe634;',
		'xicon-heart': '&#xe635;',
		'xicon-heart2': '&#xe636;',
		'xicon-office': '&#xe637;',
		'xicon-home': '&#xe638;',
		'xicon-pinterest': '&#xe639;',
		'xicon-loop-alt2': '&#xe656;',
		'xicon-cog': '&#xe65b;',
		'xicon-uniF47D': '&#xe65d;',
		'xicon-exit': '&#xe663;',
		'xicon-chevron-down': '&#xe63a;',
		'xicon-chevron-up': '&#xe63b;',
		'xicon-signout': '&#xe662;',
		'xicon-plus2': '&#xe65a;',
		'xicon-notice': '&#xe661;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/xicon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
