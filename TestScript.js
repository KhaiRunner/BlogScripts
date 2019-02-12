/*
(isContentPage)|(windowWidth)|(initFB)|(getRecentPost)|(updateLink)|(optimizeLink)|(addWidgets)|(handleImg)|(stickyFB)|(stickySidebar)|(initWidgetManager)|(isInitWidget)|(isInitFB)|(openNewWindow)|(initSocialButtons)|(initMenu)|(searchButtonHandler)
(?1A)(?2B)(?3C)(?4D)(?5E)(?6F)(?7G)(?8H)(?9I)(?10J)(?11K)(?12L)(?13M)(?14N)(?15O)(?16P)(?17Q)
*/
//==================All Page First section==================
var isContentPage = document.getElementById('isContent') == null;
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


function initWidgetManager() {
	if(isInitWidget)return;
	var urlScript = 'https://www.blogger.com/static/v1/widgets/1171408283-widgets.js';
	$.getScript(urlScript, function() {
		var blogInfo = $('link[rel="service.post"]').attr('href').split('/');
		var blogId = blogInfo[blogInfo.length-3];
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

function addWidgets(){
	var recentlyImageUrl = document.getElementById('r').value;
	var recentlyInfo = '.p1,.p2,.p3,.p4,.p5,.p6,.p7,.p8,.p9,.p10,.p11,.p12,.p13,.p14{background:url('+ recentlyImageUrl +');width:72px;height:72px}';
	
	var htmlWeeklyPop = '<style>' + recentlyInfo + '.sb .wc{padding:9px}.sb h2{background-color:#7A5;color:#FFF;display:inline-block;font-size:13px;padding:8px}.ll a{display:block;padding:0 0 12px}.cl a{float:left;background-color:#222;padding:5px 9px;margin:4px}.gp{height:72px}.pp li{list-style:none;display:inline-block}.pp .p{float:left;margin:0 5px 10px 0}.pp .t{line-height:21px}.i b{font-size:17px}.p1{background-position:0 0}.p2{background-position:0 -72px}.p3{background-position:0 -144px}.p4{background-position:0 -216px}.p5{background-position:0 -288px}.p6{background-position:0 -360px}.p7{background-position:0 -432px}.p8{background-position:0 -504px}.p9{background-position:0 -576px}.p10{background-position:0 -648px}.p11{background-position:0 -720px}.p12{background-position:0 -792px}.p13{background-position:0 -864px}.p14{background-position:0 -936px}</style>'
		+ '<div class="widget"><h2>Weekly Popular Posts</h2>'
		+'<ul class="wc pp"><li><a class="p p1" href="/2017/02/front-garden-designs.html"/><a class="t" href="/2017/02/front-garden-designs.html">วิธีจัดสวนหน้าบ้านสวยๆ ประหยัดงบ พร้อม 65 แบบสวนสวย</a></li><li><a class="p p2" href="/2017/09/20-modern-two-story-house-design-ideas.html"/><a class="t" href="/2017/09/20-modern-two-story-house-design-ideas.html">20 แบบบ้าน 2 ชั้นสวยๆ สไตล์โมเดิร์น มาหาบ้านที่ชอบกัน</a></li><li><a class="p p3" href="/2017/04/2-bedrooms-cozy-condo-interior.html"/><a class="t" href="/2017/04/2-bedrooms-cozy-condo-interior.html">แต่งคอนโดสวยๆ 2 ห้องนอน น่าอยู่มากๆ (รูปเยอะ)</a></li><li><a class="p p4" href="/2017/02/61-small-kitchen-designs.html"/><a class="t" href="/2017/02/61-small-kitchen-designs.html">61 แบบห้องครัวขนาดเล็ก ห้องครัวเล็กๆก็สวยได้</a></li><li><a class="p p5" href="/2017/09/47-garden-condo-ideas.html"/><a class="t" href="/2017/09/47-garden-condo-ideas.html">47 ไอเดียจัดสวนคอนโด พื้นที่น้อยก็สวยได้</a></li></ul>'
		+'</div>';
	var htmlRecently = '<div class="widget">'+ getRecentPost() +'</div>';
	var htmlColor = "<h2>สีห้อง</h2><div class='wc ll i'><a href='/search/label/โทนสีครีม'><b style='color:#FDA'>◼︎ </b>สีครีม</a><a href='/search/label/โทนสีชมพู'><b style='color:#F6B'>◼︎ </b>สีชมพู</a><a href='/search/label/โทนสีดำ'><b style='color:#000'>◼︎ </b>สีดำ</a><a href='/search/label/โทนสีฟ้า'><b style='color:#0FF'>◼︎ </b>สีฟ้า</a><a href='/search/label/โทนสีม่วง'><b style='color:#93C'>◼︎ </b>สีม่วง</a><a href='/search/label/โทนสีเขียว'><b style='color:#0F0'>◼︎ </b>สีเขียว</a></div>";
	var htmlGplus = "<div class='p14'></div><div><h3> &nbsp; Khai Runner</h3><a href='https://plus.google.com/+KhaiRunner' target='_blank'> &nbsp; &nbsp;About Me</a></div>";
	
	//Check display screen for left sidebar
	var htmlLeftSidebar =  "<div class='widget'><h2>แต่งบ้าน</h2><div class='wc ll i'><a href='/search/label/ห้องนอน'><b>💤 </b>ห้องนอน</a><a href='/search/label/ห้องนอนเด็ก'><b>👶 </b>ห้องนอนเด็ก</a><a href='/search/label/ห้องนั่งเล่น'><b>📺 </b>ห้องนั่งเล่น</a><a href='/search/label/แบบตู้เสื้อผ้า'><b>👕 </b>ตู้เสื้อผ้า</a><a href='/search/label/เก้าอี้และโซฟา'><b>💺 </b>เก้าอี้และโซฟา</a><a href='/search/label/ชั้นหนังสือ'><b>📚 </b>ชั้นหนังสือ</a><a href='/search/label/แต่งผนัง'><b>🎨 </b>แต่งผนัง</a><a href='/search/label/แบบโฮมออฟฟิศ'><b>🏢 </b>แบบโฮมออฟฟิศ</a><a href='/search/label/สวนสวย'><b>🌷 </b>สวนสวย</a><a href='/search/label/ห้องน้ำ'><b>🚽 </b>ห้องน้ำ</a><a href='/search/label/แบบห้องครัว'><b>🍴 </b>แบบห้องครัว</a></div></div>"
						+ '<div class="widget">'+htmlColor+'</div>'
						+ '<div class="gp">'+htmlGplus+'</div>';
	
	
	if(windowWidth<911){
		//Stop ad sticky and FB will stick
		//Content after ad will be every widgets.
		htmlLeftSidebar = htmlWeeklyPop + htmlRecently + htmlLeftSidebar;
		document.getElementById('sb3').innerHTML = optimizeLink(htmlLeftSidebar);
	}else{
		//Ad sticky
		//Content before Ad
		document.getElementById('sbC').innerHTML = optimizeLink(htmlWeeklyPop);
		
		//Content after Ad
		var contentAfterAd = htmlRecently;
		if(windowWidth>1200){
			document.getElementById('sb2').innerHTML = optimizeLink(htmlLeftSidebar);
			document.getElementById('sb3').innerHTML = optimizeLink(htmlRecently);
		}else{
			//window Width >= 911 && <=1200
			document.getElementById('sb3').innerHTML = optimizeLink(htmlRecently + htmlLeftSidebar);
		}	
	}	
	
	//Footer
	var footerHtml = "<style>#fc{background-color:#111;color:#FFF}#fc a{color:#BBB}#f .widget{margin:0 15px}#f ul{padding:0}#f h2{border-bottom:5px solid #7A5;font-size:13px;margin-bottom:9px;padding:9px 0}.cf{border:0;background-color:#333;color:#FFF}.cf:focus,.cf:hover{border:0}.cfb{padding:6px}#cr{text-align:center}</style>"
		+ "<div id='f' class='woo'><div class='ft'><div class='widget'><h2>Home Decor</h2><div class='cl i'><a href='/search/label/ตู้วางทีวี'><b>📺 </b>ต&#3641;&#3657;วางท&#3637;ว&#3637;</a><a href='/search/label/โรงรถ'><b>🚗 </b>โรงรถ</a><a href='/search/label/สนามหญ้า'><b>🌿 </b>สนามหญ&#3657;า</a><a href='/search/label/สวนแนวตั้ง'><b>🌱 </b>สวนแนวต&#3633;&#3657;ง</a><a href='/search/label/ห้องพระ'><b>🙏 </b>ห&#3657;องพระ</a><a href='/search/label/บ่อปลา'><b>&#9970; </b>สระน&#3657;ำ</a><a href='/search/label/พรม'><b>👣 </b>พรม</a><a href='/search/label/เครื่องใช้ไฟฟ้า'><b>🔌 </b>เคร&#3639;&#3656;องใช&#3657;ไฟฟ&#3657;า</a><a href='/search/label/ซ่อมบ้าน'><b>🔧 </b>ซ&#3656;อมบ&#3657;าน</a></div></div></div>"
		+ "<div class='ft'><div class='widget'><h2>Month's Popular Posts</h2><div class='pp'>"
		+ '<ul><li><a class="p p11" href="/2017/02/42-small-front-yard-ideas.html"/><a class="t" href="/2017/02/42-small-front-yard-ideas.html">42 ไอเดียจัดสวนหน้าบ้าน พื้นที่น้อยๆ</a></li><li><a class="p p12" href="/2017/10/30-kitchen-ideas-for-one-floor-house.html"/><a class="t" href="/2017/10/30-kitchen-ideas-for-one-floor-house.html">30 แบบห้องครัวบ้านชั้นเดียว หาไอเดียที่ถูกใจกัน</a></li><li><a class="p p13" href="/2017/04/cozy-white-condo-interior.html"/><a class="t" href="/2017/04/cozy-white-condo-interior.html">แบบแต่งคอนโดสวยๆ เน้นสีขาว สวยงาม น่าอยู่</a></li></ul>'
		+ "</div></div></div><div class='ft'><div class='widget'><h2>More Topics</h2><div class='cl'><a href='/search/label/IKEA'>IKEA</a><a href='/search/label/SB Design Square'>SB</a><a href='/search/label/การเลือกซื้อบ้าน'>เล&#3639;อกซ&#3639;&#3657;อบ&#3657;าน</a><a href='/search/label/คอนโด'>คอนโด</a><a href='/search/label/ตากผ้า'>ตากผ&#3657;า</a><a href='/search/label/บันได'>บ&#3633;นได</a><a href='/search/label/บ้านชั้นเดียว'>บ&#3657;านช&#3633;&#3657;นเด&#3637;ยว</a><a href='/search/label/ม่าน'>ม&#3656;าน</a><a href='/search/label/วางแผนการเงิน'>แผนการเง&#3636;น</a><a href='/search/label/เครื่องซักผ้า'>เคร&#3639;&#3656;องซ&#3633;กผ&#3657;า</a><a href='/search/label/แต่งบ้าน'>แต&#3656;งบ&#3657;าน</a></div></div></div><div class='ft'><div id='ft4'><div class='widget ContactForm' id='ContactForm2'><h2>Contact Us</h2><form name='contact-form'>ช&#3639;&#3656;อ<br/><input class='cf' id='ContactForm2_contact-form-name' name='name' size='30' type='text' value=''/><p></p>อ&#3637;เมล*<br/><input class='cf' id='ContactForm2_contact-form-email' name='email' size='30' type='text' value=''/><p></p>ข&#3657;อความ*<br/><textarea class='cf' cols='25' id='ContactForm2_contact-form-email-message' name='email-message' rows='5'></textarea><p></p><input class='cfb' id='ContactForm2_contact-form-submit' type='button' value='ส่ง'/><div style='text-align:center;max-width:222px;width:100%'><p class='contact-form-error-message' id='ContactForm2_contact-form-error-message'></p><p class='contact-form-success-message' id='ContactForm2_contact-form-success-message'></p></div></form></div></div></div></div>"
		+ "<div id='cr' class='woo'><p><a href='https://buildsweethome.blogspot.com/'>Build Sweet Home</a> &#169; 2019 All rights reserved.  สงวนล&#3636;ขส&#3636;ทธ&#3636;&#3660;เน&#3639;&#3657;อหาเว&#3655;บไซต&#3660; ห&#3657;ามค&#3633;ดลอก เผยแพร&#3656;ก&#3656;อนได&#3657;ร&#3633;บอน&#3640;ญาต | Theme by <a href='http://www.templateism.com' rel='nofollow'>Templateism</a></div></div></div>";
		document.getElementById('fc').innerHTML = optimizeLink(footerHtml);
}
//Add widget when display on desktop. For mobile will display later.
if(windowWidth>=911){
	addWidgets();
	$('#ft4').click(initWidgetManager);
}

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
		};
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
    if (width >= 911) return;
    var mainTop = $('#mw .pb').offset().top,
		footerTop = $('#fc').offset().top,
		endOfContentPosition = $('.pf').offset().top,
        socialFloat = $('.soF'),
		topPosition = 0,
        marginLeft = '0';
    if (width > 440) marginLeft = '-25px';
    else if (width > 320) marginLeft = '-15px';
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
		
		//*********Lazy Load*********
		//FB Comment Section
		if(!isInitFB && scroll > endOfContentPosition){
			initFB();
			
			//Add Please share
			$(".soF").append('<div style="padding-top:13px;margin-left:-15px;float:left;background:#FFF">📣 ช่วยแชร์หน่อยนะ 😙🙏</div>');
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
	var url    = 'https://twitter.com/share?text=' + $('.pt').text();
	openNewWindow(url, 'twitter');
    return false;
  });
 
	$('.fb').click(function(){
		
		var url    = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;
		openNewWindow(url, 'Facebook');

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
	var pagerLink = $('a.pre[href=""],a.n[href=""]');
	if(pagerLink.length > 0){
		var message = "This is the oldest post.";
		if(pagerLink.hasClass('n')){
			message = "This is the latest post."
		}
		pagerLink.removeAttr('href');
		pagerLink[0].innerHTML += " <div style='color:#888'>"+message+"</div></a> ";
	}
	
}


//===================Main/Search/Label=============================
// Function Helper for Main & Search moving to HomePage.js
//Run Script Main/Search/Label page
//Seperate if else before we need content page JavaScript process first.
if(!isContentPage){
	
	var homePageAction = function(){
		//LoadInfo will check again for main page.
		HomePageHelper.LoadInfo();
		
		updateLink($('#mw a').toArray());
		HomePageHelper.InitResizeToParent();
		$(".imageContainer img").resizeToParent();
	};
	
	if(typeof HomePageHelper  === 'undefined'){
		var scriptTag = $('script[src*="HomePage"]');
		var loadScriptUrl = scriptTag.length > 0 ? scriptTag.attr('src') : "https://cdn.jsdelivr.net/gh/KhaiRunner/BlogScripts@latest/HomePage.js";
		$.getScript(loadScriptUrl, homePageAction);
	}else{
		homePageAction();
	}
	
	
	
	
	
	//For label page.
    $('#Blog1 .imageContainer .post-thumbnail').attr('src', function(i, src) {
        return src.replace('s72-c', 's1600');
    });
	
}

//----------------------------------------------------
// All Page Last section
function initMenu(){
	var menu = $('#m');
	menu.on('mousedown click', function(){
		if(menu.children().length > 1)return;
		
		menu.append("<option value='/search/label/ห้องนั่งเล่น'>💺 ห้องนั่งเล่น</option><option value='/search/label/ห้องครัว'>🍳 ห้องครัว</option><option value='/search/label/ห้องนอน'>💤 ห้องนอน</option><option value='/search/label/สวนสวย'>💐 สวนสวย</option><option value='/search/label/ห้องน้ำ'>🚽 ห้องน้ำ</option><option value='/'>🏠 กลับหน้าบ้าน</option>");
		menu.attr('onchange', 'location=this.value');
	});
}

function stickySidebar() {
    var mainWrapper = $("#mw"),
        topPos = mainWrapper.offset().top,
		endOfContentPosition = isContentPage ? $('.pf').offset().top : 0,
        html3 = $("#HTML3"),
        html3Height = html3.height(),
        scrollLength = topPos - html3Height,
        stopPos = mainWrapper.height() + scrollLength,
        startPos = topPos + 459;
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
		
		//FB Comment Section will init only content page for desktop.
		//BUG is tablet that stickyAd not running that means fb comment will not show.
		if(!isInitFB && isContentPage && scroll > endOfContentPosition){
			initFB();
			
			//Add Please share
			$(".so").append('<div style="padding-top:9px">&nbsp; 📣 ช่วยแชร์หน่อยนะ 😙🙏</div>');
		}
		
        stopPos = mainWrapper.height() + scrollLength;
        scroll < startPos ? html3.css({
            position: "relative"
        }) : scroll > stopPos ? html3.css({
            position: "absolute",
            bottom: "0",
            top: "auto"
        }) : html3.css({
            position: "fixed",
            top: "0",
            height: html3Height + "px"
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

//-----------------------------------------------------------------------
//Run Script All page Last section
if (911 <= windowWidth) {
	-1 != window.location.href.indexOf("?m=1") || stickySidebar();
}
//Lazy load menu
initMenu();

//Search box
$("#sBtn").click(searchButtonHandler);


//*********Lazy Load Widgets*********
if(windowWidth<911){
	var endOfContentPosition = $('#sb').offset().top-1000;
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
		if(scroll > endOfContentPosition && $('#fc').html().length == 0){
			addWidgets();
			$('#ft4').click(initWidgetManager);
		}
	});
}


$(".error_page #mw").prepend('<div class="error-title"><span>404</span>');
