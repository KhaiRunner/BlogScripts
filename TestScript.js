/*
(isContentPage)|(windowWidth)|(initFB)|(getRecentPost)|(updateLink)|(optimizeLink)|(addWidgets)|(optimizeImg)|(labelthumbs)|(LoadInfo)|(handleImg)|(stickyFB)|(stickySidebar)|(initWidgetManager)|(isInitWidget)|(isInitFB)|(openNewWindow)|(initSocialButtons)|(searchButtonHandler)
(?1A)(?2B)(?3C)(?4D)(?5E)(?6F)(?7G)(?8H)(?9I)(?10J)(?11K)(?12L)(?13M)(?14N)(?15O)(?16P)(?17Q)(?18R)(?19S)
*/
//==================All Page First section==================
var isContentPage = document.getElementById('isContent').value == '1';
var windowWidth = 0 < window.innerWidth ? window.innerWidth : screen.width;
var isInitWidget = false;
var isInitFB = false;

function getRecentPost(){
	//rawRecentPosts -> r
	var allInfo = document.getElementById("r").value.split(',');
	var recentlyHtml = '<h2>Recent Posts</h2><ul class="wc pp">';
	var popIndex = 5;
	
	//Update Url in this function because we need to optimize when render HTML so that we need seperate logic.
	var isMobile = window.location.href.indexOf('?m=1')!=-1;
	for (var index = 0;index<5;++index){
		var indexTitle = index;
		var indexLink = index+5;
		var indexImg = index+10;
		if(isMobile){
			allInfo[indexLink] += '?m=1';
		}
		
		//check img for add <img> or <a class="p p1"/>
		if(allInfo[indexImg].length > 0){
			recentlyHtml += '<li><a class="p" href="'+allInfo[indexLink]+'"><img alt="" border="0" height="72" src="'+allInfo[indexImg]+'" width="72"/></a><a class="t" href="'+allInfo[indexLink]+'">'+allInfo[indexTitle]+'</a></li>';
		}else{
			recentlyHtml += '<li><a class="p p'+(++popIndex)+'" href="'+allInfo[indexLink]+'"/><a class="t" href="'+allInfo[indexLink]+'">'+allInfo[indexTitle]+'</a></li>';
		}		
	}
	recentlyHtml += '</ul>';
	return recentlyHtml;
}

function updateLink(links){
	var isMobile = window.location.href.indexOf('?m=1')!=-1;
	var mainUrl = window.location.origin;
	var httpUrl = "http://" + window.location.hostname;
	for(var i=0; i<links.length; ++i) {
			var checkUrl = links[i].href;
			if(checkUrl.indexOf(httpUrl) == 0){
				checkUrl = checkUrl.replace("http:", "https:");
				links[i].setAttribute('href', checkUrl);
			}
			
			if(isMobile && checkUrl.indexOf(mainUrl) == 0 && checkUrl.indexOf("?m=1")==-1){
				checkUrl += "?m=1";
				links[i].setAttribute('href', checkUrl)
			}
	}
}

function optimizeLink(htmlString){
	var domSearch = document.createElement('body');
	domSearch.innerHTML = htmlString;
	var links = domSearch.getElementsByTagName('a');
	updateLink(links);
	return domSearch.innerHTML; 
}

function addWidgets(){
	var html6 = '<h2>Weekly Popular Posts</h2>'
		+'<ul class="wc pp"><li><a class="p p1" href="/2017/02/front-garden-designs.html"/><a class="t" href="/2017/02/front-garden-designs.html">วิธีจัดสวนหน้าบ้านสวยๆ ประหยัดงบ พร้อม 65 แบบสวนสวย</a></li><li><a class="p p2" href="/2017/09/20-modern-two-story-house-design-ideas.html"/><a class="t" href="/2017/09/20-modern-two-story-house-design-ideas.html">20 แบบบ้าน 2 ชั้นสวยๆ สไตล์โมเดิร์น มาหาบ้านที่ชอบกัน</a></li><li><a class="p p3" href="/2017/04/2-bedrooms-cozy-condo-interior.html"/><a class="t" href="/2017/04/2-bedrooms-cozy-condo-interior.html">แต่งคอนโดสวยๆ 2 ห้องนอน น่าอยู่มากๆ (รูปเยอะ)</a></li><li><a class="p p4" href="/2017/02/61-small-kitchen-designs.html"/><a class="t" href="/2017/02/61-small-kitchen-designs.html">61 แบบห้องครัวขนาดเล็ก ห้องครัวเล็กๆก็สวยได้</a></li><li><a class="p p5" href="/2017/09/47-garden-condo-ideas.html"/><a class="t" href="/2017/09/47-garden-condo-ideas.html">47 ไอเดียจัดสวนคอนโด พื้นที่น้อยก็สวยได้</a></li></ul>';
	var html2 = getRecentPost();
	var html7 = "<h2>สีห้อง</h2><div class='wc ll i'><a href='/search/label/โทนสีครีม'><b style='color:#FDA'>◼︎ </b>สีครีม</a><a href='/search/label/โทนสีชมพู'><b style='color:#F6B'>◼︎ </b>สีชมพู</a><a href='/search/label/โทนสีดำ'><b style='color:#000'>◼︎ </b>สีดำ</a><a href='/search/label/โทนสีฟ้า'><b style='color:#0FF'>◼︎ </b>สีฟ้า</a><a href='/search/label/โทนสีม่วง'><b style='color:#93C'>◼︎ </b>สีม่วง</a><a href='/search/label/โทนสีเขียว'><b style='color:#0F0'>◼︎ </b>สีเขียว</a></div>";
	var html12 = "<img src='//lh4.googleusercontent.com/-r3DwfG_MEqQ/AAAAAAAAAAI/AAAAAAAAwyE/iTJKG7-aDok/photo.jpg?sz=104' height='104' width='104'><div><h3>Khai Runner</h3><a href='https://plus.google.com/+KhaiRunner' target='_blank'>About Me</a></div>";
	
	var sidebarHtml = '<div class="widget" id="HTML6">'+html6+'</div>'
											+ '<div class="section" id="sidebarRight"><div class="widget HTML" data-version="1" id="HTML2">'+html2+'</div></div>'
											+ '<div class="widget" id="HTML7">'+html7+'</div>'
											+ '<div class="gp" id="HTML12">'+html12+'</div>';

											
	//Check display screen fore
	var htmlLeftSidebar = "<h2>แต่งบ้าน</h2><div class='wc ll i'><a href='/search/label/ห้องนอน'><b>💤 </b>ห้องนอน</a><a href='/search/label/ห้องนอนเด็ก'><b>👶 </b>ห้องนอนเด็ก</a><a href='/search/label/ห้องนั่งเล่น'><b>📺 </b>ห้องนั่งเล่น</a><a href='/search/label/แบบตู้เสื้อผ้า'><b>👕 </b>ตู้เสื้อผ้า</a><a href='/search/label/เก้าอี้และโซฟา'><b>💺 </b>เก้าอี้และโซฟา</a><a href='/search/label/ชั้นหนังสือ'><b>📚 </b>ชั้นหนังสือ</a><a href='/search/label/แต่งผนัง'><b>🎨 </b>แต่งผนัง</a><a href='/search/label/แบบโฮมออฟฟิศ'><b>🏢 </b>แบบโฮมออฟฟิศ</a><a href='/search/label/สวนสวย'><b>🌷 </b>สวนสวย</a><a href='/search/label/ห้องน้ำ'><b>🚽 </b>ห้องน้ำ</a><a href='/search/label/แบบห้องครัว'><b>🍴 </b>แบบห้องครัว</a></div>";
	if(windowWidth>1200){
		document.getElementById('HTML8').innerHTML = optimizeLink(htmlLeftSidebar);
	}else{
		sidebarHtml += "<div id='sb3'><div id='sb2' class='sidebar'><div class='widget' id='HTML9'>"+htmlLeftSidebar+"</div></div></div>"
	}
	document.getElementById('sb').innerHTML = optimizeLink(sidebarHtml);
	
	
	//Footer
	var footerHtml = "<div id='f' class='woo'><div class='ft'><div class='widget' id='HTML4'><h2>Home Decor</h2><div class='cl i'><a href='/search/label/ตู้วางทีวี'><b>📺 </b>ต&#3641;&#3657;วางท&#3637;ว&#3637;</a><a href='/search/label/โรงรถ'><b>🚗 </b>โรงรถ</a><a href='/search/label/สนามหญ้า'><b>🌿 </b>สนามหญ&#3657;า</a><a href='/search/label/สวนแนวตั้ง'><b>🌱 </b>สวนแนวต&#3633;&#3657;ง</a><a href='/search/label/ห้องพระ'><b>🙏 </b>ห&#3657;องพระ</a><a href='/search/label/บ่อปลา'><b>&#9970; </b>สระน&#3657;ำ</a><a href='/search/label/พรม'><b>👣 </b>พรม</a><a href='/search/label/เครื่องใช้ไฟฟ้า'><b>🔌 </b>เคร&#3639;&#3656;องใช&#3657;ไฟฟ&#3657;า</a><a href='/search/label/ซ่อมบ้าน'><b>🔧 </b>ซ&#3656;อมบ&#3657;าน</a></div></div></div>"
		+ "<div class='ft'><div class='widget' id='HTML5'><h2>Month's Popular Posts</h2><div class='pp'>"
		+ '<ul><li><a class="p p11" href="/2017/02/42-small-front-yard-ideas.html"/><a class="t" href="/2017/02/42-small-front-yard-ideas.html">42 ไอเดียจัดสวนหน้าบ้าน พื้นที่น้อยๆ</a></li><li><a class="p p12" href="/2017/10/30-kitchen-ideas-for-one-floor-house.html"/><a class="t" href="/2017/10/30-kitchen-ideas-for-one-floor-house.html">30 แบบห้องครัวบ้านชั้นเดียว หาไอเดียที่ถูกใจกัน</a></li><li><a class="p p13" href="/2017/04/cozy-white-condo-interior.html"/><a class="t" href="/2017/04/cozy-white-condo-interior.html">แบบแต่งคอนโดสวยๆ เน้นสีขาว สวยงาม น่าอยู่</a></li></ul>'
		+ "</div></div></div><div class='ft'><div class='widget' id='HTML9'><h2>More Topics</h2><div class='cl'><a href='/search/label/IKEA'>IKEA</a><a href='/search/label/SB Design Square'>SB</a><a href='/search/label/การเลือกซื้อบ้าน'>เล&#3639;อกซ&#3639;&#3657;อบ&#3657;าน</a><a href='/search/label/คอนโด'>คอนโด</a><a href='/search/label/ตากผ้า'>ตากผ&#3657;า</a><a href='/search/label/บันได'>บ&#3633;นได</a><a href='/search/label/บ้านชั้นเดียว'>บ&#3657;านช&#3633;&#3657;นเด&#3637;ยว</a><a href='/search/label/ม่าน'>ม&#3656;าน</a><a href='/search/label/วางแผนการเงิน'>แผนการเง&#3636;น</a><a href='/search/label/เครื่องซักผ้า'>เคร&#3639;&#3656;องซ&#3633;กผ&#3657;า</a><a href='/search/label/แต่งบ้าน'>แต&#3656;งบ&#3657;าน</a></div></div></div><div class='ft'><div id='ft4'><div class='widget ContactForm' id='ContactForm2'><h2>Contact Us</h2><form name='contact-form'>ช&#3639;&#3656;อ<br/><input class='cf' id='ContactForm2_contact-form-name' name='name' size='30' type='text' value=''/><p></p>อ&#3637;เมล*<br/><input class='cf' id='ContactForm2_contact-form-email' name='email' size='30' type='text' value=''/><p></p>ข&#3657;อความ*<br/><textarea class='cf' cols='25' id='ContactForm2_contact-form-email-message' name='email-message' rows='5'></textarea><p></p><input class='cfb' id='ContactForm2_contact-form-submit' type='button' value='ส่ง'/><div style='text-align:center;max-width:222px;width:100%'><p class='contact-form-error-message' id='ContactForm2_contact-form-error-message'></p><p class='contact-form-success-message' id='ContactForm2_contact-form-success-message'></p></div></form></div></div></div></div>"
		+ "<div id='cr' class='woo'><p><a href='https://buildsweethome.blogspot.com/'>Build Sweet Home</a> &#169; 2018 All rights reserved.  สงวนล&#3636;ขส&#3636;ทธ&#3636;&#3660;เน&#3639;&#3657;อหาเว&#3655;บไซต&#3660; ห&#3657;ามค&#3633;ดลอก เผยแพร&#3656;ก&#3656;อนได&#3657;ร&#3633;บอน&#3640;ญาต | Theme by <a href='http://www.templateism.com' rel='nofollow'>Templateism</a></div></div></div>";
		document.getElementById('fc').innerHTML = optimizeLink(footerHtml);
}
addWidgets();

//Init facebook.
function initFB(){
  isInitFB = true;
  var urlFBsdk = "https://connect.facebook.net/en_US/sdk.js";
  var callbackFuntion = function(){
		FB.init({
		appId : document.querySelector("meta[property='fb:app_id']").getAttribute("content"),
		xfbml      : true,
		version    : 'v3.2'
		});
	$.ajax({
         type: "GET",
         url: urlFBsdk,
         success: callbackFuntion,
         dataType: "script",
         cache: true
     });
}

//===================Content Page=============================
function handleImg() {
	$('[id^=adMid_] a:has(img)').click(function(){return false;});
}


function stickyFB(width) {
    if (width > 1200) return;
    var mainTop = $('#main-wrapper .post-body').offset().top,
		footerTop = $('#fc').offset().top,
		endOfContentPosition = $('.post-footer').offset().top,
        socialFloat = $('.soF'),
		topPosition = 0,
        marginLeft = '0';
    if (width > 440) marginLeft = '-25px';
    else if (width > 320) marginLeft = '-15px';
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
		
		//FB Comment Section
		if(!isInitFB && scroll > endOfContentPosition){
			initFB();
		}
        
		
		//For Social Bar
		var socialFloatPosition = socialFloat.css('position');
		if (scroll > mainTop && scroll < footerTop) {
			//save CPU by not set same value. Cannot merged logic!!!
			if(scroll > 3000 && socialFloatPosition == 'fixed')return;
			
			var adTopInMobile = $('.adsbygoogle-noablate[data-anchor-status="displayed"]');
			if(adTopInMobile.css('top') == '0px'){
				var calHeight = adTopInMobile.css('height');
				topPosition = calHeight ? calHeight : 65;
			}
			else {topPosition = 0;}
			
            socialFloat.css({
				'display':'inline',
                'position': 'fixed',
                'top': topPosition,
                'margin-left': marginLeft
            });
			//Recalculate again for better display result but Only first section.
			footerTop = $('#fc').offset().top;
        } else if(socialFloatPosition != 'static'){
			//save CPU by not set same value. Cannot merged logic!!!
			if(socialFloatPosition == 'relative')return;
			
			socialFloat.css({
				'display':'block',
                'position': 'relative',
                'top': 0,
                'margin-left': 0
            });
        }
    });
}

function openNewWindow(url, title){
	var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
		
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(url, title, opts);
}

function initSocialButtons(){
	var currentUrl = window.location.href.split('?')[0];
	
	$('.tw').click(function() {
	var url    = 'https://twitter.com/share?text=' + $('.post-title').text();
	openNewWindow(url, 'twitter');
    return false;
  });
 
	$('.fb').click(function(){
		
		var url    = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;
		openNewWindow(url, 'Facebook');

		return false;
	});

	$('.g').click(function(){
		var url    = 'https://plus.google.com/share?url=' + currentUrl;
		openNewWindow(url, 'Google+');
 		return false;
	});
	
	//Check number of FB share
	$.getJSON( 'https://graph.facebook.com/?id=' + currentUrl, function( data ) {
	  
	  if(data && data.share && data.share.share_count > 0){
		$('.fb').append(' ' + data.share.share_count)
	  }
	});
}

//-----------------------------------------------------------------------
//Run Script Content Page
if(isContentPage){
	//Handle images first before user might redirect to image url.
	handleImg();
	stickyFB(windowWidth);
	initSocialButtons();
	
	//Fix link
	var pagerLink = $('.page a[href=""]');
	if(pagerLink.length > 0){
		var message = "This is the oldest post.";
		if(pagerLink.parent().hasClass('next')){
			message = "This is the latest post."
		}
		pagerLink.removeAttr('href');
		pagerLink[0].innerHTML += " <div style='color:#666'>"+message+"</div></a> ";
	}
	
}


//===================Main/Search/Label=============================
//init function resizeToParent
(function(e){e.fn.resizeToParent=function(t){function r(e){e.css({width:"",height:"","margin-left":"","margin-top":""});var n=e.parents(t.parent).width();var r=e.parents(t.parent).height();var i=e.width();var s=e.height();var o=i/n;if(s/o<r){e.css({width:"auto",height:r});i=i/(s/r);s=r}else{e.css({height:"auto",width:n});i=n;s=s/o}var u=(i-n)/-2;var a=(s-r)/-2;e.css({"margin-left":u,"margin-top":a})}var n={parent:"div",delay:100};var t=e.extend(n,t);var i;var s=this;e(window).on("resize",function(){clearTimeout(i);i=setTimeout(function(){s.each(function(){r(e(this))})},t.delay)});return this.each(function(){var t=e(this);t.attr("src",t.attr("src"));t.load(function(){r(t)});if(this.complete){r(t)}})}})(jQuery);
//init unslider for home page
(function(e,d){if(!e)return d;var h=function(){this.items=this.el=d;this.sizes=[];this.max=[0,0];this.current=0;this.interval=d;this.opts={speed:500,delay:3E3,complete:d,keys:!d,dots:d,fluid:d};var a=this;this.init=function(a,c){this.el=a;this.ul=a.children("ul");this.max=[a.outerWidth(),a.outerHeight()];this.items=this.ul.children("li").each(this.calculate);this.opts=e.extend(this.opts,c);this.setup();return this};this.calculate=function(b){var c=e(this),f=c.outerWidth();c=c.outerHeight();a.sizes[b]=[f,c];f>a.max[0]&&(a.max[0]=f);c>a.max[1]&&(a.max[1]=c)};this.setup=function(){this.el.css({overflow:"hidden",width:a.max[0],height:this.items.first().outerHeight()});this.ul.css({width:100*this.items.length+"%",position:"relative"});this.items.css("width",100/this.items.length+"%");this.opts.delay!==d&&(this.start(),this.el.hover(this.stop,this.start));this.opts.keys&&e(document).keydown(this.keys);this.opts.dots&&this.dots();if(this.opts.fluid){var b=function(){a.el.css("width",Math.min(Math.round(a.el.outerWidth()/a.el.parent().outerWidth()*100),100)+"%")};b();e(window).resize(b)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">\u00e2\u2020\u0090</span><span class="next">\u00e2\u2020\u2019</span></p>').find(".arrows span").click(function(){e.isFunction(a[this.className])&&a[this.className]()});if(e.event.swipe)this.el.on("swipeleft",a.prev).on("swiperight",a.next)};this.move=function(b,c){this.items.eq(b).length||(b=0);0>b&&(b=this.items.length-1);var f={height:this.items.eq(b).outerHeight()},d=c?5:this.opts.speed;this.ul.is(":animated")||(a.el.find(".dot:eq("+b+")").addClass("active").siblings().removeClass("active"),this.el.animate(f,d)&&this.ul.animate(e.extend({left:"-"+b+"00%"},f),d,function(d){a.current=b;e.isFunction(a.opts.complete)&&!c&&a.opts.complete(a.el)}))};this.start=function(){a.interval=setInterval(function(){a.move(a.current+1)},a.opts.delay)};this.stop=function(){a.interval=clearInterval(a.interval);return a};this.keys=function(b){b=b.which;var c={37:a.prev,39:a.next,27:a.stop};if(e.isFunction(c[b]))c[b]()};this.next=function(){return a.stop().move(a.current+1)};this.prev=function(){return a.stop().move(a.current-1)};this.dots=function(){var b='<ol class="dots">';e.each(this.items,function(a){b+='<li class="dot'+(1>a?" active":"")+'">'+(a+1)+"</li>"});b+="</ol>";this.el.addClass("has-dots").append(b).find(".dot").click(function(){a.move(e(this).index())})}};e.fn.unslider=function(a){var b=this.length;return this.each(function(c){var d=e(this),g=(new h).init(d,a);d.data("unslider"+(1<b?"-"+(c+1):""),g)})}})(window.jQuery,!1);

function optimizeImg(lowResUrl, htmlSectionId, imageIndex) {
    switch (htmlSectionId) {
        case 'mainSliderArea':
            return lowResUrl.replace('s72-c', 's1600');
        case 'recent1Area':
        case 'recent2Area':
            return lowResUrl.replace('s72-c', 's300');
        case 'recent5Area':
        case 'recent6Area':
            if (imageIndex == 1) {
                return lowResUrl.replace('s72-c', 's300');
            }
            break;
    }
    return lowResUrl;
}

function labelthumbs(json, categoryNeeded, htmlElement, params) {
    var showpostthumbnails = params.showpostthumbnails;
    var displaymore = params.displaymore;
    var displayseparator = params.displayseparator;
    var showcommentnum = params.showcommentnum;
    var showpostdate = params.showpostdate;
    var showpostsummary = params.showpostsummary;
    var numchars = params.numchars;
    var MaxNeedPosts = params.numposts;
    var countNeedPosts = 0;
    var displayHtml = '<ul id="label_with_thumbs">';
    var entryList = json.feed.entry;
    for (var t = 0; t < entryList.length; ++t) {
        var n = entryList[t];
        if (!n) continue;
        var foundItem = false;
        var categories = n.category;
        for (var indexCat = 0; indexCat < categories.length; ++indexCat) {
            if (categories[indexCat].term == categoryNeeded) {
                foundItem = true;
                break;
            }
        }
        if (!foundItem) continue;
        ++countNeedPosts;
        var r = n.title.$t;
        var i, u, f;
        if (t == entryList.length) break;
        for (var o = 0; o < n.link.length; ++o) {
            var linkObj = n.link[o];
            if (linkObj.rel == "replies" && linkObj.type == "text/html") {
                u = linkObj.title;
                f = linkObj.href;
            } else if (linkObj.rel == "alternate") {
                i = linkObj.href;
                break;
            }
        }
        var thumb = n.media$thumbnail;
        var l = (thumb && thumb.url) ? thumb.url : "http://goo.gl/LsGgtD";
        l = optimizeImg(l, htmlElement.id, countNeedPosts);
        var p = n.published.$t;
        var v = p.substring(0, 4);
        var m = p.substring(5, 7);
        var g = p.substring(8, 10);
        var y = new Array;
        y[1] = "Jan";
        y[2] = "Feb";
        y[3] = "Mar";
        y[4] = "Apr";
        y[5] = "May";
        y[6] = "June";
        y[7] = "July";
        y[8] = "Aug";
        y[9] = "Sept";
        y[10] = "Oct";
        y[11] = "Nov";
        y[12] = "Dec";
        displayHtml += '<li class="recent-box">';
        if (showpostthumbnails == true) displayHtml += '<div class="imageContainer"><a href="' + i + '"><img class="label_thumb" src="' + l + '" title="' + r + '" alt="' + r + '"/></a></div>';
        displayHtml += '<a class="label_title" href="' + i + '">' + r + "</a>";
        var w = "";
        var E = 0;
        p = n.published.$t;
        var S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var x = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var T = p.split("-")[2].substring(0, 2);
        var N = p.split("-")[1];
        var C = p.split("-")[0];
        for (var k = 0; k < S.length; ++k) {
            if (parseInt(N) == S[k]) {
                N = x[k];
                break;
            }
        }
        var L = T + " " + N + " " + C;
        if (showpostdate == true) {
            displayHtml += '<div class="toe"><a href="' + i + '" class="post-date">' + L + "</a>";
        }
        if (showcommentnum == true) {
            if (E == 1) {
                w = w + " | "
            }
            if (u == "1 Comments") u = "1 Comment";
            if (u == "0 Comments") u = "No Comments";
            w = w + u;
            E = 1;
            displayHtml += '<a class="recent-com" href="' + f + '">' + u + "</a></div>";
        }
        var A = '';
        if ("content" in n) {
            A = n.content.$t;
        } else if ("summary" in n) {
            A = n.summary.$t;
        }
        A = A.replace(/<\S[^>]*>/g, "");
        if (showpostsummary == true) {
            if (A.length < numchars) {
                displayHtml += A;
            } else {
                A = A.substring(0, numchars);
                var M = A.lastIndexOf(" ");
                A = A.substring(0, M);
                displayHtml += '<p class="post-summary">' + A + "...</p>";
            }
        }
        displayHtml += "</li>";
        if (MaxNeedPosts == countNeedPosts) break;
    }
    displayHtml += "</ul>";
    htmlElement.innerHTML = displayHtml;
}

function LoadInfo() {
    if (!$('#mainSlider').length) return;
    var recentlyPostUrl = '/feeds/posts/default?orderby=published&alt=json&max-results=70';
    $.getJSON(recentlyPostUrl, function(data) {
        var paramsMainSlider = {
            numposts: 5,
            showpostthumbnails: true,
            displaymore: false,
            displayseparator: true,
            showcommentnum: false,
            showpostdate: false,
            showpostsummary: false,
            numchars: 100
        };
        labelthumbs(data, $('#mainSlider').val(), $('#mainSliderArea')[0], paramsMainSlider);
        $('.slider').unslider({
            speed: 500,
            delay: 3000,
            complete: function() {},
            keys: true,
            dots: true,
            fluid: false
        });
        $("<div class='slideraro'><a class='unslider-arrow prev'></a><a class='unslider-arrow next'></a></div>").insertBefore(".slider ul#label_with_thumbs");
        var unslider = $('.slider').unslider();
        $('.unslider-arrow').click(function() {
            var fn = this.className.split(' ')[1];
            unslider.data('unslider')[fn]();
        });
        $(window).bind("load", function() {
            $('.slider, .cover').css("visibility", "visible");
        });
        labelthumbs(data, $('#recent1Category').val(), $('#recent1Area')[0], {
            numposts: 4,
            showpostthumbnails: true,
            showcommentnum: false,
            showpostdate: true,
            showpostsummary: false,
            numchars: 100
        });
        labelthumbs(data, $('#recent2Category').val(), $('#recent2Area')[0], {
            numposts: 2,
            showpostthumbnails: true,
            showcommentnum: false,
            showpostdate: true,
            showpostsummary: false,
            numchars: 100
        });
        labelthumbs(data, $('#recent3Category').val(), $('#recent3Area')[0], {
            numposts: 6,
            showpostthumbnails: true,
            showcommentnum: false,
            showpostdate: true,
            showpostsummary: false,
            numchars: 100
        });
        labelthumbs(data, $('#recent5Category').val(), $('#recent5Area')[0], {
            numposts: 5,
            showpostthumbnails: true,
            showcommentnum: false,
            showpostdate: true,
            showpostsummary: true,
            numchars: 150
        });
        labelthumbs(data, $('#recent6Category').val(), $('#recent6Area')[0], {
            numposts: 5,
            showpostthumbnails: true,
            showcommentnum: false,
            showpostdate: true,
            showpostsummary: true,
            numchars: 150
        });

		$(".imageContainer img").resizeToParent();
		updateLink($('#main-wrapper a').toArray());
    });
}

//-----------------------------------------------------------------------
//Run Script Main/Search/Label page
//Seperate if else before we need content page JavaScript process first.
if(!isContentPage){
	document.getElementById("overbg").classList.remove('item');
	LoadInfo();	
	
	//For label page.
    $('#Blog1 .imageContainer .post-thumbnail').attr('src', function(i, src) {
        return src.replace('s72-c', 's1600');
    });
	$(".imageContainer img").resizeToParent();
}

//----------------------------------------------------
// All Page Last section
function stickySidebar() {
    var b = $("#main-wrapper"),
        a = b.offset().top,
		endOfContentPosition = $('.post-footer').offset().top,
        c = $("#HTML3"),
        d = c.height(),
        e = a - d,
        f = b.height() + e,
        g = a + $("#HTML8").height();
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
		
		//FB Comment Section
		if(!isInitFB && scroll > endOfContentPosition){
			initFB();
		}
		
        f = b.height() + e;
        scroll < g ? c.css({
            position: "relative"
        }) : scroll > f ? c.css({
            position: "absolute",
            bottom: "0",
            top: "auto"
        }) : c.css({
            position: "fixed",
            top: "0",
            height: d + "px"
        })
    })
};

function searchButtonHandler(){
	
	if($("#sBox").length === 0){
		//Append Search Box only first time click.
		var searchBoxHtml = "<div id='sBox' style='position:absolute;top:-80px;width:100%'><form action='/search'><input id='sT' name='q' placeholder='Search' size='40' type='text'style='border:0;font-size:16px;height:36px;padding:0 9px;width:100%;float:left'/></form><button id='delBtn' style='font-size:1.5em;position:absolute;right:0;height:36px'>✖️</button></div>";
		$("#sbar").append(searchBoxHtml);
		
		//Handle del button only once.
		$("#delBtn").click(function() {
			$("#sBox").animate({
				top: "-80px"
			})
		});
	}
	
		
	$("#sBox").animate({
		top: "0px"
	});
	$("#sT").focus()
}

function initWidgetManager() {
	if(isInitWidget)return;
	var urlScript = 'https://www.blogger.com/static/v1/widgets/1171408283-widgets.js';
	$.getScript(urlScript, function() {
		var blogId = $('#b').val();
		var sendInfoUrl = '\/\/www.blogger.com/rearrange?blogID\x3d' + blogId;
		var currentUrl = '\/\/' + window.location.host + window.location.pathname;
		
		var c = [sendInfoUrl,currentUrl,blogId];
		_WidgetManager._Init(c[0], c[1], c[2] + ""), _WidgetManager._RegisterWidget('_ContactFormView', new _WidgetInfo('ContactForm2', 'ft4', document.getElementById('ContactForm2'), {
			'contactFormMessageSendingMsg': 'Sending...', 
			'contactFormMessageSentMsg': 'Text Sent', 
			'contactFormMessageNotSentMsg': 'Messages can not be sent. Please try again later.', 
			'contactFormInvalidEmailMsg': 'Email address must be specified correctly.', 
			'contactFormEmptyMessageMsg': 'Message can not be empty.', 
			'title': 'Contact Form', 
			'blogId': blogId, 
			'contactFormNameMsg': 'Name', 
			'contactFormEmailMsg': 'Email', 
			'contactFormMessageMsg': 'Message', 
			'contactFormSendMsg': 'Sent', 
			'submitUrl': 'https://www.blogger.com/contact-form.do'}, 'displayModeFull'));
		isInitWidget = true;
    });
}

//-----------------------------------------------------------------------
//Run Script All page Last section
if (1200 < windowWidth) {
	-1 != window.location.href.indexOf("?m=1") || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || stickySidebar();
}

$("#sBtn").click(searchButtonHandler);


$('#ft4').click(initWidgetManager);

$(".error_page #main-wrapper").prepend('<div class="error-title"><span>404</span>');
