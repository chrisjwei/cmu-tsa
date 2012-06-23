// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(i){var q={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null, itemFallbackDimension:null},r=false;i(window).bind("load.jcarousel",function(){r=true});i.jcarousel=function(a,c){this.options=i.extend({},q,c||{});this.autoStopped=this.locked=false;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl=(i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl? "right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel")!=-1){i(a).removeClass(d[f]);b=d[f];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jcarousel-clip")){if(!this.container.parent().hasClass("jcarousel-container"))this.container=this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jcarousel-container"))this.container= this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!==""&&this.container.parent()[0].className.indexOf("jcarousel")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent();this.buttonNext=i(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext= this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jcarousel-next"));this.buttonPrev=i(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jcarousel-prev"));this.clip.addClass(this.className("jcarousel-clip")).css({overflow:"hidden",position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden", position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var e=this;if(b.size()>0){var g=0,k=this.options.offset;b.each(function(){e.format(this,k++);g+=e.dimension(this, j)});this.list.css(this.wh,g+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.reload()};this.options.initCallback!==null&&this.options.initCallback(this,"init");if(!r&&i.browser.safari){this.buttons(false,false);i(window).bind("load.jcarousel",function(){e.setup()})}else this.setup()}; var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.7"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,true);this.prevFirst=this.prevLast=null;this.animate(a,false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}}, reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0; this.list.children("li").each(function(f){b+=a.dimension(this,c);if(f+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!==undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c===undefined||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b= a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,f=i(c);if(b.length===0){var j,e=h.intval(a);for(b=this.create(a);;){j=this.get(--e);if(e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}}else d=this.dimension(b);if(f.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(f);b=f}else b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")), a);f=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,f)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))- b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked|| this.animating||!this.tail)){this.pauseAuto();var c=h.intval(this.list.css(this.lt));c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){if(!(this.locked||this.animating)){this.pauseAuto();this.animate(this.pos(a),c)}},pos:function(a,c){var b=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;if(this.options.wrap!="circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var d= this.first>a,f=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(f):this.get(this.last),e=d?f:f-1,g=null,k=0,l=false,m=0;d?--e>=a:++e<a;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jcarousel-item-placeholder"));j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g=this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(l)k+= m;if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<=this.options.size)))b=d?b+m:b-m}f=this.clipping();var p=[],o=0,n=0;j=this.get(a-1);for(e=a;++o;){g=this.get(e);l=!g.length;if(g.length===0){g=this.create(e).addClass(this.className("jcarousel-item-placeholder"));j.length===0?this.list.prepend(g):j[d?"before":"after"](g);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)){j=this.get(this.index(e));if(j.length)g= this.add(e,j.clone(true))}}j=g;m=this.dimension(g);if(m===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size)p.push(g);else if(l)k+=m;n+=m;if(n>=f)break;e++}for(g=0;g<p.length;g++)p[g].remove();if(k>0){this.list.css(this.wh,this.dimension(this.list)+k+"px");if(d){b-=k;this.list.css(this.lt,h.intval(this.list.css(this.lt))-k+"px")}}k=a+o-1;if(this.options.wrap!="circular"&& this.options.size&&k>this.options.size)k=this.options.size;if(e>k){o=0;e=k;for(n=0;++o;){g=this.get(e--);if(!g.length)break;n+=this.dimension(g);if(n>=f)break}}e=k-o+1;if(this.options.wrap!="circular"&&e<1)e=1;if(this.inTail&&d){b+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&k==this.options.size&&k-o+1>=1){d=h.margin(this.get(k),!this.options.vertical?"marginRight":"marginBottom");if(n-d>f)this.tail=n-f-d}if(c&&a===this.options.size&&this.tail){b-=this.tail;this.inTail= true}for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=k;return b},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a===0&&b.list.css(b.lt,0);if(!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail))b.startAuto();b.buttons();b.notify("onAfterAnimation"); if(b.options.wrap=="circular"&&b.options.size!==null)for(var f=b.prevFirst;f<=b.prevLast;f++)if(f!==null&&!(f>=b.first&&f<=b.last)&&(f<1||f>b.options.size))b.remove(f)};this.notify("onBeforeAnimation");if(!this.options.animation||c===false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!==undefined)this.options.auto=a;if(this.options.auto===0)return this.stopAuto(); if(this.timer===null){this.autoStopped=false;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=true},pauseAuto:function(){if(this.timer!==null){window.clearTimeout(this.timer);this.timer=null}},buttons:function(a,c){if(a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap== "first")&&this.options.size!==null&&this.last>=this.options.size)a=this.tail!==null&&!this.inTail}if(c==null){c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1)c=this.tail!==null&&this.inTail}var b=this;if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);a&&this.buttonNext.bind(this.options.buttonNextEvent+ ".jcarousel",this.funcNext);this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?false:true);this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)}else this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+ ".jcarousel",this.funcPrev);c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)}else this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b, null,c);this.buttonNextState=a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback", a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var g=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(g)){var k=this;if(d===undefined)g(k,b,c);else if(f===undefined)this.get(d).each(function(){g(k,this,d,b,c)});else{a=function(m){k.get(m).each(function(){g(k, this,m,b,c)})};for(var l=d;l<=f;l++)l!==null&&!(l>=j&&l<=e)&&a(l)}}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical? "-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!==undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==null||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh, d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))-h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(q,a||{})},margin:function(a,c){if(!a)return 0; var b=a.jquery!==undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},f,j;i.swap(b,d,function(){f=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){j=b.offsetWidth});return j-f}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a}});i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel", new h(this,a))})}})(jQuery);

(function($){var defaults={autoPlay:true,speed:5000,text:{play:"",stop:"",previous:"Previous",next:"Next"},transition:[1],showCaption:true,IESafe:false,showTooltips:false,animationFinished:null};$.fn.PikaChoose=function(o){return this.each(function(){$(this).data('pikachoose',new $pc(this,o));});}
$.PikaChoose=function(e,o){this.options=$.extend({},defaults,o||{});this.list=null;this.image=null;this.anchor=null;this.caption=null;this.imgNav=null;this.imgPlay=null;this.imgPrev=null;this.imgNext=null;this.textNext=null;this.textPrev=null;this.previous=null;this.next=null;this.aniDiv=null;this.thumbs=null;this.transition=null;this.active=null;this.tooltip=null;this.animating=false;this.stillOut=null;if(e.nodeName=='UL'||e.nodeName=='OL'){this.list=$(e);this.build();this.bindEvents();}else{return;}
var y=0;var x=0;for(var t=0;t<25;t++){var a='<div col="'+y+'" row="'+x+'"></div>';this.aniDiv.append(a);y++
if(y==5){x++;y=0;}}};var $pc=$.PikaChoose;$pc.fn=$pc.prototype={pikachoose:'4.1.0'};$pc.fn.extend=$pc.extend=$.extend;$pc.fn.extend({build:function(){this.step=0;this.wrap=$("<div class='pika-image'></div>").insertBefore(this.list);this.image=$("<img>").appendTo(this.wrap);this.anchor=this.image.wrap("<a>").parent();this.imgNav=$("<div class='pika-imgnav'></div>").insertAfter(this.anchor);this.imgPlay=$("<a></a>").appendTo(this.imgNav);if(this.options.autoPlay){this.imgPlay.addClass('pause');}else{this.imgPlay.addClass('play');}
this.imgPrev=$("<a class='previous'></a>").insertAfter(this.imgPlay);this.imgNext=$("<a class='next'></a>").insertAfter(this.imgPrev);this.caption=$("<div class='caption'></div>").insertAfter(this.imgNav);if(!this.options.showCaption){this.caption.hide();}
this.tooltip=$("<div class='pika-tooltip'></div>").insertAfter(this.list);this.tooltip.hide();this.aniDiv=$("<div class='animation'></div>").insertAfter(this.caption);this.textNav=$("<div class='pika-textnav'></div>").insertAfter(this.aniDiv);this.textPrev=$("<a class='previous'>"+this.options.text.previous+"</a>").appendTo(this.textNav);this.textNext=$("<a class='next'>"+this.options.text.next+"</a>").appendTo(this.textNav);this.list.addClass('pika-thumbs');this.list.children('li').wrapInner("<div class='clip' />");this.thumbs=this.list.find('img');this.active=this.thumbs.eq(0);this.finishAnimating({'source':this.active.attr('ref')||this.active.attr('src'),'caption':this.active.parents('li:first').find('span:first').html(),'clickThrough':this.active.parent().attr('href')||""});var self=this;this.thumbs.each(function(){self.createThumb($(this),self);});},createThumb:function(ele){var self=ele;var that=this;self.hide();$.data(ele[0],'clickThrough',self.parent('a').attr('href')||"#");if(self.parent('a').length>0){self.unwrap();}
$.data(ele[0],'caption',self.next('span').html()||"");self.next('span').remove();$.data(ele[0],'source',self.attr('ref')||self.attr('src'));$.data(ele[0],'order',self.closest('ul').find('li').index(self.parents('li')));var data=$.data(ele[0]);$('<img />').bind('load',{data:data},function(){var img=$(this);var w=img.width();var h=img.height();if(w===0){w=img.attr("width");}
if(h===0){h=img.attr("height");}
var rw=parseInt(self.parents('.clip').css('width').slice(0,-2))/w;var rh=parseInt(self.parents('.clip').css('height').slice(0,-2))/h;var ratio;if(rw<rh){ratio=rh;var left=((w*ratio-parseInt(self.parents('.clip').css('width').slice(0,-2)))/2)*-1;left=Math.round(left);self.css({left:left});}else{ratio=rw;self.css({top:0});}
var width=Math.round(w*ratio);var height=Math.round(h*ratio);self.css("position","relative");var imgcss={width:width+"px",height:height+"px"};self.css(imgcss);self.hover(function(e){clearTimeout(that.stillOut);$(this).stop(true,true).fadeTo(250,1);if(!that.options.showTooltips){return;}
that.tooltip.show().stop(true,true).html(data.caption).animate({top:$(this).parent().position().top,left:$(this).parent().position().left,opacity:1.0},'fast');},function(e){if(!$(this).hasClass("active")){$(this).stop(true,true).fadeTo(250,0.4);that.stillOut=setTimeout(that.hideTooltip,700);}});if(data.order==0){self.fadeTo(250,1);self.addClass('active');}else{self.fadeTo(250,0.4);}}).attr('src',self.attr('src'));},bindEvents:function(){this.thumbs.bind('click',{self:this},this.imgClick);this.imgNext.bind('click',{self:this},this.nextClick);this.textNext.bind('click',{self:this},this.nextClick);this.imgPrev.bind('click',{self:this},this.prevClick);this.textPrev.bind('click',{self:this},this.prevClick);this.imgPlay.bind('click',{self:this},this.playClick);this.wrap.bind('mouseenter',{self:this},function(e){e.data.self.imgPlay.stop(true,true).fadeIn('fast');});this.wrap.bind('mouseleave',{self:this},function(e){e.data.self.imgPlay.stop(true,true).fadeOut('fast');});this.tooltip.bind('mouseenter',{self:this},function(e){clearTimeout(e.data.self.stillOut);});this.tooltip.bind('mouseleave',{self:this},function(e){e.data.self.stillOut=setTimeout(e.data.self.hideTooltip,700);});},hideTooltip:function(e){$(".pika-tooltip").animate({opacity:0.01});},imgClick:function(e,x){var self=e.data.self;var data=$.data(this);if(self.animating){return;}
self.caption.fadeOut('slow');if(typeof(x)=='undefined'||x.how!="auto"){if(self.options.autoPlay){self.imgPlay.trigger('click');}}
self.animating=true;self.active.fadeTo(300,0.4).removeClass('active');self.active=$(this);self.active.addClass('active').fadeTo(200,1);$('<img />').bind('load',{self:self,data:data},function(){self.aniDiv.css({height:self.image.height(),width:self.image.width()}).fadeIn('fast');self.aniDiv.children('div').css({'width':'20%','height':'20%','float':'left'});var n=0;if(self.options.transition[0]==-1){n=Math.floor(Math.random()*6)+1;}else{n=self.options.transition[self.step];self.step++;if(self.step>=self.options.transition.length){self.step=0;}}
if(self.options.IESafe&&$.browser.msie){n=1;}
self.doAnimation(n,data);}).attr('src',$.data(this).source);},doAnimation:function(n,data){var self=this;var aWidth=self.aniDiv.children('div').eq(0).width();var aHeight=self.aniDiv.children('div').eq(0).height();self.aniDiv.children().each(function(){var div=$(this);var xOffset=Math.floor(div.parent().width()/5)*div.attr('col');var yOffset=Math.floor(div.parent().height()/5)*div.attr('row');div.css({'background':'url('+data.source+') -'+xOffset+'px -'+yOffset+'px','width':'0px','height':'0px','position':'absolute','top':yOffset+'px','left':xOffset+'px','float':'none'});});switch(n){case 0:self.aniDiv.hide();self.image.fadeOut('slow',function(){self.image.attr('src',data.source).fadeIn('slow',function(){self.finishAnimating(data);});});break;case 1:self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});self.aniDiv.children('div').hide();self.aniDiv.fadeIn('slow',function(){self.finishAnimating(data);self.aniDiv.css({'background':'transparent'});});break;case 2:self.aniDiv.children().hide().each(function(index){var delay=index*30;$(this).css({opacity:0.1}).show().delay(delay).animate({opacity:1,"width":aWidth,"height":aHeight},200,'linear',function(){if($(".animation div").index(this)==24){self.finishAnimating(data);}});});break;case 3:self.aniDiv.children("div:lt(5)").hide().each(function(index){var delay=$(this).attr('col')*100;$(this).css({opacity:0.1,"width":aWidth}).show().delay(delay).animate({opacity:1,"height":self.image.height()},700,'linear',function(){if($(".animation div").index(this)==4){self.finishAnimating(data);}});});break;case 4:self.aniDiv.children().hide().each(function(index){var delay=$(this).attr('col')*10;aHeight=self.gapper($(this),aHeight);$(this).css({opacity:0.1,"height":aHeight}).show().delay(delay).animate({opacity:1,"width":aWidth},800,'linear',function(){if($(".animation div").index(this)==24){self.finishAnimating(data);}});});break;case 5:self.aniDiv.children().show().each(function(index){var delay=index*Math.floor(Math.random()*5)*10;aHeight=self.gapper($(this),aHeight);if($(".animation div").index(this)==24){delay=800;}
$(this).css({"height":aHeight,"width":aWidth,"opacity":.01}).delay(delay).animate({"opacity":1},800,function(){if($(".animation div").index(this)==24){self.finishAnimating(data);}});});break;case 6:self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});self.aniDiv.children('div').hide();self.aniDiv.css({width:0}).show().animate({width:self.image.width()},'slow',function(){self.finishAnimating(data);self.aniDiv.css({'background':'transparent'});});break;}},finishAnimating:function(data){this.animating=false;this.image.attr('src',data.source);this.aniDiv.hide();this.anchor.attr('href',data.clickThrough);if(this.options.showCaption){this.caption.html(data.caption).fadeIn('slow');}
if(this.options.autoPlay==true){var self=this;this.image.delay(this.options.speed).fadeIn(0,function(){if(self.options.autoPlay){self.nextClick();}});}
if(typeof(this.options.animationFinished)=='function'){this.options.animationFinished(this);}},gapper:function(ele,aHeight){if(ele.attr('row')==9&&ele.attr('col')==0){var gap=ani_divs.height()-(aHeight*9);return gap;}
return aHeight;},nextClick:function(e){var how="natural";try{var self=e.data.self;}catch(err){var self=this;how="auto";}
var next=self.active.parents('li:first').next().find('img');if(next.length==0){next=self.list.find('img').eq(0);};next.trigger('click',{how:how});},prevClick:function(e){var self=e.data.self;var prev=self.active.parents('li:first').prev().find('img');if(prev.length==0){prev=self.list.find('img:last');};prev.trigger('click');},playClick:function(e){var self=e.data.self;self.options.autoPlay=!self.options.autoPlay;self.imgPlay.toggleClass('play').toggleClass('pause');if(self.options.autoPlay){self.nextClick();}}});})(jQuery);


// Initializing the full width slider

$(document).ready(
	function (){
		$("#fullwidth_slider").PikaChoose({transition:[0]}); // 0: full frame cross fade
		// $("#pikame").PikaChoose({transition:[1]}); // 1: paneled fold out
		// $("#pikame").PikaChoose({transition:[2]}); // 2: horizontal blinds
		// $("#pikame").PikaChoose({transition:[3]}); // 3: vertical blinds
		// $("#pikame").PikaChoose({transition:[4]}); // 4: small box random fades
		// $("#pikame").PikaChoose({transition:[5]}); // 5: full image blind slide
		// $("#pikame").PikaChoose({transition:[6]}); // 6: fade out, then fade in (use this for different sized images)
	
	$('.caption').css({'right': (1920/2)+($('.row').width()/(-1*2))+(40)+'px'});

	$("nav li").click(function () {
      window.location.replace($(this).find('a').attr('href'));
    });
	$(".description").click(function () {
		window.location.replace($(this).parent().find('a').attr('href'));
	});
  $('.members .info').css({'width': $('.members img').width()-40 + 'px'});
  $('.members .info').css({'height': $('.members img').height()-40 + 'px'});
  $('.members').hover(
    function () {
      $(this).find('img').fadeTo(250, 0.2);
      $(this).parent().find('.info').fadeIn(250);
    }, 
    function () {
      $(this).find('img').fadeTo(250, 1);
      $(this).parent().find(".info").fadeOut(250);
    }
  );
});

$(window).resize(function() {
  $('.caption').css({'right': (1920/2)+($('.row').width()/(-1*2))+(40)+'px'});
	var height = ($('.description').parent().height())/4;
	$('.description').css({'top': height+'px'});
  $('.members .info').css({'width': $('.members img').width()-40 + 'px'});
  $('.members .info').css({'height': $('.members img').height()-40 + 'px'});
});