/*!
 * jQuery clueTip plugin v1.2.1
 *
 * Date: Mon Jul 18 11:21:34 2011 EDT
 * Requires: jQuery v1.3+
 *
 * Copyright 2011, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/
(function(c){c.cluetip={version:"1.2.1",template:'<div><div class="cluetip-outer"><h3 class="cluetip-title ui-widget-header ui-cluetip-header"></h3><div class="cluetip-inner ui-widget-content ui-cluetip-content"></div></div><div class="cluetip-extra"></div><div class="cluetip-arrows ui-state-default"></div></div>',setup:{insertionType:"appendTo",insertionElement:"body"},defaults:{multiple:false,width:275,height:"auto",cluezIndex:9997,positionBy:"auto",topOffset:15,leftOffset:15,local:false,localPrefix:null,
localIdSuffix:null,hideLocal:true,attribute:"rel",titleAttribute:"title",splitTitle:"",escapeTitle:false,showTitle:true,cluetipClass:"default",hoverClass:"",waitImage:true,cursor:"help",arrows:false,dropShadow:true,dropShadowSteps:6,sticky:false,mouseOutClose:false,activation:"hover",clickThrough:true,tracking:false,delayedClose:0,closePosition:"top",closeText:"Close",truncate:0,fx:{open:"show",openSpeed:""},hoverIntent:{sensitivity:3,interval:50,timeout:0},onActivate:function(){return true},onShow:function(){},
onHide:function(){},ajaxCache:true,ajaxProcess:function(j){return j=j.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm,"").replace(/<(link|meta)[^>]+>/g,"")},ajaxSettings:{dataType:"html"},debug:false}};var B,da=0,M=0;c.fn.attrProp=c.fn.prop||c.fn.attr;c.fn.cluetip=function(j,v){function N(p,s,i){s=s.dropShadow&&s.dropShadowSteps?+s.dropShadowSteps:0;if(c.support.boxShadow){p.css(c.support.boxShadow,(s===0?"0 0 ":"1px 1px ")+s+"px rgba(0,0,0,0.5)");return false}p=p.find("cluetip-drop-shadow");
if(s==p.length)return p;p.remove();p=[];for(i=0;i<s;)p[i++]='<div style="top:'+i+"px;left:"+i+'px;"></div>';return i=c(p.join("")).css({position:"absolute",backgroundColor:"#000",zIndex:S-1,opacity:0.1}).addClass("cluetip-drop-shadow").prependTo("#cluetip")}var d,g,q,w,t,O;if(typeof j=="object"){v=j;j=null}if(j=="destroy"){var P=this.data("cluetip");if(P){c(P.selector).remove();c.removeData(this,"title");c.removeData(this,"cluetip");c(document).unbind(".cluetip");return this.unbind(".cluetip")}}v=
c.extend(true,{},c.cluetip.defaults,v||{});da++;P=c.cluetip.backCompat||!v.multiple?"cluetip":"cluetip-"+da;var $="#"+P,x=c.cluetip.backCompat?"#":".",T=c.cluetip.setup.insertionType,ka=c.cluetip.setup.insertionElement||"body";T=/appendTo|prependTo|insertBefore|insertAfter/.test(T)?T:"appendTo";d=c($);if(!d.length){d=c(c.cluetip.template)[T](ka).attr("id",P).css({position:"absolute",display:"none"});var S=+v.cluezIndex;q=d.find(x+"cluetip-outer").css({position:"relative",zIndex:S});g=d.find(x+"cluetip-inner");
w=d.find(x+"cluetip-title")}B=c("#cluetip-waitimage");B.length||(B=c("<div></div>").attr("id","cluetip-waitimage").css({position:"absolute"}));B.insertBefore(d).hide();var la=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0);this.each(function(p){function s(){return false}var i=this,e=c(this),a=c.extend(true,{},v,c.metadata?e.metadata():c.meta?e.data():e.data("cluetip")||{}),ea=false,H=false,fa=0,m=a[a.attribute]||e.attrProp(a.attribute)||e.attr(a.attribute),Q=a.cluetipClass;
S=+a.cluezIndex;e.data("cluetip",{title:i.title,zIndex:S,selector:$});if(!m&&!a.splitTitle&&!j)return true;if(a.local&&a.localPrefix)m=a.localPrefix+m;a.local&&a.hideLocal&&m&&c(m+":first").hide();var u=parseInt(a.topOffset,10),C=parseInt(a.leftOffset,10),D,aa,U=isNaN(parseInt(a.height,10))?"auto":/\D/g.test(a.height)?a.height:a.height+"px",V,y,z,I,W,ba=parseInt(a.width,10)||275,n=ba+la+a.dropShadowSteps,F=this.offsetWidth,A,k,o,J,K,r=a.attribute!="title"?e.attrProp(a.titleAttribute):"";if(a.splitTitle){if(r==
undefined)r="";K=r.split(a.splitTitle);r=K.shift()}if(a.escapeTitle)r=r.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");var Y=function(b){if(a.onActivate(e)===false)return false;H=true;d=c($).css({position:"absolute"});q=d.find(x+"cluetip-outer");g=d.find(x+"cluetip-inner");w=d.find(x+"cluetip-title");t=d.find(x+"cluetip-arrows");d.removeClass().css({width:ba});m==e.attr("href")&&e.css("cursor",a.cursor);a.hoverClass&&e.addClass(a.hoverClass);y=e.offset().top;A=e.offset().left;F=e.innerWidth();
if(b.type==focus){o=A+F/2+C;d.css({left:k});I=y+u}else{o=b.pageX;I=b.pageY}if(i.tagName.toLowerCase()!="area"){V=c(document).scrollTop();J=c(window).width()}if(a.positionBy=="fixed"){k=F+A+C;d.css({left:k})}else{k=F>A&&A>n||A+F+n+C>J?A-n-C:F+A+C;if(i.tagName.toLowerCase()=="area"||a.positionBy=="mouse"||F+n>J)if(o+20+n>J){d.addClass(" cluetip-"+Q);k=o-n-C>=0?o-n-C-parseInt(d.css("marginLeft"),10)+parseInt(g.css("marginRight"),10):o-n/2}else k=o+C;var f=k<0?b.pageY+u:b.pageY;d.css({left:k>0&&a.positionBy!=
"bottomTop"?k:o+n/2>J?J/2-n/2:Math.max(o-n/2,0),zIndex:e.data("cluetip").zIndex});t.css({zIndex:e.data("cluetip").zIndex+1})}aa=c(window).height();if(j){if(typeof j=="function")j=j.call(i);g.html(j);L(f)}else if(K){b=K.length;g.html(b?K[0]:"");if(b>1)for(var h=1;h<b;h++)g.append('<div class="split-body">'+K[h]+"</div>");L(f)}else if(!a.local&&m.indexOf("#")!==0)if(/\.(jpe?g|tiff?|gif|png)(?:\?.*)?$/i.test(m)){g.html('<img src="'+m+'" alt="'+r+'" />');L(f)}else{var l=a.ajaxSettings.beforeSend,ga=a.ajaxSettings.error,
ha=a.ajaxSettings.success,ia=a.ajaxSettings.complete;b=c.extend(true,{},a.ajaxSettings,{cache:a.ajaxCache,url:m,beforeSend:function(E,G){l&&l.call(i,E,d,g,G);q.children().empty();a.waitImage&&B.css({top:I+20,left:o+20,zIndex:e.data("cluetip").zIndex-1}).show()},error:function(E,G){if(H)ga?ga.call(i,E,G,d,g):g.html("<i>sorry, the contents could not be loaded</i>")},success:function(E,G){ea=a.ajaxProcess.call(i,E);if(H){ha&&ha.call(i,E,G,d,g);g.html(ea)}},complete:function(E,G){ia&&ia.call(i,E,G,d,
g);var X=g[0].getElementsByTagName("img");M=X.length;for(var ca=0,ma=X.length;ca<ma;ca++)X[ca].complete&&M--;if(M&&!c.browser.opera)c(X).bind("load error",function(){M--;if(M<1){B.hide();H&&L(f)}});else{B.hide();H&&L(f)}}});c.ajax(b)}else if(a.local){b=c(m+(/#\S+$/.test(m)?"":":eq("+p+")")).clone(true).show();a.localIdSuffix&&b.attr("id",b[0].id+a.localIdSuffix);g.html(b);L(f)}},L=function(b){var f,h,l="";h="";d.addClass("cluetip-"+Q);if(a.truncate){f=g.text().slice(0,a.truncate)+"...";g.html(f)}r?
w.show().html(r):a.showTitle?w.show().html("&nbsp;"):w.hide();if(a.sticky){f=c('<div class="cluetip-close"><a href="#"><span>'+a.closeText+"</span></a></div>");a.closePosition=="bottom"?f.appendTo(g):a.closePosition=="title"?f.prependTo(w):f.prependTo(g);f.bind("click.cluetip",function(){R();return false});a.mouseOutClose?d.bind("mouseleave.cluetip",function(){R()}):d.unbind("mouseleave.cluetip")}q.css({zIndex:e.data("cluetip").zIndex,overflow:U=="auto"?"visible":"auto",height:U});D=U=="auto"?Math.max(d.outerHeight(),
d.height()):parseInt(U,10);z=y;W=V+aa;if(a.positionBy=="fixed")z=y-a.dropShadowSteps+u;else if(k<o&&Math.max(k,0)+n>o||a.positionBy=="bottomTop")if(y+D+u>W&&I-V>D+u){z=I-D-u;h="top"}else{z=I+u;h="bottom"}else z=y+D+u>W?D>=aa?V:W-D-u:e.css("display")=="block"||i.tagName.toLowerCase()=="area"||a.positionBy=="mouse"?b-u:y-a.dropShadowSteps;if(h=="")k<A?h="left":h="right";f=" clue-"+h+"-"+Q+" cluetip-"+Q;if(Q=="rounded")f+=" ui-corner-all";d.css({top:z+"px"}).attrProp({className:"cluetip ui-widget ui-widget-content ui-cluetip"+
f});if(a.arrows){if(/(left|right)/.test(h)){h=d.height()-t.height();l=k>=0&&b>0?y-z-a.dropShadowSteps:0;l=h>l?l:h;l+="px"}t.css({top:l}).show()}else t.hide();(O=N(d,a))&&O.length&&O.hide().css({height:D,width:ba,zIndex:e.data("cluetip").zIndex-1}).show();d.hide()[a.fx.open](a.fx.openSpeed||0);c.fn.bgiframe&&d.bgiframe();if(a.delayedClose>0)fa=setTimeout(R,a.delayedClose);a.onShow.call(i,d,g)},Z=function(){H=false;B.hide();if(!a.sticky||/click|toggle/.test(a.activation)){R();clearTimeout(fa)}a.hoverClass&&
e.removeClass(a.hoverClass)},R=function(b){b=b&&b.data("cluetip")?b:e;var f=b.data("cluetip").selector;f=c(f);var h=f.find(x+"cluetip-inner"),l=f.find(x+"cluetip-arrows");f.hide().removeClass();a.onHide.call(b[0],f,h);b.removeClass("cluetip-clicked");r&&b.attrProp(a.titleAttribute,r);b.css("cursor","");a.arrows&&l.css({top:""})};c(document).unbind("hideCluetip.cluetip").bind("hideCluetip.cluetip",function(b){R(c(b.target))});if(/click|toggle/.test(a.activation))e.bind("click.cluetip",function(b){if(d.is(":hidden")||
!e.is(".cluetip-clicked")){Y(b);c(".cluetip-clicked").removeClass("cluetip-clicked");e.addClass("cluetip-clicked")}else Z(b);return false});else if(a.activation=="focus"){e.bind("focus.cluetip",function(b){e.attrProp("title","");Y(b)});e.bind("blur.cluetip",function(b){e.attrProp("title",e.data("cluetip").title);Z(b)})}else{e[a.clickThrough?"unbind":"bind"]("click.cluetip",s);var ja=function(b){if(a.tracking==true){var f=k-b.pageX,h=z?z-b.pageY:y-b.pageY;e.bind("mousemove.cluetip",function(l){d.css({left:l.pageX+
f,top:l.pageY+h})})}};c.fn.hoverIntent&&a.hoverIntent?e.hoverIntent({sensitivity:a.hoverIntent.sensitivity,interval:a.hoverIntent.interval,over:function(b){Y(b);ja(b)},timeout:a.hoverIntent.timeout,out:function(b){Z(b);e.unbind("mousemove.cluetip")}}):e.bind("mouseenter.cluetip",function(b){Y(b);ja(b)}).bind("mouseleave.cluetip",function(b){Z(b);e.unbind("mousemove.cluetip")});e.bind("mouseover.cluetip",function(){e.attrProp("title","")}).bind("mouseleave.cluetip",function(){e.attrProp("title",e.data("cluetip").title)})}});
return this};(function(){c.support=c.support||{};for(var j=document.createElement("div").style,v=["boxShadow"],N=["moz","Moz","webkit","o"],d=0,g=v.length;d<g;d++){var q=v[d],w=q.charAt(0).toUpperCase()+q.slice(1);if(typeof j[q]!=="undefined")c.support[q]=q;else for(var t=0,O=N.length;t<O;t++)if(typeof j[N[t]+w]!=="undefined"){c.support[q]=N[t]+w;break}}})();c.fn.cluetip.defaults=c.cluetip.defaults})(jQuery);