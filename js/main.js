//var mainlink = 'http://localhost/clients/united-architects-of-the-philippines/';
//var mainlink = 'http://webrevosystems.com/sandbox/uap/';
var mainlink = 'http://united-architects.org/';

$(function() {
   // For Banner
   $( window ).resize(function() {
      bannerwidth = $('#banner').width();
      bannerheight = bannerwidth * .3125;
      $('#banner').css('height',bannerheight+'px');
      $('#slider > li').css('height',bannerheight+'px');
      slideCounter = 0;
      var slideCount = $('#slider > li').size();
      $('#slider').css('width',(slideCount*bannerwidth)+'px');
      $('#slider > li').css('width',bannerwidth+'px');
   });

   // For Registration - Specialization Check
   $('.specialization').change(function() {
      
   });
});

/* BANNER */
var bannerwidth = 0;
var bannerheight = 0;
$(document).ready(function() {
	bannerwidth = $('#banner').width();
	bannerheight = bannerwidth * .3125;
	$('#banner').css('height',bannerheight+'px');
	$('#slider > li').css('height',bannerheight+'px');
	
	
	$("#mobile-nav").addClass("js").before('<div id="mobile-menu">&#9776;</div>');
	$("#mobile-menu").click(function(){
		$("#mobile-nav").slideToggle();
		$("#mobile-menu").toggle();
	});
	$("#mobile-nav-back").click(function(){
		$("#mobile-nav").slideToggle();
		$("#mobile-menu").toggle();
	});
	$(window).resize(function(){
		if(window.innerWidth > 640){
			$("#mobile-nav").removeAttr("style");
			$("#mobile-menu").removeAttr("style");
		}
	});
});
function playSlider() {
   var slideCount = $('#slider > li').size();
   $('#slider').css('width',(slideCount*bannerwidth)+'px');
   $('#slider > li').css('width',bannerwidth+'px');
   $('#banner').prepend('<ul id="slider-nav"></ul>');
   if(slideCount > 1) {
      for(var x=0;x<slideCount;x++) {
         $('#slider-nav').append('<li id="n'+(x+1)+'" onclick="selectSlide('+(x+1)+')"></li>');
      }
      playSlide();
      selectSlide(1);
   }
}
var currSlide = 1;
var slideCounter = 0;
function playSlide() {
   var slideCount = $('#slider > li').size();
   var t = setTimeout("playSlide()",bannerwidth);
   slideCounter++;
   if(slideCounter == 5) {
      currSlide++;
      if(currSlide > slideCount) {
         currSlide = 1;
      }
      selectSlide(currSlide);
   }
}
function selectSlide(idx) {
   var slideSpeed = 500;
   slideCounter = 1;
   currSlide = idx;
   $('#slider-nav > li').attr('class','normal');
   $('#n'+idx).attr('class','normal selected');
   var slidePos = ((idx-1)*bannerwidth)*-1;
   $('#slider').animate({
      left: slidePos+'px'
   },slideSpeed);
}

function selectHomeSection(section) {
   $('.section-wrapper ul li').attr('class','normal');
   $('#nav-section-'+section).attr('class','selected');
   $('.section-wrapper .section').hide();
   $('#home-'+section).show();
}

var selectedArea = '';
var selectedDistrict = '';
function selectArea(id) {
   $('#areas .area').attr('class','area');
   $('#'+id).attr('class','area selected');
   $('.districts').hide();
   $('#'+id+'-districts').show();
   $('.chapters').hide();
   selectedArea = id;
}
function selectDistrict(id) {
   $('.districts .district.p4').attr('class','district p4');
   $('.districts .district.p5').attr('class','district p5');
   $('.districts .district.p7').attr('class','district p7');
   var sid = id.substr(0,1).toLowerCase();
   var divclass = '';
   switch(sid) {
      case 'a': divclass = 'p7'; break;
      case 'b': divclass = 'p5'; break;
      case 'c': divclass = 'p4'; break;
      case 'd': divclass = 'p4'; break;
   }
   $('#district-'+id).attr('class','district '+divclass+' selected');
   selectedDistrict = id;
   renderChapters();
   console.log(selectedArea+'-'+selectedDistrict);
}
function renderChapters() {
   $('.chapters').hide();
   $('#'+selectedDistrict).show();
}
var ahubstat = 0;
function toggleAhubNav() {
   if(ahubstat == 0) {
      $('#ahub-nav').animate({
         top: '0'
      }, 200);
      ahubstat = 1;
   } else {
      $('#ahub-nav').animate({
         top: '-50px'
      }, 200);
      ahubstat = 0;
   }
}
function selectSection(section) {
   $('#ahub-nav ul li a').attr('class','normal');
   $('#ahub-nav-'+section).attr('class','active');
   $('#ahub .section').hide();
   $('#'+section).show();
}
function uploadPhoto(id,type) {
   var left = (screen.width/2);
   var top = (screen.height/2);
   window.open(mainlink+'support/upload-photo.php?id='+id+'&type='+type,'Upload Photo','status=no,resizable=no,menubar=no,width=400,height=200,top='+top+',left='+left+'');
}

function scrollWin(section) {
   $('html,body').animate({
      scrollTop: $("#"+section).offset().top - 20
   }, 300);
}

function viewChapterDetails(id) {
   $('#loader').load(mainlink+'functions/load-chapter-details.php?id='+encodeURIComponent(id));
}

function conDelItem(id,table) {
   switch(table) {
      case 'job_posts':
         var name = $('#j'+id+' .job-title a').html();
         $('#con-del-item .header').html('Delete Job Post');
         $('#con-del-item .content').html('Are you sure you want to remove this job post?<div>'+name+'</div>');
         break;
   }
   $('#con-del-item .options a:first-child').attr('href','functions/delete-item.php?id='+id+'&table='+encodeURIComponent(table));
   $('#con-del-item').modal();
}


$(document).ready(function() {
   playSlider();
   selectHomeSection('events');
});
      
