/*
(isContentPage)|(addWidgets)|(updateLink)|(optimizeLink)|(optimizeImg)|(labelthumbs)|(LoadInfo)|(handleImg)|(initFB)|(stickyFB)|(getRecentPost)|(stickySidebar)|(findScriptSection)|(deferWidgetManager)
(?1A)(?2B)(?3C)(?4D)(?5E)(?6F)(?7G)(?8H)(?9I)(?10J)(?11K)(?12L)(?13M)(?14N)
*/
//==================All Page First section==================
var isContentPage = document.getElementById('isContent').value == '1';
var windowWidth = 0 < window.innerWidth ? window.innerWidth : screen.width;

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
		
		//check img for add <img> or <div class="p1"></div>
		if(allInfo[indexImg].length > 0){
			recentlyHtml += '<li><div class="p"><a href="'+allInfo[indexLink]+'"><img alt="" border="0" height="72" src="'+allInfo[indexImg]+'" width="72"/></a></div><div class="t"><a href="'+allInfo[indexLink]+'">'+allInfo[indexTitle]+'</a></div><div class="c"></div></li>';
		}else{
			recentlyHtml += '<li><div class="p"><a href="'+allInfo[indexLink]+'"><div class="p'+(++popIndex)+'"></div></a></div><div class="t"><a href="'+allInfo[indexLink]+'">'+allInfo[indexTitle]+'</a></div><div class="c"></div></li>';
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
		+'<ul class="wc pp"><li><div class="p"><a href="/2017/02/front-garden-designs.html"><div class="p1"></div></a></div><div class="t"><a href="/2017/02/front-garden-designs.html">วิธีจัดสวนหน้าบ้านสวยๆ ประหยัดงบ พร้อม 65 แบบสวนสวย</a></div><div class="c"/></li><li><div class="p"><a href="/2017/09/20-modern-two-story-house-design-ideas.html"><div class="p2"></div></a></div><div class="t"><a href="/2017/09/20-modern-two-story-house-design-ideas.html">20 แบบบ้าน 2 ชั้นสวยๆ สไตล์โมเดิร์น มาหาบ้านที่ชอบกัน</a></div><div class="c"/></li><li><div class="p"><a href="/2017/04/2-bedrooms-cozy-condo-interior.html"><div class="p3"></div></a></div><div class="t"><a href="/2017/04/2-bedrooms-cozy-condo-interior.html">แต่งคอนโดสวยๆ 2 ห้องนอน น่าอยู่มากๆ (รูปเยอะ)</a></div><div class="c"/></li><li><div class="p"><a href="/2017/02/61-small-kitchen-designs.html"><div class="p4"></div></a></div><div class="t"><a href="/2017/02/61-small-kitchen-designs.html">61 แบบห้องครัวขนาดเล็ก ห้องครัวเล็กๆก็สวยได้</a></div><div class="c"/></li><li><div class="p"><a href="/2017/09/47-garden-condo-ideas.html"><div class="p5"></div></a></div><div class="t"><a href="/2017/09/47-garden-condo-ideas.html">47 ไอเดียจัดสวนคอนโด พื้นที่น้อยก็สวยได้</a></div><div class="c"/></li></ul>';
	var html2 = getRecentPost();
	var html7 = "<h2>สีห้อง</h2><div class='wc ll i'><a href='/search/label/โทนสีครีม'><b style='color:#FDA'>◼︎ </b>สีครีม</a><a href='/search/label/โทนสีชมพู'><b style='color:#F6B'>◼︎ </b>สีชมพู</a><a href='/search/label/โทนสีดำ'><b style='color:#000'>◼︎ </b>สีดำ</a><a href='/search/label/โทนสีฟ้า'><b style='color:#0FF'>◼︎ </b>สีฟ้า</a><a href='/search/label/โทนสีม่วง'><b style='color:#93C'>◼︎ </b>สีม่วง</a><a href='/search/label/โทนสีเขียว'><b style='color:#0F0'>◼︎ </b>สีเขียว</a></div>";
	var html12 = "<div class='wc'><div class='g-person' data-width='273' data-href='//plus.google.com/100314722402868942661' data-layout='landscape' data-rel='author'></div></div>";
	
	var sidebarHtml = '<div class="widget" id="HTML6">'+html6+'</div>'
											+ '<div class="section" id="sidebarRight"><div class="widget HTML" data-version="1" id="HTML2">'+html2+'</div></div>'
											+ '<div class="widget" id="HTML7">'+html7+'</div>'
											+ '<div class="widget" id="HTML12">'+html12+'</div>';

											
	//Check display screen fore
	var htmlLeftSidebar = "<h2>แต่งบ้าน</h2><div class='wc ll i'><a href='/search/label/ห้องนอน'><b>💤 </b>ห้องนอน</a><a href='/search/label/ห้องนอนเด็ก'><b>👶 </b>ห้องนอนเด็ก</a><a href='/search/label/ห้องนั่งเล่น'><b>📺 </b>ห้องนั่งเล่น</a><a href='/search/label/แบบตู้เสื้อผ้า'><b>👕 </b>ตู้เสื้อผ้า</a><a href='/search/label/เก้าอี้และโซฟา'><b>💺 </b>เก้าอี้และโซฟา</a><a href='/search/label/ชั้นหนังสือ'><b>📚 </b>ชั้นหนังสือ</a><a href='/search/label/แต่งผนัง'><b>🎨 </b>แต่งผนัง</a><a href='/search/label/แบบโฮมออฟฟิศ'><b>🏢 </b>แบบโฮมออฟฟิศ</a><a href='/search/label/สวนสวย'><b>🌷 </b>สวนสวย</a><a href='/search/label/ห้องน้ำ'><b>🚽 </b>ห้องน้ำ</a><a href='/search/label/แบบห้องครัว'><b>🍴 </b>แบบห้องครัว</a></div>";
	if(windowWidth>1200){
		document.getElementById('HTML8').innerHTML = optimizeLink(htmlLeftSidebar);
	}else{
		sidebarHtml += "<div id='sb3'><div id='sb2' class='sidebar'><div class='widget' id='HTML9'>"+htmlLeftSidebar+"</div></div></div>"
	}
	document.getElementById('sb').innerHTML = optimizeLink(sidebarHtml);
	
	
	//Footer
	var footerHtml = "<div id='f' class='woo'><div class='ft'><div class='widget' id='HTML4'><h2>Home Decor</h2><div class='cl i'><span><a href='/search/label/ตู้วางทีวี'><b>📺 </b>ต&#3641;&#3657;วางท&#3637;ว&#3637;</a></span><span><a href='/search/label/โรงรถ'><b>🚗 </b>โรงรถ</a></span><span><a href='/search/label/สนามหญ้า'><b>🌿 </b>สนามหญ&#3657;า</a></span><span><a href='/search/label/สวนแนวตั้ง'><b>🌱 </b>สวนแนวต&#3633;&#3657;ง</a></span><span><a href='/search/label/ห้องพระ'><b>🙏 </b>ห&#3657;องพระ</a></span><span><a href='/search/label/บ่อปลา'><b>&#9970; </b>สระน&#3657;ำ</a></span><span><a href='/search/label/พรม'><b>👣 </b>พรม</a></span><span><a href='/search/label/เครื่องใช้ไฟฟ้า'><b>🔌 </b>เคร&#3639;&#3656;องใช&#3657;ไฟฟ&#3657;า</a></span><span><a href='/search/label/ซ่อมบ้าน'><b>🔧 </b>ซ&#3656;อมบ&#3657;าน</a></span></div></div></div>"
		+ "<div class='ft'><div class='widget' id='HTML5'><h2>Month's Popular Posts</h2><div class='pp'>"
		+ '<ul><li><div class="p"><a href="/2017/02/42-small-front-yard-ideas.html"><div class="p11"></div></a></div><div class="t"><a href="/2017/02/42-small-front-yard-ideas.html">42 ไอเดียจัดสวนหน้าบ้าน พื้นที่น้อยๆ</a></div><div class="c"/></li><li><div class="p"><a href="/2017/10/30-kitchen-ideas-for-one-floor-house.html"><div class="p12"></div></a></div><div class="t"><a href="/2017/10/30-kitchen-ideas-for-one-floor-house.html">30 แบบห้องครัวบ้านชั้นเดียว หาไอเดียที่ถูกใจกัน</a></div><div class="c"/></li><li><div class="p"><a href="/2017/04/cozy-white-condo-interior.html"><div class="p13"></div></a></div><div class="t"><a href="/2017/04/cozy-white-condo-interior.html">แบบแต่งคอนโดสวยๆ เน้นสีขาว สวยงาม น่าอยู่</a></div><div class="c"/></li></ul>'
		+ "</div></div></div><div class='ft'><div class='widget' id='HTML9'><h2>More Topics</h2><div class='cl'><span><a href='/search/label/IKEA'>IKEA</a></span><span><a href='/search/label/SB Design Square'>SB</a></span><span><a href='/search/label/การเลือกซื้อบ้าน'>เล&#3639;อกซ&#3639;&#3657;อบ&#3657;าน</a></span><span><a href='/search/label/คอนโด'>คอนโด</a></span><span><a href='/search/label/ตากผ้า'>ตากผ&#3657;า</a></span><span><a href='/search/label/บันได'>บ&#3633;นได</a></span><span><a href='/search/label/บ้านชั้นเดียว'>บ&#3657;านช&#3633;&#3657;นเด&#3637;ยว</a></span><span><a href='/search/label/ม่าน'>ม&#3656;าน</a></span><span><a href='/search/label/วางแผนการเงิน'>แผนการเง&#3636;น</a></span><span><a href='/search/label/เครื่องซักผ้า'>เคร&#3639;&#3656;องซ&#3633;กผ&#3657;า</a></span><span><a href='/search/label/แต่งบ้าน'>แต&#3656;งบ&#3657;าน</a></span></div></div></div><div class='ft'><div id='ft4'><div class='widget ContactForm' id='ContactForm2'><h2>Contact Us</h2><form name='contact-form'><p></p>ช&#3639;&#3656;อ<br/><input class='cf' id='ContactForm2_contact-form-name' name='name' size='30' type='text' value=''/><p></p>อ&#3637;เมล<b>*</b><br/><input class='cf' id='ContactForm2_contact-form-email' name='email' size='30' type='text' value=''/><p></p>ข&#3657;อความ<b>*</b><br/><textarea class='cf' cols='25' id='ContactForm2_contact-form-email-message' name='email-message' rows='5'></textarea><p></p><input class='cfb' id='ContactForm2_contact-form-submit' type='button' value='ส่ง'/><p></p><div style='text-align:center;max-width:222px;width:100%'><p class='contact-form-error-message' id='ContactForm2_contact-form-error-message'></p><p class='contact-form-success-message' id='ContactForm2_contact-form-success-message'></p></div></form></div></div></div></div>"
		+ "<div id='cr' class='woo'><p><a href='https://buildsweethome.blogspot.com/'>Build Sweet Home</a> &#169; 2018 All rights reserved.  สงวนล&#3636;ขส&#3636;ทธ&#3636;&#3660;เน&#3639;&#3657;อหาเว&#3655;บไซต&#3660; ห&#3657;ามค&#3633;ดลอก เผยแพร&#3656;ก&#3656;อนได&#3657;ร&#3633;บอน&#3640;ญาต | Theme by <a href='http://www.templateism.com' rel='nofollow'>Templateism</a></div></div></div>";
		document.getElementById('fc').innerHTML = optimizeLink(footerHtml);
}

//Init facebook need to finally ASAP due to slowest result cause effect.
function initFB(){
	//Init Facebook if combine files was loaded that means facebook sdk is alreaded.
	window.fbAsyncInit = function() {
    FB.init({
		appId : document.querySelector("meta[property='fb:app_id']").getAttribute("content"),
		xfbml      : true,
		version    : 'v3.1'
    });
  };
}
initFB();
addWidgets();

//===================Content Page=============================
function handleImg() {
	$('[id^=adMid_] a:has(img)').click(function(){return false;});
}

function stickyFB(windowWidth) {
    if (windowWidth > 1200) return;
    var mainContent = $('#main-wrapper .post-body'),
        mainTop = mainContent.offset().top,
        socialFloat = $('.fb'),
        socialHeight = socialFloat.height(),
        calScrollLength = mainTop + 235,
        scrollLength = mainContent.height() + calScrollLength,
        marginLeft = '0';
    if (windowWidth > 440) marginLeft = '-25px';
    else if (windowWidth > 320) marginLeft = '-15px';
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        scrollLength = mainContent.height() + calScrollLength;
        if (scroll >= mainTop && scroll <= scrollLength) {
            socialFloat.css({
                'position': 'fixed',
                'top': '10px',
                'margin-left': marginLeft,
                'height': (socialHeight + 'px')
            });
        } else {
            socialFloat.css({
                'position': 'relative',
                'top': 0,
                'margin-left': 0
            });
        }
    });
}

//-----------------------------------------------------------------------
//Run Script Content Page
if(isContentPage){
	handleImg();
	stickyFB(windowWidth);
	
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

//init function resizeToParent
(function(e){e.fn.resizeToParent=function(t){function r(e){e.css({width:"",height:"","margin-left":"","margin-top":""});var n=e.parents(t.parent).width();var r=e.parents(t.parent).height();var i=e.width();var s=e.height();var o=i/n;if(s/o<r){e.css({width:"auto",height:r});i=i/(s/r);s=r}else{e.css({height:"auto",width:n});i=n;s=s/o}var u=(i-n)/-2;var a=(s-r)/-2;e.css({"margin-left":u,"margin-top":a})}var n={parent:"div",delay:100};var t=e.extend(n,t);var i;var s=this;e(window).on("resize",function(){clearTimeout(i);i=setTimeout(function(){s.each(function(){r(e(this))})},t.delay)});return this.each(function(){var t=e(this);t.attr("src",t.attr("src"));t.load(function(){r(t)});if(this.complete){r(t)}})}})(jQuery);

//-----------------------------------------------------------------------
//Run Script Main/Search/Label page
//Seperate if else before we need content page JavaScript process first.
if(!isContentPage){
	document.getElementById("overbg").classList.remove('item');
	LoadInfo();
	
    (function(e, t) {
        if (!e) return t;
        var n = function() {
            this.el = t;
            this.items = t;
            this.sizes = [];
            this.max = [0, 0];
            this.current = 0;
            this.interval = t;
            this.opts = {
                speed: 500,
                delay: 3e3,
                complete: t,
                keys: !t,
                dots: t,
                fluid: t
            };
            var n = this;
            this.init = function(t, n) {
                this.el = t;
                this.ul = t.children("ul");
                this.max = [t.outerWidth(), t.outerHeight()];
                this.items = this.ul.children("li").each(this.calculate);
                this.opts = e.extend(this.opts, n);
                this.setup();
                return this
            };
            this.calculate = function(t) {
                var r = e(this),
                    i = r.outerWidth(),
                    s = r.outerHeight();
                n.sizes[t] = [i, s];
                if (i > n.max[0]) n.max[0] = i;
                if (s > n.max[1]) n.max[1] = s
            };
            this.setup = function() {
                this.el.css({
                    overflow: "hidden",
                    width: n.max[0],
                    height: this.items.first().outerHeight()
                });
                this.ul.css({
                    width: this.items.length * 100 + "%",
                    position: "relative"
                });
                this.items.css("width", 100 / this.items.length + "%");
                if (this.opts.delay !== t) {
                    this.start();
                    this.el.hover(this.stop, this.start)
                }
                this.opts.keys && e(document).keydown(this.keys);
                this.opts.dots && this.dots();
                if (this.opts.fluid) {
                    var r = function() {
                        n.el.css("width", Math.min(Math.round(n.el.outerWidth() / n.el.parent().outerWidth() * 100), 100) + "%")
                    };
                    r();
                    e(window).resize(r)
                }
                if (this.opts.arrows) {
                    this.el.parent().append('<p class="arrows"><span class="prev">â†</span><span class="next">â†’</span></p>').find(".arrows span").click(function() {
                        e.isFunction(n[this.className]) && n[this.className]()
                    })
                }
                if (e.event.swipe) {
                    this.el.on("swipeleft", n.prev).on("swiperight", n.next)
                }
            };
            this.move = function(t, r) {
                if (!this.items.eq(t).length) t = 0;
                if (t < 0) t = this.items.length - 1;
                var i = this.items.eq(t);
                var s = {
                    height: i.outerHeight()
                };
                var o = r ? 5 : this.opts.speed;
                if (!this.ul.is(":animated")) {
                    n.el.find(".dot:eq(" + t + ")").addClass("active").siblings().removeClass("active");
                    this.el.animate(s, o) && this.ul.animate(e.extend({
                        left: "-" + t + "00%"
                    }, s), o, function(i) {
                        n.current = t;
                        e.isFunction(n.opts.complete) && !r && n.opts.complete(n.el)
                    })
                }
            };
            this.start = function() {
                n.interval = setInterval(function() {
                    n.move(n.current + 1)
                }, n.opts.delay)
            };
            this.stop = function() {
                n.interval = clearInterval(n.interval);
                return n
            };
            this.keys = function(t) {
                var r = t.which;
                var i = {
                    37: n.prev,
                    39: n.next,
                    27: n.stop
                };
                if (e.isFunction(i[r])) {
                    i[r]()
                }
            };
            this.next = function() {
                return n.stop().move(n.current + 1)
            };
            this.prev = function() {
                return n.stop().move(n.current - 1)
            };
            this.dots = function() {
                var t = '<ol class="dots">';
                e.each(this.items, function(e) {
                    t += '<li class="dot' + (e < 1 ? " active" : "") + '">' + (e + 1) + "</li>"
                });
                t += "</ol>";
                this.el.addClass("has-dots").append(t).find(".dot").click(function() {
                    n.move(e(this).index())
                })
            }
        };
        e.fn.unslider = function(t) {
            var r = this.length;
            return this.each(function(i) {
                var s = e(this);
                var u = (new n).init(s, t);
                s.data("unslider" + (r > 1 ? "-" + (i + 1) : ""), u)
            })
        }
    })(window.jQuery, false)
    
	
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
        c = $("#HTML3"),
        d = c.height(),
        e = a - d,
        f = b.height() + e,
        g = a + $("#HTML8").height();
    $(window).scroll(function() {
        var a = $(this).scrollTop();
        f = b.height() + e;
        a < g ? c.css({
            position: "relative"
        }) : a > f ? c.css({
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

function findScriptSection() {
	var blogId = $('#b').val();
	var sendInfoUrl = '\/\/www.blogger.com/rearrange?blogID\x3d' + blogId;
	var currentUrl = '\/\/' + window.location.host + window.location.pathname;
	
	var c = [sendInfoUrl,currentUrl,blogId];
	_WidgetManager._Init(c[0], c[1], c[2] + ""), _WidgetManager._RegisterWidget('_ContactFormView', new _WidgetInfo('ContactForm2', 'ft4', document.getElementById('ContactForm2'), {
		'contactFormMessageSendingMsg': 'กำลังส่ง...', 
		'contactFormMessageSentMsg': 'ส่งข้อความแล้ว', 
		'contactFormMessageNotSentMsg': 'ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้งในภายหลัง', 
		'contactFormInvalidEmailMsg': 'ต้องระบุที่อยู่อีเมล์ให้ถูกต้อง', 
		'contactFormEmptyMessageMsg': 'ข้อความต้องไม่เว้นว่าง', 'title': 'ฟอร์มรายชื่อติดต่อ', 
		'blogId': blogId, 'contactFormNameMsg': 'ชื่อ', 'contactFormEmailMsg': 'อีเมล์', 
		'contactFormMessageMsg': 'ข้อความ', 'contactFormSendMsg': 'ส่ง', 'submitUrl': 'https://www.blogger.com/contact-form.do'}, 'displayModeFull'));
}

//-----------------------------------------------------------------------
//Run Script All page Last section
if (1200 < windowWidth) {
	-1 != window.location.href.indexOf("?m=1") || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || stickySidebar();
}
$("#sBtn").click(function() {
	$("#sBox").animate({
		top: "0px"
	});
	$("#sT").focus()
});
$(".del").click(function() {
	$("#sBox").animate({
		top: "-80px"
	})
});
$(".error_page #main-wrapper").prepend('<div class="error-title"><span>404</span>');

//WidgetMangaer we need to wait blog widget.js that just email only.
function deferWidgetManager(a){window._WidgetManager?a():setTimeout(function(){deferWidgetManager(a)},5)}
deferWidgetManager(findScriptSection);


