

/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleCard.js */


modules.card = {
	canCloseMail: false,
        pushBox : false,
	gotSecForMail: false,
	mapObject: false,
	inited: false,
	companydata:{
		lat: 0,
		lng: 0
	},
	
	
	initMapObject: function(callback, loaderAllMap){
		var mapType = cfg.mapType == 1?'gmap':'mb';
		GA.event('mapa-odslon', 'prezentacje', mapType);

		if(typeof map == 'undefined')
		{
			$("#secondary-map").appendLoader("loaderDivSmallMain mapLoader");
			map = modules.map.initCard({
				id: "content-map-image-inner",
				lat: modules.card.companydata.lat,
				lng: modules.card.companydata.lng,
				callback: function(){
					$("#secondary-map").removeLoader();
					if(callback) callback();
				}
			});
		}
		else
		{
			if(typeof callback != 'undefined')
			{
				callback();
			}
		}
	},
	
 
	
	showMapRoute: function(){
		$("#content-map .map-your-localisation").hide();
		$("#content-map .map-route-wrapper").attr('style', '').css('position','static').show();
		
		$("#content-map .map-route").show();
		$("#content-map .map-route-inner").stop(true,false).animate({
			'margin-top':'0px'
		},{
			duration: 120,
			easing:'linear'
		});
		$("#getRoute").removeClass("active");
		var mapType = cfg.mapType == 1?'gmap':'mb';
		GA.event('mapa-wyznacz-trase', 'prezentacje', mapType);
	},	
	
	hideMapRoute: function()
	{
		$("#content-map-image-inner").width( ($("#content-map").width())+'px' );
		$("#content-map-image-inner").height( ($("#content-map").width() * 0.5)+'px' );
		$("#content-map .map-route-inner").stop(true,false).animate({
			'margin-top':'-60px'
		},{
			duration: 120,
			easing:'linear',
			complete: function(){
				$("#content-map .map-route").hide();
			}
		});
		$("#getRoute").removeClass("active");
		if(typeof map != 'undefined')
		{
			map.removeRoute();
		}
	},
	
	toogleMapType : function()
	{
		if( !$( "#map-icons" ).hasClass('controls-hidden') )
		{
			$( "#map-icons" ).addClass('controls-hidden');
			$( "#street-view-icons" ).removeClass('controls-hidden');
		}
		else
		{
			$( "#map-icons" ).removeClass('controls-hidden');
			$( "#street-view-icons" ).addClass('controls-hidden');
		}
		
		  
	},
	
	initSidebar: function(){
		var mapType = cfg.mapType == 1?'gmap':'mb';
		if($(".openLargeMapBusiness").length>0)
		{
			$("#closeLargeMapBusiness").bindTouchClick(function(e){
				
				GA.event('mapa-schowaj', 'prezentacje', mapType);

				$('.marker').css("display","block");
				var ob = $("#content-map");
				var margFinish = -1*$("#content-map-image #content-map-image-inner").outerHeight(true);
				var margBot = parseInt(ob.css('margin-bottom'));
				
				$("#content-map").removeClass("opened");
				$("#content-map-image #content-map-image-inner").animate({
					"margin-top": margFinish+'px'
				},{
					duration: 120
				});
				$("#content-map-image-inner").removeClass("active");
				$("#content-map .content-map-inner").delay(100).slideUp(60);
				ob.delay(100).animate({
					'margin-bottom': '0px'
				},{
					duration: 60
				});
				ob.delay(120).fadeOut(50);
				$(".openLargeMapBusiness").delay(120).slideDown(120,function(){
					ob.hide();
					ob.css('margin-bottom',margBot+'px');
					$("#content-map-image #content-map-image-inner").css("margin-top","0px");
					$("#content-secondary").css("overflow","visible");
				});
				
			});
			
			$(".openLargeMapBusiness").bindTouchClick(function(e){
				e.preventDefault();
				modules.card.hideMapRoute();
				
				
				var ob = $("#content-map");
				var margBot = 0;
				var hei = 0;
				var scroll = 0;
				$(".company-sidebar").parent().css({
					'overflow':'hidden'
				});
				
				ob.parent().css("position","relative");
				ob.css({
					"visibility": "hidden",
					"position": "absolute",
					"width": "100%"
				}).css({
					"display":"block"
				});
				
				$("#content-map").parent().css("position","relative");
				$("#content-map").addClass("opened");
				$("#content-map-image").css("overflow","hidden");
				$("#content-map-image #content-map-image-inner").css("margin-top",-1*$("#content-map-image #content-map-image-inner").outerHeight(true)+"px");
				
				hei = $("#content-map").height();
				margBot = parseInt(ob.css('margin-bottom')); 
				
				scroll = ob.offset().top-15;
				var wid = $("#content-map").width();
				var hei = wid * 0.5;
				var offset = $("#content-map .content-map-inner .primary-a").height() + parseInt($("#content-map .content-map-inner .primary-a").css("padding-top"));
				if(hei >= $(window).height()-offset*4)
				{
					hei = $(window).height()-offset*4;
					if(user_flags.isDesktop && hei<400)
					{
						hei = 400;
					}
					else if(hei< $(window).height()*0.65 && !user_flags.isDesktop)
					{
						hei = $(window).height()*0.65;
					}
					
				}
				
				$("#content-map-image-inner").width(wid);
				
				$("#content-map-image-inner").height(hei);
				
				
				modules.card.initMapObject(function(){
					ob.css({
						"display":"none",
						"position": "static",
						"width": "auto",
						"margin-bottom": "0px"
					}).css({
						"visibility": "visible"
					});
					
					ob.show();
					$(".openLargeMapBusiness").slideUp(170,function(){
						$("#content-secondary").css("overflow","visible");
					});
					$("html,body").animate({
						scrollTop: scroll 
					},{
						duration: 80,
						easing: 'linear'
					});
					ob.animate({
						"margin-bottom": margBot+'px'
					},{
						duration: 80,
						easing: 'linear'
					});
					$("#content-map-image #content-map-image-inner").delay(80).animate({
						"margin-top": '0px'
					},{
						duration: 150
					});
					$("#content-map .content-map-inner").delay(250).slideDown(60,function(){
						
						window.setTimeout(function(){map.resetMapView();},100);
					});
					
				});
				/*
				$("#getRoute").bindTouchClick(function(e){
					e.preventDefault();
					map.displayRoute();
				})
				*/
			});
		}
		else	
		{
			$(".openMapWpis").hover(function(){
				$(".nav-d span.show-route").addClass("hovered")
			},function(){
				$(".nav-d span.show-route").removeClass("hovered")
			});
			$("#content-map").attr("data-canOpen","1");
			$("#desc-company .openMapWpis").bindTouchClick(function(e){
				e.preventDefault();
				e.stopPropagation();
				modules.card.hideMapRoute();
				var sizes = [0,0];
				var marginLeft = -($("#desc-company .primary").outerWidth(true)+1);
				modules.card.descCompanyHeight = $("#desc-company").height();

				
				$("#secondary-map").removeLoader();
				$("#content-map").appendLoader("loaderDivSmallMain mapLoader2");
				$("#content-map").addClass("opened");
				$("#content-map, #desc-company").attr("style","");
				$("#content-map").css("visibility","hidden");
				$("#content-map").css("display","block");
				sizes[0] = $("#content-map").width();
				sizes[1] = $("#content-map-image").height()+57;
				
				$("#content-primary").css("overflow-x","hidden");
				$("#desc-company").width($("#desc-company").width());
				
				$("#content-map").width($("#desc-company .nav-d-wrapper").width());
				$("#content-map").height($("#desc-company").height());
				
				var siz = ($("#desc-company .primary").height()-57 > (sizes[0])*0.5)?$("#desc-company .primary").height()-57 : (sizes[0])*0.5;
				
				if(siz > sizes[1]-57)
				{
					siz = sizes[1]-57;
				}
				
				$("#content-map-image-inner").width(sizes[0]);
				$("#content-map-image-inner").height(siz);
				$("#secondary-map").parent().fadeOut(90);


				modules.card.initMapObject(function(){
					if(map.isStreetViewActive())
					{
						map.showMapView();
						modules.card.toogleMapType();
					}
					$("#content-map").removeLoader();
					$("#content-map").css("display","none");
					$("#content-map").css("visibility","visible");
					$("#content-map").fadeIn(120);
					$("#content-map .content-map-inner").css({
						"overflow":"hidden",
						"height":"57px"
					});
					$("#desc-company").stop(true,false).delay(90).animate({
						"margin-left":marginLeft+"px",
						"height":(sizes[1]-2)+"px"
					},{
						duration: 210,
						complete:function(){
							$("#content-map .content-map-inner").css({
								"overflow":"visible",
								"height":"auto"
							});
							$("#content-map").css("height", sizes[1]+"px");
							if(typeof map !="undefined")
							{
								//window.setTimeout(function(){ map.resetMapView();},100);
								if(user_flags.isTablet)
								{
									modules.card.computeMapDimensions();
								}
								
							}
						},
						step: function(n,t){
							if(t.prop == "marginLeft")
							{
								$("#content-map").css({
									"margin-right": n+"px",
									"width":(250-n)+"px"
								});
							}
							if(t.prop == "height")
							{
								$("#content-map").css("height", n+"px");
							}
						}
					});
				},1);
				
			});
			
			$("#closeLargeMapBusiness").bindTouchClick(function(e){
				e.preventDefault();
				e.stopPropagation();
				GA.event('mapa-schowaj', 'prezentacje', mapType);

				$("#content-map").removeClass("opened");
				$("#secondary-map").parent().fadeIn(90);
				$("#content-map").attr("data-canOpen","0");
				$('.marker').css("display","block");
				$("#content-map .content-map-inner").css({
					"overflow":"hidden",
					"height":"57px"
				});
				$("#desc-company").stop(true,false).animate({
					"margin-left":"0px",
					"height":modules.card.descCompanyHeight+"px"
				},{
					duration: 180,
					step: function(n,t){
						if(t.prop == "marginLeft")
						{
							$("#content-map").css({
								"margin-right": n+"px",
								"width":(250-n)+"px"
							});
						}
						if(t.prop == "height")
						{
							$("#content-map").css("height", n+"px");
						}
					}
				});
				
				$("#content-map").delay(150).animate({
					opacity:0
				},{
					duration: 120,
					complete: function(){
						$("#content-map").css({
							'display':'none',
							opacity: 1,
							'width': 'auto',
							'height': 'auto'
						});
						$("#content-map .content-map-inner").css({
							'width': 'auto',
							'position': 'static'
						});
						$("#content-map-image").css({
							'width': 'auto',
							'position': 'static'
						});
						$("#content-primary").css("overflow-x","visible");
						$("#desc-company").css({
							"width": "auto",
							"height": "auto"
						});
						$("#content-secondary").css("overflow","visible");
						$("#content-map .content-map-inner").css({
							"overflow":"visible",
							"height":"auto"
						});
						$("#content-map").attr("data-canOpen","1");
					}
				});
			});
		}
		
		$("#getRoute").bindTouchClick(function(e){
			e.preventDefault();
			if($("#content-map .map-route").is(":visible"))
			{
				modules.card.hideMapRoute();
				map.removeRoute();
			}
			else
			{
				modules.card.showMapRoute();
				if(map.isStreetViewActive())
				{
					map.showMapView();
					modules.card.toogleMapType();
				}
			}
			
		});
		$("#street-view-icon").bindTouchClick(function(e){
			if($("#content-map .map-route").is(":visible"))
			{
				modules.card.hideMapRoute();
			}
			map.showStreetView();
			modules.card.toogleMapType();
		});
		$("#map-view-icon").bindTouchClick(function(e){
			map.showMapView();
			modules.card.toogleMapType();
		});
		$("#marker-icon").bindTouchClick(function(e){
			map.centerMap();
		});
		$("#zoomin-icon").bindTouchClick(function(e){
			map.zoomin();
		});
		$("#zoomout-icon").bindTouchClick(function(e){
			map.zoomout();
		});
		$("#content-map .map-route-wrapper .submit").bindTouchClick(function(e){
			e.preventDefault();
			var val = $(".map-route .holder-input input").val();
			if(val =="")
			{
				$(".map-route .holder-input").addClass("error");
				return false;
			}
			$("#content-map .map-route-wrapper").css({
				'position':'absolute',
				'top': '7px'
			});
			$("#content-map .map-your-localisation .street").html($("#content-map .holder-input input").val());
			$("#content-map .map-your-localisation").fadeIn(120);
			$("#content-map .map-route-wrapper").fadeOut(120,function(){
				map.displayRoute(val);
			});
			
		});
		$(".map-route .holder-input input").focus(function(e){
			$(".map-route .holder-input").removeClass("error")
		});
		$("#content-map .map-your-localisation .map-change-localisation").bindTouchClick(function(e){
			e.preventDefault();
			$("#content-map .map-route-wrapper").css({
				'position':'absolute',
				'top': '7px'
			});
			$("#content-map .map-your-localisation").fadeOut(120);
			$("#content-map .map-route-wrapper").fadeIn(120,function(){
				$("#content-map .map-route-wrapper").css('position','static');
			});
		});
		
	},
	validateAll:function(form){
		var err = false;
		if(!Validate.email(form.find("input[name=fEmail]").val()))
		{
			form.find("div.emailWrapper").addClass("error");
			err = true;
		}
		else
		{
			form.find("div.emailWrapper").removeClass("error");
		}
		
		if(form.find("textarea[name=fMsgBody]").val() == "")
		{
			form.find("div.bodyWrapper").addClass("error");
			err = true;
		}
		else
		{
			form.find("div.bodyWrapper").removeClass("error");
		}
		
		if(form.find("input[name=fSecCode]").val() == "")
		{
			form.find("div.dSecCodeContainer").addClass("error");
			err = true;
		}
		else
		{
			form.find("div.dSecCodeContainer").removeClass("error");
		}
		return err;
	},
	initEmailSend: function(){
		$("div.send-email-contact p.send-email a").bindTouchClick(function(e){
			clearTimeout(timeoutID);

			e.preventDefault();
            var baseHeight = $(document).height();
			var parent = $(this).closest(".send-email-contact"); 
			var ob = $(this).closest(".send-email-contact").children(".send-email-box");
			var scroll = 0;
			$(".send-email-contact").not(parent).css("z-index",0);
			parent.css("z-index",4);
			if(ob.is(":visible"))
			{
				return false;
			}
			
			$(".send-email-box .error").removeClass('error');

			if($(this).closest('.companyRow').length > 0) {
				data = $(this).closest('.companyRow').attr("jdata");
				GA.parseData(data);
				GA.event(structure,label);
			} 
                        
			if(modules.card.pushBox === false || $(this).get(0) !== $('.contact-company:last .send-email a').get(0))
            {
				var ovfx = $('#content-primary').css("overflow-x");
				$('#content-primary').removeAttr('style');
				$('#content-primary').css("overflow-x",ovfx)
                modules.card.pushBox = true;
            }
			$("div.send-email-contact div.send-email-box form").show();
			$("div.send-email-contact div.send-email-box .send").hide();
			$("div.send-email-contact div.send-email-box").not(ob).fadeOut(120,function(){
				modules.card.canCloseMail = true;
			});
                        
			ob.css("visibility","hidden");
			ob.css("display","block");
                        if(baseHeight < $(document).height() && modules.card.pushBox)
                        {
                            var pushHeight = $(document).outerHeight(true)-baseHeight+150;
                            modules.card.pushBox = true;
                            $('#content-primary').css('margin-bottom', pushHeight+"px");
                            
                        }
                            
			ob.find(".dSecCodeContainer").show();
			
			scroll = ob.offset().top+ob.outerHeight(true) - $(window).height();
			if($(".version-switcher-full").length > 0)
			{
				scroll += $(".version-switcher-full").height()+20;
			}
				if($(window).scrollTop() < scroll)
				{
					$('html, body').animate({
						scrollTop: scroll
					},{
						duration: 175
					})
				}
			
			ob.find(".dSecCodeContainer").hide();
			ob.css("display","none");
			ob.css("visibility","visible");
			if($("body").hasClass("mobile"))
			{
				ob.slideDown(170,function(){
					modules.card.canCloseMail = true;
				});	
			}
			else
			{
				ob.fadeIn(120,function(){
					modules.card.canCloseMail = true;
				});
			}
			
			ob.fadeIn(120,function(){
				modules.card.canCloseMail = true;
			});
			ob.css("z-index","5");
		});
		
		$("div.send-email-contact div.send-email-box input[name=fEmail]").blur(function(){
			if(!Validate.email($(this).val()))
			{
				timeoutID = setTimeout(function(){
					$("div.emailWrapper").addClass("error");
				},200);
			}
			else
				$("div.emailWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").blur(function(){
			if($(this).val() == "")
			{
				timeoutID = setTimeout(function(){
					$("div.bodyWrapper").addClass("error");
				},200);
			}
			else
				$("div.bodyWrapper").removeClass("error");
		});

		$("div.send-email-contact div.send-email-box input[name=fSecCode]").blur(function(){
			if($(this).val() == "")
			{
				timeoutID = setTimeout(function(){
					$("div.dSecCodeContainer").addClass("error");
				},200);
			}
			else
				$("div.dSecCodeContainer").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box input[name=fSecCode]").focus(function(){
			$("div.dSecCodeContainer").removeClass("error");
		});
		

		$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").focus(function(){
			$("div.bodyWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box input[name=fEmail]").focus(function(){
			$("div.emailWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box input, div.send-email-box textarea").focus(function(){
			var parent = $(this).closest('.send-email-box');
			var ob = parent.find(".iSecCode");
			if(ob.hasClass("noSec"))
			{
				var seconds = parseInt(new Date() / 1000);
				ob.removeClass("noSec");
				ob.attr("src","./?secCode&amp;t="+seconds);
			}
			parent.find(".dSecCodeContainer").show();
			
		}) 
		
		$(".share").clickedOutside(function(){
			if(!$('.social-network').addClass('inactive'))
			{
				$('.social-network').addClass('inactive');
			}
		});
		
		$("div.send-email-contact").clickedOutside(function(){
			if(modules.card.canCloseMail)
			{
				if($("body").hasClass("mobile"))
				{
					$("div.send-email-contact div.send-email-box").slideUp(170);
					modules.card.canCloseMail = false;
				}
				else
				{
					$("div.send-email-contact div.send-email-box").fadeOut(120);
					modules.card.canCloseMail = false;
				}

				$("div.send-email-contact").css("z-index","0");
			}
	        if(modules.card.pushBox){
	            var ovfx = $('#content-primary').css("overflow-x");
				$('#content-primary').removeAttr('style');
				$('#content-primary').css("overflow-x",ovfx)
				modules.card.pushBox = false;
	        }
		});
		
		$("div.send-email-contact div.send .btn-ok").bind("click touchend",function(){
			if(modules.card.canCloseMail)
			{
				$("div.send-email-contact div.send-email-box").fadeOut(120);
				modules.card.canCloseMail = false;
			}
                        if(modules.card.pushBox){
                            $('#content-primary').removeAttr('style');                            
                            modules.card.pushBox = false;
                        }
		}); 
		
		$("div.send-email-contact div.send-email-box input.submit").click(function(e){
			e.preventDefault();
			var form=$(this).closest('form');
			var err = modules.card.validateAll(form);
			
			if($(this).closest('.companyRow').length > 0) {
				data = $(this).closest('.companyRow').attr("jdata");
				GA.parseData(data);
			} 
			
			
			//$.ajax({url: "/?module=addCompany", type: 'POST', dataType: 'json', data: 'showAddForm=1' });
			if(!err)
			{
				$("div.send-email-contact div.send-email-box").appendLoader();
				$.ajax({
					url: '/?module=contactMail',
					type: 'POST',
					data:{
						fMsgBody: form.find("textarea[name=fMsgBody]").val(),
						fEmail: form.find("input[name=fEmail]").val(),
						fPhone: form.find("input[name=fPhone]").val(),
						fB: form.find("input[name=fB]").val(),
						fC: form.find("input[name=fC]").val(),
						fSecCode: form.find("input[name=fSecCode]").val(),
						idFormSource: form.getTermsFormSource()
					},
					success: function(e){						
						$("div.send-email-contact div.send-email-box").removeLoader();
						var resp = $.parseJSON(e);
						if(resp['fieldErrors'] && resp['fieldErrors'].length > 0)
						{
							for(var x in resp['fieldErrors'])
							{
								form.find("input[name="+resp['fieldErrors'][x]+"]").closest("div").addClass("error");
							}
							$("div.send-email-contact div.send-email-box input[name=fSecCode]").val("");
							var seconds = parseInt(new Date() / 1000);
							form.find(".iSecCode").attr("src","./?secCode&amp;t="+seconds);
						}
						else
						{
							if(typeof resp['sentStatus'] != "undefined" && parseInt(resp['sentStatus']) == 0)
							{
								$("div.send-email-contact div.send-email-box .send").find("p.err").removeClass("none");
								$("div.send-email-contact div.send-email-box .send").find("p.success").addClass("none");
							}
							else
							{
								$("div.send-email-contact div.send-email-box .send").find("p.success").removeClass("none");
								$("div.send-email-contact div.send-email-box .send").find("p.err").addClass("none");
							}
							$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").val("");
							$("div.send-email-contact div.send-email-box input[name=fEmail]").val("");
							$("div.send-email-contact div.send-email-box input[name=fPhone]").val("");
							$("div.send-email-contact div.send-email-box input[name=fSecCode]").val("");
							
							$("div.send-email-contact div.send-email-box form").hide();
							$("div.send-email-contact div.send-email-box .send").show();
							
							var seconds = parseInt(new Date() / 1000);
							form.find(".iSecCode").attr("src","./?secCode&amp;t="+seconds);
													
							GA.event(structure,label);
						}
					}
				})
			}
			
		});
	},
	
	
	initDescriptionUnwrap: function(){

		$('body').moreAndLess({
			moreObject: "#about-company .unwrapped",
			lessObject: "#about-company .wrapped",
			moreButton: "#about-company .show-more span.closed",
			lessButton: "#about-company .show-more span.opened"
		});
	},
	initDescriptionUnwrapMobile: function(){

		$('body').moreAndLess({
			moreObject: "#about-m .unwrapped",
			lessObject: "#about-m .wrapped",
			moreButton: "#about-m .show-more span.closed",
			lessButton: "#about-m .show-more span.opened"
		});
	},
	
	initMapObjectMobile: function(callback){
		var mapType = cfg.mapType == 1?'gmap':'mb';
		GA.event('mapa-odslon', 'prezentacje', mapType);
		$("#content-map-image-inner").height(parseInt($("#content-map-image-inner").width()*0.633));
		$("#content-map").appendLoader();
		$("#content-map-image").animate({
			'height': $("#content-map-image-inner").height()
		},{
			duration: 170,
			easing: 'linear'
		});
		if(typeof map == 'undefined')
		{
			map = modules.map.initCard({
				id: "content-map-image-inner",
				lat: modules.card.companydata.lat,
				lng: modules.card.companydata.lng,
				callback: function(){
					$("#content-map").removeLoader();
					if(callback) callback();
				}
			});
		}
		else
		{
			$("#content-map").removeLoader();
			callback();
		}
		
	},
	
	initEmailSendMobile: function(){
		//$("div.send-email-contact .send-email-box").show();
		$("div.send-email-contact div.send-email-box input[name=fEmail]").blur(function(){
			if(!Validate.email($(this).val()))
				$(this).closest("div.emailWrapper").addClass("error");
			else
				$(this).closest("div.emailWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").blur(function(){
			if($(this).val() == "")
				$(this).closest("div.bodyWrapper").addClass("error");
			else
				$(this).closest("div.bodyWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box input[name=fSecCode]").focus(function(){
			$(this).closest("div.dSecCodeContainer").removeClass("error");
		});
		

		$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").focus(function(){
			$(this).closest("div.bodyWrapper").removeClass("error");
		});
		
		$("div.send-email-contact div.send-email-box input[name=fEmail]").focus(function(){
			$(this).closest("div.emailWrapper").removeClass("error");
		});
		$("div.send-email-contact p.send-email a").bindTouchClick(function(e){
			e.preventDefault();
			var ob = $(this).closest(".send-email-contact").children(".send-email-box");
			if(ob.is(":visible"))
			{
				ob.slideUp(120);
			}
			else
			{
				ob.slideDown(120);
				$("html,body").animate({
					scrollTop: $(this).closest("div.send-email-contact").offset().top +2
				},{
					duration: 170
				});
				GA.useDataTag(this);
			}
		});
                
		$("div.send-email-contact div.send-email-box input, div.send-email-box textarea").focus(function(){
			var parent = $(this).closest('.send-email-box');
			var ob = parent.find(".iSecCode");
			if(ob.hasClass("noSec"))
			{
				var seconds = parseInt(new Date() / 1000);
				ob.removeClass("noSec");
				ob.attr("src","./?secCode&amp;t="+seconds);
			}
			parent.find(".dSecCodeContainer").show();
                       
                });
		$(".send-email-box div.send .btn-ok").bindTouchClick(function(){
			$("div.send-email-contact div.send-email-box").fadeOut(120,function(){
					$("div.send-email-contact div.send-email-box form").show();
					$("div.send-email-contact div.send-email-box .send").hide();	
			});
            if(modules.card.pushBox){
                $('#content-primary').removeAttr('style');                            
                modules.card.pushBox = false;
            }
		}); 
		
		$("div.send-email-contact div.send-email-box input[type=submit]").click(function(e){
			e.preventDefault();
			var form=$(this).closest('form');
			var err = modules.card.validateAll(form);
			
			//$.ajax({url: "/?module=addCompany", type: 'POST', dataType: 'json', data: 'showAddForm=1' });
			if(!err)
			{
				$("div.send-email-contact div.send-email-box").appendLoader();
				$.ajax({
					url: '/?module=contactMail',
					type: 'POST',
					data:{
						fMsgBody: form.find("textarea[name=fMsgBody]").val(),
						fEmail: form.find("input[name=fEmail]").val(),
						fPhone: form.find("input[name=fPhone]").val(),
						fB: form.find("input[name=fB]").val(),
						fC: form.find("input[name=fC]").val(),
						fSecCode: form.find("input[name=fSecCode]").val(),
						idFormSource: form.getTermsFormSource()
					},
					success: function(e){
						$("div.send-email-contact div.send-email-box").removeLoader();
						var resp = $.parseJSON(e);
						if(resp['fieldErrors'].length > 0)
						{
							for(var x in resp['fieldErrors'])
							{
								form.find("input[name="+resp['fieldErrors'][x]+"]").closest("div").addClass("error");
							}
							$("div.send-email-contact div.send-email-box input[name=fSecCode]").val("");
							var seconds = parseInt(new Date() / 1000);
							form.find(".iSecCode").attr("src","./?secCode&amp;t="+seconds);
						}
						else
						{
							if(typeof resp['sentStatus'] != "undefined" && parseInt(resp['sentStatus']) == 0)
							{
								$("div.send-email-contact div.send-email-box .send").find("p").eq(0).html("Wystąpił bład podczas wysyłania wiadomości. Spróbuj ponownie później");
							}
							else
							{
								$("div.send-email-contact div.send-email-box .send").find("p").eq(0).html("Twoja wiadomość została wysłana.");
							}
							$("div.send-email-contact div.send-email-box textarea[name=fMsgBody]").val("");
							$("div.send-email-contact div.send-email-box input[name=fEmail]").val("");
							$("div.send-email-contact div.send-email-box input[name=fPhone]").val("");
							$("div.send-email-contact div.send-email-box input[name=fSecCode]").val("");
							
							form.closest("div.send-email-contact").find("div.send-email-box form").hide();
							form.closest("div.send-email-contact").find("div.send-email-box .send").show();
							$("html,body").animate({
								scrollTop: form.closest("div.send-email-contact").offset().top +2
							},{
								duration: 170
							});
							GA.useDataTag(form);
						}
					}
				})
			}
			
		});
		
	},
	
	initGoBack:function(){
		$(document).ready(function(){
			if(!user_flags.isMobile)
			{
				$("#backToList").hover(function(){
					$("#backToList .button-wrapper").stop(true,false).animate({
						width: "107px"
					},{
						duration: 170
					})
				},function(){
					$("#backToList .button-wrapper").stop(true,false).animate({
						width: "35px"
					},{
						duration: 170
					})
				});
			}
		});
	},
	
	initMobile: function(json,outside){
		if(json)
		{
			if(typeof json == "object")
			{
				modules.card.companydata = json;
			}
			else
			{
				modules.card.companydata = $.parseJSON(json);
			}
			
		}
		if(!modules.card.inited)
		{
			
			$(document).ready(function(){
				$("li.companyRow .desc").bind("touchend",function(e){
					var ob = $(this).find(".fullDescription");
					if(ob.length > 0)
					{
						var newHtml = ob.html();
						$(this).html(newHtml);
					}
				});
			})
			
			$("#navigatorSelect").change(function(e){
				window.location.href = $(this).val();
			});
			
			
			$("ul.nav-m p.unwrap").bindTouchClick(function(){
				var ob = $(this).parent().children(".wrapped");
				if(ob.is(":visible"))
				{
					$(this).children("em").removeClass("rotated");
					$(this).find('span').removeClass("highlight");
					ob.slideUp(170);
				}
				else
				{
					$(this).children("em").addClass("rotated");
					$(this).find('span').addClass("highlight");
					ob.slideDown(170);
				}
			});
			$("ul.nav-m p.active-link").bindTouchClick(function(){
				if($(this).find('a').length > 0)
				{
					window.location.href =$(this).find('a').attr("href"); 
				}
			});
			
			$("#openMapMobile").bindTouchClick(function(){
				if($(".box-contact-m-show-map span").hasClass("opened"))
				{
					$("#content-map").removeLoader();
					$(".box-contact-m-show-map span").html("pokaż mapę").removeClass("opened");
					$("#content-map-image").animate({
						'height': '0px'
					},{
						duration: 170,
						easing: 'linear'
					});
					GA.event('mapa-schowaj', 'prezentacje', cfg.mapType == 1?'gmap':'mb');
				}
				else
				{
					$(".box-contact-m-show-map span").html("zamknij mapę").addClass("opened");
					
					modules.card.initMapObjectMobile(function(){});
				}
				
			})
			
			modules.card.inited = true;
		}
		modules.card.initNews();
		modules.card.initEmailSendMobile();
		modules.card.initDescriptionUnwrapMobile();
		modules.cardGallery.noResize = user_flags.isSmartphone;
		modules.cardGallery.updateProductsClasses();
		$(document).ready(function(){
			
			if($("#navigatorSelectWrapper").length > 0 && !outside)
			{
				$("html,body").animate({
					scrollTop: $("#navigatorSelectWrapper").offset().top-parseInt($("#navigatorSelectWrapper").parent().css("margin-top"))+"px"
				},{
					duration: 170
				})
			}
			
			$("p.company-product-photo img:not([data='NO PHOTO'])").preload(function(e){
				$(this).attr("src",$(this).attr("data"));
			});
		});
		
	},
	
	computeMapDimensions: function(){

		window.clearTimeout(modules.card.resizeTimeout);
		modules.card.resizeTimeout = window.setTimeout(function(){
			var wid = ($(".openLargeMapBusiness").length)? $("#content-map").width(): $("#about-company").outerWidth(true);
			var hei = wid * 0.5;
			var offset = $("#content-map .content-map-inner .primary-a").height() + parseInt($("#content-map .content-map-inner .primary-a").css("padding-top"));
			if(hei >= $(window).height()-offset*4)
			{
				hei = $(window).height()-offset*4;
				if(user_flags.isDesktop && hei<400)
				{
					hei = 400;
				}
				else if(hei< $(window).height()*0.65 && !user_flags.isDesktop)
				{
					hei = $(window).height()*0.65;
				}
			}
			hei = Math.ceil(hei);
			

		    
		    if($(".openLargeMapBusiness").length == 0)
		    {
		    	var oldWid = $("#content-map").width(); 
		    	var newWid = $("#about-company").outerWidth(true); 
		    	var newHei = $("#content-map .content-map-inner").height()+$("#content-map-image-inner").height();
		    	$("#content-map").width(newWid).height(hei+57);
		    	$("#desc-company").width(newWid-2).height(hei+55);	
		    }
		    $("#content-map-image-inner").width(wid).height(hei);
			
			window.setTimeout(function(){map.resetMapView();},300);
		},300);
		
	},
	
	switchOrientation: function(isPortrait){
		//#directions-panel
		
		var computedHei = $('#desc-company').height() - $('#desc-company .nav-d-wrapper').height();
	    $('#desc-company .secondary-mod, #desc-company .secondary-mod #secondary-map').height(computedHei);
	    
		if(!$("#content-map").hasClass("opened"))
		{
			return false;
		}
	    
    	if(typeof map != 'undefined')
		{
    		modules.card.computeMapDimensions();
		}
	},
	
	initNews: function(){
		var newsHolder = $("#news, #news-m");
		if(newsHolder.length > 0)
		{
			var pphoto = newsHolder.find("p.photo");
			var maxSize = [pphoto.width(), pphoto.height()];
			var onComplete = function(img){
				var obj = $(img);
				obj.css({
					"margin-left": ((maxSize[0] - obj.width()) /2) >> 0,
					"margin-top": ((maxSize[1] - obj.height()) /2) >> 0,
				}).parent().removeLoader();
			};
			pphoto.appendLoader("loaderDivSmallMain white"); 
			pphoto.children("img").each(function(i,e){
				var obj = $(e);
				var img = obj[0];
				if(img.complete)
		    	{
					onComplete(img);
		    	}
		    	else
		    	{
		    		img.onload = function(){ onComplete(img) };
		    		img.onerror = function(){$(img).parent().removeLoader(); };
		    	}
			});
		}
	},
	
	init: function(json,outsite,mobile){
		//$("body").addDebugSpan();
		if(mobile)
		{
			modules.card.initMobile(json,outside);
		}
		else
		{
			if($("#products-services").length > 0)
			{
				modules.cardGallery.updateProductsClasses();
			}
			
			$(document).ready(function(){
				var computedHei = $('#desc-company').height() - $('#desc-company .nav-d-wrapper').height();
				if(user_flags.isMobile && $('#desc-company .right.ismap').length > 0)
				{
					computedHei -= parseInt($('#desc-company .right.ismap').css("padding-top"));
				}
			    $('#desc-company .secondary-mod, #desc-company .secondary-mod #secondary-map').height(computedHei);
			});
			
			if(json)
			{
				if(typeof json == "object")
				{
					modules.card.companydata = json;
				}
				else
				{
					modules.card.companydata = $.parseJSON(json);
				}
				
			}
			
			modules.card.initNews();	
			modules.card.initGoBack();
			modules.card.initSidebar();
			modules.card.initEmailSend();
			modules.card.initDescriptionUnwrap();
			
		}
	}
}
window['modules']['card'] = modules.card;


/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleCardGallery.js */


modules.cardGallery = {
	productsImagesCount: 0,
	productsLoadedImagesCount: 0,
	productsImages: [],
	noResize: false,
	halfSize: false,
	gallery:{
		imagesBig:[],
		images:[],
		actualPhoto: 0,
		actualMargin: 0,
		movedAlready: 0,
		totalPhotos: 0,
		picturesToPreload: 0,
		
		idC: 0,
		page: 1,
		pageForBig: 1,
		ajaxPending: false,
		actualPhotoObject: false
	},

	updateProductsClasses: function(){
		modules.cardGallery.productsImagesCount = $("p.company-product-photo img:not([data='NO PHOTO'])").length;

		modules.cardGallery.productsLoadedImagesCount = 0;
		if(modules.cardGallery.productsImagesCount == 0)
		{
			$("p.company-product-photo img").fadeIn(170);
		}

		
		//$("p.company-product-photo").appendLoader();

		$("p.company-product-photo img:not([data='NO PHOTO'])").each(function(i,e){

			
			if(!modules.cardGallery.productsImages[i])
			{
				modules.cardGallery.productsImages[i] = new Image;
				
				modules.cardGallery.productsImages[i].onerror = function(){
					modules.cardGallery.productsLoadedImagesCount++;
					if(modules.cardGallery.productsLoadedImagesCount >= modules.cardGallery.productsImagesCount)
					{
						$("p.company-product-photo img").fadeIn(170);
						$("p.company-product-photo").removeLoader();
					}
				};
				modules.cardGallery.productsImages[i].onload = function(){
					if(!modules.cardGallery.noResize)
					{
						var size = (modules.cardGallery.halfSize)? 50: 100;
						if(this.width > this.height)
						{
							var prop = modules.cardGallery.productsImages[i].height/100;
							var newMargin = parseInt(-1*(modules.cardGallery.productsImages[i].width/prop - size)/2);
							$(e).addClass("hei-"+size);
							if(newMargin < 0)
							{
								$(e).css("margin-left",newMargin);
							}
						}
						else
						{
							$(e).addClass("wid-"+size);
						}
					}
					$(e).attr("src",this.src);
					modules.cardGallery.productsLoadedImagesCount++;
					
					if(modules.cardGallery.productsLoadedImagesCount >= modules.cardGallery.productsImagesCount)
					{
						$("p.company-product-photo img").fadeIn(170);
						$("p.company-product-photo").removeLoader();
					}
				}
				
				modules.cardGallery.productsImages[i].src = $(e).attr("data");
				if(modules.cardGallery.productsImages[i].completed)
				{	
					if(!modules.cardGallery.noResize)
					{
						var size = (modules.cardGallery.halfSize)? 50: 100;
						if(modules.cardGallery.productsImages[i].width > modules.cardGallery.productsImages[i].height)
						{
							
							var newMargin = parseInt(-1*(modules.cardGallery.productsImages[i].width - size)/2);
							$(e).addClass("hei-"+size);
							if(newMargin < 0)
							{
								$(e).css("margin-left",newMargin);
							}
							
						}
						else
						{
							$(e).addClass("wid-"+size);
						}
					}
					
					$(e).src(modules.cardGallery.productsImages[i].src);
					modules.cardGallery.productsLoadedImagesCount++;
					
					if(modules.cardGallery.productsLoadedImagesCount >= modules.cardGallery.productsImagesCount)
					{
						$("p.company-product-photo img").fadeIn(170);
						$("p.company-product-photo").removeLoader();
					}
				}
			}
			
			
			
		});
	},
	slideGallery: function(chan){
		var newIndex = modules.cardGallery.gallery.actualPhoto+chan;
		if(newIndex< 0 || newIndex >= $("#gallery .gallerySlider li.photo").length)
		{
			return false;
		}
		var thisOff = parseInt($("#gallery .gallerySlider li.photo").eq(newIndex).offset().left);
		var parOff = parseInt($("#gallery .gallerySlider").offset().left);
		var move = parOff - thisOff;
		
		if(-move+$("#gallery .gallery-preview-inner").width() > $("#gallery .gallerySlider").width())
		{
			move = -($("#gallery .gallerySlider").width() - $("#gallery .gallery-preview-inner").width());
		}
		
		
		modules.cardGallery.gallery.actualPhotoObject = $("#gallery .gallerySlider li.photo").eq(newIndex);
		$("#gallery .gallerySlider").stop(true,false).animate({
			'margin-left': (move)+'px'
		},{
			duration: 370,
			easing: 'customOutCube'
		});
		if(move != modules.cardGallery.gallery.actualMargin)
		{
			modules.cardGallery.gallery.actualMargin = move;
			modules.cardGallery.gallery.actualPhoto = newIndex;			
		}
		else
		{
			if(chan>0 && modules.cardGallery.gallery.imagesBig.length < modules.cardGallery.gallery.totalPhotos && !modules.cardGallery.gallery.ajaxPending)
			{
				
				modules.cardGallery.gallery.ajaxPending = true;
				$("#gallery .gallerySlider").append('<li class="galleryLoadingWrapper"></li>');
				$("#gallery .gallerySlider li.galleryLoadingWrapper").appendLoader("loaderDivSmallMain galleryLoader");
				$("#gallery .gallerySlider").width($("#gallery .gallerySlider").width()+120);
				$("#gallery .gallerySlider").stop(true,false).animate({
					'margin-left': (modules.cardGallery.gallery.actualMargin - 120)+'px'
				},{
					duration: 370,
					easing: 'customOutCube'
				});
				modules.cardGallery.gallery.page++;
				$.ajax({
					url: '/?module=cardGallery',
					type: 'POST',
					data:{
						page: modules.cardGallery.gallery.page,
						idC: modules.cardGallery.gallery.idC
					},
					success: function(d){
						if(d)
						{
							$("#gallery .gallerySlider").width($("#gallery .gallerySlider").width()-120);
							$("#gallery .gallerySlider .galleryLoadingWrapper").remove();
							modules.cardGallery.gallery.picturesToPreload = d.gallery.length;
							var html = '';
							
							for(var x in d.gallery)
							{
								if(modules.cardGallery.gallery.page > modules.cardGallery.gallery.pageForBig)
								{
									modules.cardGallery.gallery.imagesBig.push(d.gallery[x]);
								}
								var photo = parseInt(x)+12*(modules.cardGallery.gallery.page-1);
								modules.cardGallery.gallery.images[photo] = new Image();
								modules.cardGallery.gallery.images[photo].src = d.gallery[x].url;
								if(modules.cardGallery.gallery.images[photo].complete)
								{
									$("#gallery .gallerySlider").append('<li class="photo" id="'+photo+'_loadingPhoto"><a href="javascript:void(0)"><img src="'+d.gallery[x].url+'" style="display:none"></a></li>');		
									$("#"+photo+"_loadingPhoto img").fadeIn(170);
									$("#gallery .gallerySlider").width($("#gallery .gallerySlider").width()+$("#"+photo+"_loadingPhoto img").width());
									modules.cardGallery.gallery.picturesToPreload--;
									if(modules.cardGallery.gallery.picturesToPreload <= 0)
									{
										modules.cardGallery.gallery.ajaxPending = false;
									}
								}
								else
								{
									$("#gallery .gallerySlider").append('<li class="photo photoLoading" id="'+photo+'_loadingPhoto"><a href="javascript:void(0)"></a></li>');
									$("#gallery .gallerySlider").width($("#gallery .gallerySlider").width()+$("#"+photo+"_loadingPhoto").width());
									$("#"+photo+"_loadingPhoto").appendLoader("loaderDivSmallMain galleryLoader");
									modules.cardGallery.gallery.images[photo].onload=function(){
										var ph = modules.cardGallery.gallery.images.indexOf(this);
										var wid = parseInt(this.width/(this.height/$("#gallery ul.gallerySlider").height()));
										$("#"+ph+"_loadingPhoto a").html('<img src="'+this.src+'" style="display:none" >')
										$("#"+ph+"_loadingPhoto").removeClass("photoLoading").removeLoader();
										
										$("#"+ph+"_loadingPhoto img").fadeIn(170);
										$("#"+ph+"_loadingPhoto").animate({
											'width': wid
										},{
											duration: 170
										});
										$("#gallery .gallerySlider").width($("#gallery .gallerySlider").width()+(wid-100));
										modules.cardGallery.gallery.picturesToPreload--;
										if(modules.cardGallery.gallery.picturesToPreload <= 0)
										{
											modules.cardGallery.gallery.ajaxPending = false;
										}
									};
								}
								
								
							}
							$("#gallery .gallerySlider").append(html);
							modules.cardGallery.gallery.page;
						}
					}
				});
				
				
			}
		}
			
	},
	
	enlargeProductPhoto: function(additionalData,i){
		if(i != modules.cardGallery.enlargedPhoto)
		{
			$("#productImageBig a").appendLoader("loaderDivSmallMain galleryLoader");
			if(modules.cardGallery.enlargedPhotos[modules.cardGallery.enlargedPhoto])
			{
				modules.cardGallery.enlargedPhotos[modules.cardGallery.enlargedPhoto].onload = null;
			}
			modules.cardGallery.enlargedPhotos[i] = new Image();
			modules.cardGallery.enlargedPhotos[i].src = additionalData.photos[i].staticURL.m;
			if(modules.cardGallery.enlargedPhotos[i].complete)
			{
				$("#productImageBig img").attr("src",modules.cardGallery.enlargedPhotos[i].src);
				$("#productImageBig a").removeLoader();
			}
			else
			{
				modules.cardGallery.enlargedPhotos[i].onload = function(){
					$("#productImageBig img").attr("src",this.src);
					$("#productImageBig a").removeLoader();
				}
			}
		
			modules.cardGallery.enlargedPhoto = i;
			$("#gallery-zoom").attr("gallery-index",i);	
		}
	},
	init: function(json,type,additionalData){
		var pictures;
		var width =0;
		if(typeof type == 'undefined')
		{
			type = "mainpage";
		}
		if(typeof json == 'undefined')
		{
			return false;
		}
		if(typeof json =="object")
		{
			pictures = json;
		}
		else
		{
			if(json)
			{
				pictures = $.parseJSON(json);
			}
			else
			{
				pictures =[];
			}
			
		}
		if(pictures.total && pictures.idC)
		{
			modules.cardGallery.gallery.totalPhotos = parseInt(pictures.total);
			modules.cardGallery.gallery.idC = pictures.idC;
			modules.cardGallery.gallery.imagesBig = pictures.gallery;
		}
		switch(type)
		{
			case "mainpage":{
				$(document).ready(function(){
					modules.cardGallery.noResize = user_flags.isSmartphone;
					modules.cardGallery.updateProductsClasses();
					modules.cardGallery.gallery.actualPhotoObject = $("#gallery .gallerySlider li").eq(0);

					
					$("#gallery .gallery-next").bindTouchClick(function(e){
						e.preventDefault();
						modules.cardGallery.slideGallery(1);
					});
					
					$("#gallery .gallery-prev").bindTouchClick(function(e){
						e.preventDefault();
						modules.cardGallery.slideGallery(-1);
					});
					
					$(window).load(function(){
						$("#gallery .gallerySlider li").each(function(i,e){
							var wid = $(e).outerWidth(true);
							if($(e).find("img").outerWidth(true) < wid)
							{
								wid = $(e).find("img").outerWidth(true);
								$(e).width(wid); 
							}
							width+=wid+1;
						});
						//width+=2;
						$("#gallery .gallerySlider").width(width);
						if(width >= $("#gallery .gallery-preview-inner").width())
						{
							$("#gallery .gallery-ico").fadeIn(160);
						}
						//$("#gallery .gallerySlider").
					});
	
					$("#gallery-zoom").gallery({
						elementsListHolder: "#gallery .gallerySlider",
						elementsList: "li.photo",
						elementActive: "img",
						picturesList: pictures.gallery,
						isMobile: user_flags.isMobile,
						photoChosenCallback:function(i,index){
							if($('#gallery').length > 0) {
								data = $('#gallery').attr("jdata");
								GA.parseData(data);
								GA.event(structure,label);
							} 
						},
						endOfListCallback: function(){
							if(!modules.cardGallery.gallery.ajaxPending && modules.cardGallery.gallery.imagesBig.length < modules.cardGallery.gallery.totalPhotos)
							{
								modules.cardGallery.gallery.pageForBig++;
								if(modules.cardGallery.gallery.pageForBig > modules.cardGallery.gallery.page)
								{
									modules.cardGallery.gallery.ajaxPending = true;
									$.ajax({
										url: '/?module=cardGallery',
										type: 'POST',
										data:{
											page: modules.cardGallery.gallery.pageForBig,
											idC: modules.cardGallery.gallery.idC
										},
										success: function(d){
											if(d)
											{
												for(var x in d.gallery)
												{
													modules.cardGallery.gallery.imagesBig.push(d.gallery[x]);
												}
												modules.cardGallery.gallery.ajaxPending = false;
												$("#gallery-zoom .gallery-next").show();
											}
										}
									});
								}
							}
						}
					});
					
					if(user_flags.isMobile )
					{
						$("#gallery .gallery-preview-inner").smoothSwipe({
							onMove: function(e,diff){
								
								if($("ul.gallerySlider").width() < $("div.gallery-preview-inner").width())
								{
									return false;
								}
								$("#gallery .gallerySlider li img").addClass("prevent-touch");
								var move = modules.cardGallery.gallery.actualMargin+diff[0];
								$("#gallery .gallerySlider").css({
									'margin-left': move+'px'
								});
								if($("#gallery .gallerySlider").is(":animated"))
								{
									$("#gallery .gallerySlider").stop(true,false);
								}
								
								
								if(-diff[0]+modules.cardGallery.gallery.movedAlready > modules.cardGallery.gallery.actualPhotoObject.width()/2)
								{
									if(modules.cardGallery.gallery.actualPhoto < $("#gallery .gallerySlider li").length)
									{
										modules.cardGallery.gallery.movedAlready-=modules.cardGallery.gallery.actualPhotoObject.width();
										modules.cardGallery.gallery.actualPhoto++;
										modules.cardGallery.gallery.actualPhotoObject = $("#gallery .gallerySlider li").eq(modules.cardGallery.gallery.actualPhoto);
									}
									
								}
								if(diff[0]-modules.cardGallery.gallery.movedAlready > modules.cardGallery.gallery.actualPhotoObject.width()/2)
								{
									if(modules.cardGallery.gallery.actualPhoto > 0)
									{
										modules.cardGallery.gallery.movedAlready+=modules.cardGallery.gallery.actualPhotoObject.width();
										modules.cardGallery.gallery.actualPhoto--;
										modules.cardGallery.gallery.actualPhotoObject = $("#gallery .gallerySlider li").eq(modules.cardGallery.gallery.actualPhoto);
									}	
								}
							},
							onCancel: function(e,diff){
								if($("ul.gallerySlider").width() < $("div.gallery-preview-inner").width())
								{
									return false;
								}
								$("#gallery .gallerySlider li img").removeClass("prevent-touch");
								modules.cardGallery.slideGallery(0);
								modules.cardGallery.gallery.movedAlready = 0;
							},
							onSwipe: function(e,diff){
								
								$("#gallery .gallerySlider li img").removeClass("prevent-touch");
								modules.cardGallery.slideGallery(-diff[0]);
							}
						});
					}
				});
				
				
			break;}
			case "gallery":{
				$(document).ready(function(){
					
					if($("#gallery-m").length)
					{
						$("#gallery-zoom").gallery({
							elementsListHolder: "#gallery-m div.gallery",
							elementsList: ".gallery-item-m",
							elementActive: "p a",
							isMobile: user_flags.isMobile,
							isTouch: user_flags.isMobile,
							photoChosenCallback:function(i,index){
								if($('.gallery').length > 0) {
									data = $('.gallery').attr("jdata");
									GA.parseData(data);
									GA.event(structure,label);
								} 
							},
							picturesList: pictures.gallery
						});
					}
					else
					{
						$("#gallery-zoom").gallery({
							elementsListHolder: "#gallery div.gallery",
							elementsList: ".gallery-item",
							elementActive: "p a",
							isMobile: user_flags.isMobile,
							photoChosenCallback:function(i,index){
								if($('.gallery').length > 0) {
									data = $('.gallery').attr("jdata");
									GA.parseData(data);
									GA.event(structure,label);
								} 
							},
							picturesList: pictures.gallery
						});
					}
					
				});
			break;}
			case "products":{
				$(document).ready(function(){
					if(pictures.length > 0)
					{
						$("#gallery-zoom").gallery({
							elementsListHolder: "#products-services ul",
							elementsList: "li.oldProd",
							elementActive: "img",
							isMobile: user_flags.isSmartphone,
							picturesList: pictures
						});
					}
					modules.cardGallery.noResize = user_flags.isSmartphone;
					modules.cardGallery.updateProductsClasses();
				});
			break;}
			
			case "productMsw":
			case "product":{
				var isMsw = (type == "productMsw");
				modules.cardGallery.enlargedPhoto = 0;
				modules.cardGallery.enlargedPhotos = [];
				if(additionalData)
				{
					additionalData = $.parseJSON(additionalData);
				}
				else
				{
					additionalData = {};
				}
				
				
				$(document).ready(function(){
					if(pictures.length > 0)
					{

						if(user_flags.isSmartphone)
						{
							
							$("#productImageBig .productWrapper").slider({
								nextButton: $("#productImageBig .gallery-next"),
			            		prevButton: $("#productImageBig .gallery-prev"),
			            		useTouch: user_flags.isMobile,
								animationOptions:{
			                    	duration: 370,
			                    	easing: 'customOutCube'
			                    }
							});
							
							var settings = {
								elementsListHolder: "#productImageBig .productWrapper .slider",
								elementActive: "a",
								picturesList: pictures,
								isMobile: user_flags.isMobile,
								forceIndex: true,
								forceTitle: additionalData.title
							};
							
							if(!isMsw)
							{
								settings['setImageData'] = function(e,scope,completeFunc){
									// gallery iframe
									scope.parent.find(".photo").appendLoader("loaderDivSmallMain photoLoader");
									var i = scope.actualIndex;
									var url = 'http://www.'+additionalData.domain+'/galeria.html?photo='+encodeURIComponent(additionalData.photos[i].staticURL.l)+
												'&alt='+encodeURIComponent(additionalData.photos[i].phAlt);
									scope.parent.find(".photo .photo-inner").remove();
									scope.parent.find(".photo").html('<iframe  class="photo-inner" style="diplay:none;" width="100%" height="100%" scrolling="no"  frameborder="0" src="'+url+'"></iframe>');
									scope.parent.find(".photo").appendLoader("loaderDivSmallMain photoLoader");
									//scope.parent.find(".photo .photo-inner").attr("src",url);
									scope.parent.find(".photo .photo-inner").bind("load",function(){
										completeFunc();
										scope.parent.find(".photo").removeLoader();
									});
								};
							}
							$("#gallery-zoom").gallery(settings);
							
							
						}
						else
						{
							$("#gallery-zoom").attr("gallery-index",0);
							$("#productImageBig").gallery({
								elementsListHolder: "div.product-thumbs",
								elementsList: "a",
								picturesList: pictures,
								
								closePhotoCallback: function(){},
								foundPhotoCallback: function(e,i){
									modules.cardGallery.enlargeProductPhoto(additionalData,i);
								}
							});
							
							var settings = {
								elementsListHolder: "#productImageBig",
								elementActive: "",
								forceIndex: true,
								picturesList: pictures,
								isMobile: user_flags.isMobile,
								forceTitle: additionalData.title
							};
							if(!isMsw)
							{
								// gallery iframe
								settings['setImageData'] = function(e,scope,completeFunc){
									scope.parent.find(".photo").appendLoader("loaderDivSmallMain photoLoader");
									var i = scope.actualIndex;
									var url = 'http://www.'+additionalData.domain+'/galeria.html?photo='+encodeURIComponent(additionalData.photos[i].staticURL.l)+
												'&alt='+encodeURIComponent(additionalData.photos[i].phAlt);
									scope.parent.find(".photo .photo-inner").remove();
									scope.parent.find(".photo").html('<iframe  class="photo-inner" style="diplay:none;" width="100%" height="100%" scrolling="no"  frameborder="0" src="'+url+'"></iframe>');
									scope.parent.find(".photo").appendLoader("loaderDivSmallMain photoLoader");
									scope.parent.find(".photo .photo-inner").bind("load",function(){
										completeFunc();
										scope.parent.find(".photo").removeLoader();
									});
								};
							}
							
							
							$("#gallery-zoom").gallery(settings);
							
						}
						
					}
					else
					{
						$("#productImageBig .gallery-ico").addClass("inactive");
					}
					
				});
			break;}
		}
		
	},

	switchOrientation: function(){
		if(user_flags.isSmartphone && $("#productImageBig .productWrapper").length > 0)
		{
			$("#productImageBig .productWrapper").updateSlider();
		}
		
	}
}
window['modules']['cardGallery'] = modules.cardGallery;


/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleDeal.js */


var timeoutID = 0;

modules.deal = {
	timeToEnd: {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	switchOrientation: function(isPortrait){
		var foto = $("#deal-photo-inner");
		if(isPortrait)
		{
			foto.css({
				'margin-left': '0px',
				'margin-top':'0px'
			});
		}
		else
		{
			foto.css({
				'margin-left':-parseInt($("#deal-photo-inner").width()/2)+'px',
				'margin-top':-parseInt($("#deal-photo-inner").height()/2)+'px'
			});
		}
	},
	setTime: function(num,type,doFast)
	{
		if(num < 0)
		{
			switch(type)
			{
				case 'Hour':{num=23; break;}
				default:{num=59; break;}
			}
		}
		var hei = $("#time"+type+" .digit-a.digit2").height();
		var num1 = parseInt(num/10);
		var num2 = num%10;
		var durr = (doFast)?350:1000;
		$("#time"+type+" .digit-a.digit2").html(num2);

		if(num%10 == 9 || doFast)
		{
			$("#time"+type+" .digit-a.digit1").html(num1);
		}
		//$(".timeHolder").css("overflow","visible");
		/*
		$("#time"+type+" .digit-b.digit2").html(num2);
		$("#time"+type+" .digit-b.digit2").stop(true,true).animate({
			top:'0px'
		},{
			duration: durr,
			easing: 'linear',
			step: function(n,t){
				if(t.prop == "top")
				{
					$("#time"+type+" .digit-a.digit2").css("top",(hei+n)+"px");
				}
			},
			complete:function(){
				$("#time"+type+" .digit-a.digit2").html(num2).css("top","0px");
				$("#time"+type+" .digit-b.digit2").css("top","-100%");
			}
		});
		if(num%10 == 9 || doFast)
		{
			$("#time"+type+" .digit-b.digit1").html(num1);
			$("#time"+type+" .digit-b.digit1").stop(true,true).animate({
				top:'0px'
			},{
				duration: durr,
				easing: 'linear',
				step: function(n,t){
					if(t.prop == "top")
					{
						$("#time"+type+" .digit-a.digit1").css("top",(hei+n)+"px");
					}
				},
				complete:function(){
					$("#time"+type+" .digit-a.digit1").html(num1).css("top","0px");
					$("#time"+type+" .digit-b.digit1").css("top","-100%");
				}
			});
		}
		*/
		
	},
	animateClock: function(){
		var clock = modules.deal.timeToEnd;
		if(clock.days < 0)
		{
			clock.days = 0;
			clock.hours = 0;
			clock.minutes = 0;
			clock.seconds = 0;
		}
		else
		{
			clock.seconds--;
			modules.deal.setTime(clock.seconds,"Second");
			if(clock.seconds < 0)
			{
				clock.seconds = 59;
				clock.minutes --;
				modules.deal.setTime(clock.minutes,"Minute");
			}
			if(clock.minutes < 0)
			{
				clock.minutes = 59;
				clock.hours --;
				modules.deal.setTime(clock.hours,"Hour");
			}
			if(clock.hours < 0)
			{
				clock.hours = 23;
				clock.days --;
				modules.deal.setTime(clock.days,"Day");
			}
			window.setTimeout(modules.deal.animateClock,1000);
		}
	},
	
	setTop: function(ob,durr){
		var top = ($(".get-coupon-box").height() -  $(".get-coupon-wrapper").height()/2)/2+8;
		ob.animate({
			top:-parseInt(top)
		},{
			duration: durr
		})
	},
	
	init: function(json){
		if(Pop.isObject(json))
		{
			modules.deal.timeToEnd = json;
		}
		else
		{
			modules.deal.timeToEnd = $.parseJSON(json);
		}
		
		
		if($("#deal-photo-inner").length > 0 && $("#deal-photo-inner").attr("data"))
		{
			var foto = $("#deal-photo-inner");
			var img = new Image();
			foto.parent().appendLoader();
			foto.hide().css("visibility","visible");
			img.src = foto.attr("data");
			if(img.complete)
			{
				foto.attr("src",img.src);
				if(!user_flags.isSmartphone)
				{
					foto.css({
						'margin-left':-parseInt($("#deal-photo-inner").width()/2)+'px',
						'margin-top':-parseInt($("#deal-photo-inner").height()/2)+'px'
					});
				}
				
				foto.parent().removeLoader();
				foto.fadeIn(170);
			}
			else
			{
				img.onload = function(){
					foto.attr("src",img.src);
					if(!user_flags.isSmartphone)
					{
						foto.css({
							'margin-left':-parseInt($("#deal-photo-inner").width()/2)+'px',
							'margin-top':-parseInt($("#deal-photo-inner").height()/2)+'px'
						});
					}
					foto.parent().removeLoader();
					foto.fadeIn(170);
				}
			}
			
		}
		
		if( modules.deal.timeToEnd.days >= 0 &&
			modules.deal.timeToEnd.hours >= 0 &&
			modules.deal.timeToEnd.minutes >= 0 &&
			modules.deal.timeToEnd.seconds >= 0)
		{
			modules.deal.setTime(modules.deal.timeToEnd.seconds,"Second",true);
			modules.deal.setTime(modules.deal.timeToEnd.minutes,"Minute",true);
			modules.deal.setTime(modules.deal.timeToEnd.hours,"Hour",true);
			modules.deal.setTime(modules.deal.timeToEnd.days,"Day",true);
			modules.deal.animateClock();
		}
		else
		{
			modules.deal.setTime(0,"Second",true);
			modules.deal.setTime(0,"Minute",true);
			modules.deal.setTime(0,"Hour",true);
			modules.deal.setTime(0,"Day",true);
		}
		
                $('.get-coupon-wrapper .get-coupon-success .btn-ok-wrapper span').on('click', function(){
                    $('.get-coupon-success').addClass('none'); 
                    $('.get-coupon-box').hide(); 
                    return false;
                });


		$("div.get-coupon-wrapper p.get-coupon a").bindTouchClick(function(e){
			//czyszczenie setTimeout z blura
			clearTimeout(timeoutID);
			
			var baseHeight = $(document).height();
			var parent = $(this).closest(".get-coupon-wrapper");
			
			var ob = $(this).closest(".get-coupon-wrapper").children(".send-email-box");
			
			$(".send-email-box .error").removeClass('error');

			var scroll = 0;
			e.preventDefault();
			
			ob.find("form").show();

			ob.css("visibility","hidden");
			ob.css("display","block");

			ob.find(".dSecCodeContainer").show();
			
			
			if(ob.outerHeight(true) > $(window).height())
			{
				scroll = ob.offset().top -15;
			}
			else
			{
				scroll = ob.offset().top+ob.outerHeight(true) - $(window).height();
			}
			
			if($(window).scrollTop() < scroll)
			{
				$('html, body').animate({
					scrollTop: scroll
				},{
					duration: 175
				})
			}
			
			ob.find(".dSecCodeContainer").hide();
			ob.css("display","none");
			ob.css("visibility","visible");
			
                        
                        
			//czyszczenie pol
			$('.get-coupon-form').removeClass('none');
			$('.get-coupon-success').addClass('none');
			$('.get-coupon-error').addClass('none');
			//$(".get-coupon-box form #email-b").focus();
			//$(".get-coupon-box form input").not("input[name=idDeal]").val('');
			//$(".get-coupon-box form input[type=checkbox]").prop('checked', false);
			//czyszczenie pol
			modules.deal.setTop(ob,120);
			/*
			ob.animate({
				'top': '-130px'
			},{
				duration: 120
			})
			*/
			ob.fadeIn(120,function(){
				if(!user_flags.isSmartphone)
					modules.deal.canCloseCoupon = true;
			});
			ob.css("z-index","5");
		});
		
		$("div.get-coupon-wrapper").clickedOutside(function(){
			if(modules.deal.canCloseCoupon)
			{
				$("div.get-coupon-wrapper div.send-email-box").fadeOut(120);
				modules.deal.canCloseCoupon = false;	
			}
		});
		
		$(".get-coupon-box form .required").focus(function(){
			$(this).closest("div").removeClass("error");
		}).blur(function(){
			showError = false;
			if($(this).hasClass('email') && !Validate.email($(this).val()))
			{
				showError = true;
			}
			else if(!$(this).is(':checkbox') && $(this).val() == '')
			{
				showError = true;
			}
			
			if(showError)
			{
				THIS = this;
				timeoutID = setTimeout(function(){
					$(THIS).closest("div").addClass("error");
				},200);
			}
		});
		
		$(".get-coupon-box form").submit(function(e){
			e.preventDefault();
			var errNum = 0;
			$(".get-coupon-box form .required").each(function(){
				showError = false;
				if($(this).hasClass('email') && !Validate.email($(this).val()))
				{
					showError = true;
				}
				else if($(this).is(':checkbox') && !$(this).is(':checked'))
				{
					showError = true;
				}
				else if(!$(this).is(':checkbox') && $(this).val() == '')
				{
					showError = true;
				}
				
				if(showError)
				{
					errNum++;
					$(this).closest("div").addClass("error");
				}
			});
			
			if(!errNum)
			{
				var post = $(".get-coupon-box form").serialize();
				if(user_flags.isSmartphone)
				{
					$('html, body').animate({
						scrollTop: $("div.get-coupon-box").offset().top -15
					},{
						duration: 175
					})
				}
				$("div.get-coupon-box").appendLoader();
				$.ajax({
					url: '/?module=dealCouponCard',
					type: 'POST',
					data: post,
					dataType: 'json',
					success: function(e){
						$("div.get-coupon-box").removeLoader();
						
						if(e.result == 1)
						{
							$('.get-coupon-success').removeClass('none');
							$('.get-coupon-error').addClass('none');
							$('.get-coupon-form').addClass('none');
							modules.deal.setTop($('.get-coupon-box'),300);
							$(".get-coupon-box form input").not("input[name=idDeal], input[type=submit]").val('');
							$(".get-coupon-box form input[type=checkbox]").prop('checked', false);
							
							
						}
						else
						{
							$('.get-coupon-error').removeClass('none');
							$('.get-coupon-success').addClass('none');
							$('.get-coupon-form').addClass('none');
							
						}
						if(user_flags.isSmartphone)
						{
							if(e.result == 1)
							{
								$("p.get-coupon").addClass("none");
								$(".get-coupon-box").css("margin-top","0px");
							}
							$('html, body').animate({
								scrollTop: $("div.get-coupon-box").offset().top -15
							},{
								duration: 175
							})
						}
					}
				})
			}
		});
			
	}
};

window['modules']['deal'] = modules.deal;

/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleReview.js */


modules.review = {
	maximumCharacters: 500,
	isDetailed: false,
	validateAll: function(){
		var err = false;
		if($("#fSecCode").val() == "")
		{
			$("#fSecCode").parent().addClass("error");
			err = true;
		}
		else
		{
			$("#fSecCode").parent().removeClass("error");
		}

		if($("#opinion").val() == "")
		{
			$("#opinion").parent().addClass("error");
			err = true;
		}
		else
		{
			$("#opinion").parent().removeClass("error");
		}
		
		if(!Validate.email($("#email").val()))
		{
			$("#email").parent().addClass("error");
			err = true;
		}
		else
		{
			$("#email").parent().removeClass("error");
		}
		
		if($("#sign").val() == "")
		{
			$("#sign").parent().addClass("error");
			err = true;
		}
		else
		{
			$("#sign").parent().removeClass("error");
		}
		
		if(!$("#accept-terms").is(":checked"))
		{
			$("#accept-terms").parent().addClass("error");
			err = true;
		}
		else
		{
			$("#accept-terms").parent().removeClass("error");
		}
		
		if($("input[name=review_0]").val() == "")
		{
			err = true;
		}
		
		
		return !err;
	},
	init: function(){
		$(".showReviews").click(function(){
			var ob = $(this).parent().parent().children().children(".secondary-drawer");
			var hei = 0;
			if(ob.parent().height() == 0)
			{
				hei = ob.children(".left").outerHeight(true);
				$(this).children(".show-ratings").removeClass("open").addClass("close");
			}
			else
			{
				$(this).children(".show-ratings").removeClass("close").addClass("open")
			}
			ob.parent().stop(true,false).animate({
				height: hei+"px"
			},{
				easing: 'customOutSmooth',
				duration: 170,
				complete:function(){
					ob.parent().css({
						height: hei+"px"
					});
				}
			});	
		});
		
		
		$("#opinion, #sign, #fSecCode").bind("blur focus", function(e){
			if($(this).val() !== "" || e.type==="focus")
			{
				$(this).parent().removeClass("error");
			}
			else
			{
				$(this).parent().addClass("error");
				err = true;
			}
		});
		
		$("#email").bind("blur focus", function(e){
		
			if(!Validate.email($("#email").val()) && e.type==="blur")
			{
				$("#email").parent().addClass("error");
				err = true;
			}
			else
			{
				$("#email").parent().removeClass("error");
			}
		});
		

		$(".your-rate li, .your-rate-a li").click(function(e){
			e.preventDefault();
			var ob = $(this);
			var index1 = $(".your-rate, .your-rate-a").index($(this).parent());
			var index2 = $(this).parent().children("li").index($(this));
			$("input[name=review_"+index1+"]").val(index2+1);
			$(this).siblings("li").not(this).removeClass("checked");
			$(this).addClass("checked");
		});
		$("p.details-ratings").click(function(e){
			var ob = $(this).parent().children("div.details-ratings");
			var hei = 0; 
			if($(this).hasClass("open"))
			{ 
				hei = ob.children(".details-ratings-inner").outerHeight(true);
				modules.review.isDetailed = true;
				ob.stop(true,false).animate({
					height: hei+"px"
				},{
					easing: 'customOutSmooth',
					duration: 170,
					complete:function(){
						ob.css({
							height: hei+"px"
						});
					}
				});	
				$(this).hide();
				$("p.details-ratings.close").show();
				
			}
			else
			{
				modules.review.isDetailed = false;
				ob.stop(true,false).animate({
					height: hei+"px"
				},{
					easing: 'customOutSmooth',
					duration: 170,
					complete:function(){
						ob.css({
							height: hei+"px"
						});
					}
				});	
				$(this).hide();
				$("p.details-ratings.open").show();
			}
			
		});
		$("form.reviewForm #opinion").bind("keydown keyup", function(){
			
			var charsLeft = modules.review.maximumCharacters-$(this).val().length;
			if($(this).val().length > modules.review.maximumCharacters)
			{
				$(this).val($(this).val().substr(0,modules.review.maximumCharacters));
			}
			
			$(this).parent().parent().children(".signs-left").children(".charactersLeft").html(charsLeft);
		});
		$(".reviewForm .submit").click(function(e){
			e.preventDefault();
			if(modules.review.validateAll())
			{
				$("form.reviewForm").submit();
				
			}
		});
		
		
	}	
}
window['modules']['review'] = modules.review;

/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleShares.js */

modules.cardShare = {
		init : function()
		{
			$(".card-share").parent().click(function(e)
			{
				if($('.card-social-network').hasClass('inactive'))
				{
					$('.card-social-network').removeClass('inactive');
					GA.useDataTag(this);
				}
				else
				{
					$('.card-social-network').addClass('inactive');
				}
				
			});
		}
};

modules.productsShare = {
		init : function()
		{
			$(".product-share").click(function(e)
			{	
				if($('.product-social-network').hasClass('inactive'))
				{
					GA.useDataTag(this);
					$('.product-social-network').removeClass('inactive');
				}
				else
				{
					$('.product-social-network').addClass('inactive');
				}		
			});
		}
};

modules.dealShare = {
		init : function()
		{
			$(".deal-share").click(function(e)
			{	
				if($('.deal-social-network').hasClass('inactive'))
				{
					GA.useDataTag(this);
					$('.deal-social-network').removeClass('inactive');
				}
				else
				{
					$('.deal-social-network').addClass('inactive');
				}		
			});
		}
};
window['modules']['cardShare'] = modules.cardShare;

/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleWorkHours.js */


modules.workHours ={
	data: {},
	actualDay: 0,
	inited: false,
	moveToDay: function(ob,day,quick){
		var actualId = 0;
		var parent = ob.parent();
		var li = parent.children("ul").children("li").eq(day);
		var move= parseInt(li.offset().left - li.parent().offset().left)-1;
		if(li.closest(".open-hours-wrapper").attr("work-hours"))
		{
			actualId = parseInt(li.closest(".open-hours-wrapper").attr("work-hours"));
			if(!modules.workHours.data.workHours[actualId])
			{
				actualId =0;
			}
		}
		
		if(quick)
		{
			var parent = li.closest(".open-hours-wrapper");
			$(".open-hours-holder .open-hours li").removeClass("active");
			$(".open-hours-holder .open-hours").each(function(i,e){
				$(e).children("li").eq(day).addClass("active");
			});
			
			parent.find(".workHoursText").html(modules.workHours.data.workHours[actualId][day].openString);
			li.addClass("active");
			ob.css({
				left:move+"px",
				width: li.outerWidth(true)+3
			}).show();
		}
		else
		{
			var parent = li.closest(".open-hours-wrapper");
			parent.children(".open-hours-holder").children(".open-hours").children("li").removeClass("active");
			parent.children(".open-hours-holder").children(".open-hours").children("li").eq(day).addClass("active");
			parent.find(".workHoursText").html(modules.workHours.data.workHours[actualId][day].openString);
			parent.find(".open-hours-holder .workHourActive").animate({
				left: move+"px",
				width: li.outerWidth(true)+3
			},{
				duration: 120,
				easing: 'customOutSmooth',
				complete: function(){
					ob.css({
						left: move+"px",
						width: li.outerWidth(true)+3
					});
				}
			});
		}
		$(".workHoursText").show();
		modules.workHours.actualDay = day;
	},
	
	init: function(json){
		if(!modules.workHours.inited)
		{
			modules.workHours.data = $.parseJSON(json);
			$(document).ready(function(){
				$(".open-hours li").bindTouchClick(function(e){
					e.preventDefault();
					var index = $(this).parent().children("li").index(this);
					var ob = $(this).parent().parent().children(".workHourActive");
					modules.workHours.moveToDay(ob,index);
				});
				$(".workHourActive").hide();
				$(".open-hours").each(function(i,e){
					var index = modules.workHours.data.currentDay;
					var ob = $(this).parent().children(".workHourActive")
					modules.workHours.moveToDay(ob,index,true);
				});
			});
			modules.workHours.inited = true;
		}
		
	}
}
window['modules']['workHours'] = modules.workHours;

/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleThemeBar.js */

modules.themeBar = {
	actualThemePhotos: false,
	init : function (data, baseThumbnailUrl, basePhotosUrl, photoSufix)
	{
		this.data = data;
		this.tradesPhotos = data.tradePhotos;
		this.idThemePic = this.data.idThemePic;

		$('a').click( modules.themeBar.modifyLinks );
		
		$('#choose-foto').clickedOutside(function(e){
			if($(e.target).closest("#select-b-l").length == 0)
			{
				$('#choose-foto').slideUp(90);
			}
			
		});
		$('#themeColorSelect').clickedOutside(function(e){
			$("#themeColorSelect ul").slideUp(90);
		});

		$("#themeColorSelect").click(function(e){
			e.preventDefault();
			if($("#themeColorSelect ul").is(":visible"))
			{
				$("#themeColorSelect ul").slideUp(90);
			}
			else
			{
				$("#themeColorSelect ul").slideDown(120);
			}
			
		});
		$("#themeImageSelect").click(function(e){
			if($("#choose-foto").is(":visible"))
			{
				$('#choose-foto').slideUp(90);
			}
			else
			{
				modules.themeBar.showPhotos(modules.themeBar.actualThemePhotos);
			}
		});
		$(".themeColorSelector li a").click(function(e){
			e.preventDefault();
			$("#themeColorSelect span").html($(this).text());
			modules.themeBar.setTheme(parseInt($(this).attr("data-theme")));
		});

		$("#show-trade-foto").click(function(e){
			e.preventDefault();
			$("#list-img").hide();
			$("#list-trade").show();
		});

		$('body').on('click','#list-img-box img',function(e){
			e.preventDefault();
			var id = parseInt($(this).attr('id'));
			var bigPhoto = $(this).attr('data-bigPhoto');

			if(id || bigPhoto)
			{
				$("#desc-company-a").removeClass("no-branding");
			}
			else
			{
				$("#desc-company-a").addClass("no-branding");
			}
			$("#desc-company-a").parent().children(".branding").remove(); 
			modules.themeBar.setPhoto(id, bigPhoto);
		});
	},

	setPhoto : function (id, bigPhoto)
	{
		if (bigPhoto) {
			this.data.idThemePic = 'o'+id;
			var photoUrl = bigPhoto;
		}
		else {
			this.data.idThemePic = id;
			var photoUrl = this.data.photosPath + '/' + id + this.data.photoSufix;
		}
		if($("#desc-company-a .branding").length > 0)
		{
			if (id){
				$('#theme-img').attr('src', photoUrl).show();
				
			}
			else{
				$('#theme-img').hide();
			}
		}
		else
		{
			$("#desc-company-a").parent().append('<div class="branding"><p><img alt="" src="'+photoUrl+'" id="theme-img"></p></div>');
		}
	},

	showTrades : function ()
	{
		$('#trade-name').html('Wybierz branżę');
	},

	showPhotos : function (idTrade, tradeName)
	{
		modules.themeBar.actualThemePhotos = idTrade;
		var ids = [0].concat(this.tradesPhotos[idTrade]);
		var bigPreload = [];
		if(tradeName)
		{
			$("#trade-name").html(tradeName);
		}
		
		$('#choose-foto').slideDown(120);
		$('#list-img-box').html('');
		var html = '';
		for (var i in ids)
		{
			var idPhoto = ids[i];
			if (idPhoto.bigPhoto) {
				var bigImg = new Image(); bigPreload.push(bigImg); bigImg.src = idPhoto.bigPhoto;
				html+='<div class="imageWrapper"><img width="100" height="44" src="'+ this.data.thumbnailPath + '/0.jpg" data="'+idPhoto.thumbnail+'" id="'+idPhoto.id+'_photo" data-bigPhoto="'+idPhoto.bigPhoto+'"/></div>';
			}
			else {
				var bigImg = new Image(); bigPreload.push(bigImg); bigImg.src = this.data.photosPath + '/' + idPhoto + this.data.photoSufix;
				html+='<div class="imageWrapper"><img width="100" height="44" src="'+ this.data.thumbnailPath + '/0.jpg" data="'+ this.data.thumbnailPath + '/' + idPhoto + '.jpg" id="'+idPhoto+'_photo"/></div>';
			}
		}
		$('#list-img-box').html(html);
		$('#list-img-box div.imageWrapper').appendLoader("loaderDivSmallMain galleryLoader");
		$('#list-img-box img').preload(function(){
			$(this).attr("src",$(this).attr("data"));
			$(this).css("visibility","visible");
			$(this).parent().removeLoader();
		});

		$('#list-img').show();
		$("#list-trade").hide();
	},

		
	setTheme : function (idTheme)
	{
		var theme = this.data.themes[ idTheme ];
		this.data.photoSufix = theme.photoSufix;
		this.setPhoto(this.data.idThemePic);

		$('body').removeClass( this.data.themeClass ).addClass(theme.themeClass);
		this.data.themeClass = theme.themeClass;
		this.data.idTheme = idTheme;
	},

	/**
	 * zapis themesa
	 */
	saveTheme : function ()
	{
		this.data.saveUrl = 'https://profil.'+cfg.domain+'/oferta-firmy/zmien-wyglad-prezentacji.html?setTheme=';
		window.location.href = this.data.saveUrl + this.data.idTheme + '&idThemePic=' + this.data.idThemePic
	},


	/**
	 * modyfikacja linkow (mozliwe przejscie miedzy zakladkami z zachowanym themem i obrazkiem)
	 */
	modifyLinks : function ()
	{
		var href = $(this).attr('href');
		if (href && href.match( document.location.origin))
		{
			if (href.match('\\?'))
			{
				href = href.replace(/setView=\d*/, '').replace(/idThemePic=\d*/, '').replace(/&{2,}/g, '&').replace(/&$/, '') + '&';
			}
			else
			{
				href += '?';
			}
			href += 'setView=' + modules.themeBar.data.idTheme + '&idThemePic=' + modules.themeBar.data.idThemePic;

			//$(this).attr('href', href);
			document.location.href = href;
			return false;
		}
	}
}


/* content of: /usr/home/directory/branches/stable/soft/2.0/layouts/app/firmy//_js/modules/moduleMap.js */

var _mapObjectMB = function(d){
	var mapObject = false, gmapObject = false, streetViewMode = false;
	var cardPointers = ['marker-gold', 'marker-gold', 'marker-bussines', 'marker-starter', 'marker-orange'];
	var THS = this;
	var _load = function(){
		mapboxgl.accessToken = 'pk.eyJ1Ijoibm52IiwiYSI6ImNqbXJkZTJ5MDF0cW8zdm9lYTZkZWFpb2kifQ.2VeZMu0YfxUJjV_KsHxNaA';
		mapObject = new mapboxgl.Map({ 
			container: d.id,
			center: new mapboxgl.LngLat(d.lng, d.lat), 
			minZoom : 8,
			maxZoom : 20,
			zoom: 14,
			style: 'mapbox://styles/mapbox/streets-v10'
		});
 
		mapObject.addControl(new mapboxgl.NavigationControl());
		
		mapObject.on("load", function(){
			_addMarker();
			d.callback.call(THS);
		});
		//modules.mapbox.putMarker(modules.map.pointData);
	}
	
	var _addMarker = function() {
		//var el = $('<div></div>').addClass('marker').css({width: '34px', height: '49px', backgroundSize:'34px 49px', backgroundImage: 'url(' + (cfg.static + '/gfx/'+cardPointers[cfg.idCardType]+(cfg.isRetina? '@2x': '') ) + '.png)'});
		var el = document.createElement('div');
		el.className = 'marker';
		el.style.backgroundImage = 'url(' + (cfg.static + '/gfx/'+cardPointers[cfg.idCardType]+(cfg.isRetina? '@2x': '') ) + '.png)';
		el.style.width = '34px';
		el.style.height = '49px';
		el.style.backgroundSize = '34px 49px';
		new mapboxgl.Marker(el).setLngLat(new mapboxgl.LngLat(d.lng, d.lat)).addTo(mapObject);
	};
	
	this.load = function(){
		if(!window._MBLoaded)
		{
			$("head").append("<link rel='stylesheet' type='text/css' href='https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css' />");
			$.getScript( "https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js", function( data, textStatus, jqxhr ) {
				window._MBLoaded = true;
				_load();
			});
		}
		else
		{
			_load();
		}
		return this;
	}
	

	var _fireGmap = function(cb, param){
		var parentMap = $('#'+d.id);
		if($('#'+d.id+'_gm-holder').length == 0)
		{
			parentMap.parent().append('<div id="'+d.id+'_gm-holder" style="position: absolute; top: 0; left: 0; width:'+parentMap.width()+'px; height:'+parentMap.height()+'px" ></div>');
			parentMap.parent().appendLoader("loaderDivSmallMain loaderDivMapMain");
			parentMap.css({ visibility: 'hidden', pointerEvents: 'none'});
			
			gmapObject = new _mapObjectGM({
				id: d.id+'_gm-holder',
				lat: d.lat,
				lng: d.lng,
				callback: function(){
					gmapObject[cb](param);
					window.setTimeout(function(){ parentMap.parent().removeLoader(); }, 300);
				}
			});
		}
		else
		{
			parentMap.parent().appendLoader("loaderDivSmallMain loaderDivMapMain");
			parentMap.css({ visibility: 'hidden', pointerEvents: 'none'});
			$('#'+d.id+'_gm-holder').show();
			gmapObject.resetMapView();
			gmapObject[cb](param);
			window.setTimeout(function(){ parentMap.parent().removeLoader(); }, 300);
		}
	};
	
	this.showStreetView = function(){ _fireGmap('showStreetView'); streetViewMode = true; }
	this.displayRoute = function(adress){ _fireGmap('displayRoute', adress); routeDisplayed = true; }
	
	
	this.removeRoute = function() {
		if(gmapObject) gmapObject.removeRoute();
		routeDisplayed = false;
	};
	
	/*
	this.showLastRoute = function(){
	    $("#content-map-image-inner").css("float","right").addClass("active");
	    $("#directions-panel").removeClass('inactive').show();
	    if(clientMarker) clientMarker.setMap(null);
	    
	    setTimeout(function()
	    {
	    	clientMarker = _addMarker(clientLat, clientLng, cfg.static + '/gfx/marker-gray'+(cfg.isRetina? '@2x': '')+'.png');
			directionsDisplay.setPanel(document.getElementById('directions-panel'));
			var bounds = lastRoute.routes[0].bounds;
	
			mapObject.fitBounds(bounds);
			mapObject.setCenter(bounds.getCenter());
	       //THIS.mapRecenter(-150,-50);
	        
	       directionsDisplay.setDirections(lastRoute);
	       routeDisplayed = true;
	    },350);
	};
	*/
	
	
	this.showMapView = function() {
		var parentMap = $('#'+d.id);
		streetViewMode = false;
		
		parentMap.parent().appendLoader("loaderDivSmallMain loaderDivMapMain");
		//gmapObject.showMapView();
		$('#'+d.id+'_gm-holder').hide();
		parentMap.css({ visibility: 'visible', pointerEvents: ''});
		parentMap.parent().removeLoader();
	};
	
	this.resetMapView = function(){ mapObject.resize(); };
	this.centerMap = function(){ mapObject.resize(); mapObject.panTo(new mapboxgl.LngLat(d.lng, d.lat)); };
	this.zoomin = function() { mapObject.setZoom(mapObject.getZoom()+1); };
	this.zoomout = function() { mapObject.setZoom(mapObject.getZoom()-1); };
	this.isStreetViewActive = function(){ return streetViewMode; };
	
	this.load();
};

var _mapObjectGM = function(d){
	var mapObject = false, clientMarker = false, marker = false, routeDisplayed = false, lastRoute = false, streetViewMode = false;
	var latLng = false, directionsDisplay = false, directionsService = false, lastAddress = false, lastRoute = false, routeDisplayed = false;
	
	var clientLat = 0, clientLng = 0;
	var cardPointers = ['marker-gold', 'marker-gold', 'marker-bussines', 'marker-starter', 'marker-orange'];
	var THS = this;
	
	var _addMarker = function(lat, lng, img) {
		var temppos = lat? new google.maps.LatLng(lat, lng): latLng;
		return new google.maps.Marker({
	       position: temppos,
	       icon : new google.maps.MarkerImage(img? img: cfg.static + '/gfx/'+cardPointers[cfg.idCardType]+(cfg.isRetina? '@2x': '') + '.png',null,null,null,new google.maps.Size(34,49)),
	       map: mapObject,
	       animation: google.maps.Animation.DROP
	     });
	};
	
	var _load = function(){
		if($('#content-map-image').css('position') == 'static') $('#content-map-image').css('position', 'relative');
		latLng = new google.maps.LatLng(d.lat, d.lng);
		mapObject = new google.maps.Map(document.getElementById(d.id),{
        	center: latLng,
        	zoom: 14,
        	minZoom :6,
        	disableDefaultUI: true,
        	styles : [ { featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" } ] } ],
        	mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        google.maps.event.addListenerOnce(mapObject, 'tilesloaded', function(){
        	_addMarker();
        	directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport : true});
        	d.callback.call(THS);
        });
	};
	
	this.load = function(cb){
		if(!window._GMLoaded)
		{
			$.getScript( "https://maps.googleapis.com/maps/api/js?"+(typeof cfg.gmapKey != 'undefined' && cfg.gmapKey? 'key=' + cfg.gmapKey + '&':'')+"v=3.exp&language=PL", function( data, textStatus, jqxhr ) {
				window._GMLoaded = true;
				_load();
			});
		}
		else
		{
			_load();
		}
		return this;
	}
	
	
	this.showStreetView = function()
	{
		
		var service = new google.maps.StreetViewService();
		service.getPanoramaByLocation(latLng, 200, function(result, status) {
			
	        if (status == google.maps.StreetViewStatus.OK) 
	        {
	        	var panorama = mapObject.getStreetView();
	          	panorama.setOptions({ addressControl: false, enableCloseButton: false, panControl: false, zoomControl: false });
	          	panorama.setPosition(result.location.latLng);
	          	panorama.setVisible(true);
	          	
	          	var heading = google.maps.geometry.spherical.computeHeading(result.location.latLng, latLng);
	          	var pov = panorama.getPov();
	          	pov.heading = heading;
	          	panorama.setPov(pov);
              
              streetViewMode = true;
	        }
	        else 
	        {
	        	alert("StreetView jest niedostępny dla tej lokalizacji");
	        	return;
	        }
		});
	};
	
	var _mapRecenter = function(offsetx,offsety) {
		
	    var point1 = mapObject.getProjection().fromLatLngToPoint(mapObject.getCenter());
	    var point2 = new google.maps.Point(
	        ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, mapObject.getZoom()) ) || 0,
	        ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, mapObject.getZoom()) ) || 0
	    );  
	    
	    mapObject.setCenter(mapObject.getProjection().fromPointToLatLng(new google.maps.Point(point1.x - point2.x, point1.y + point2.y )));
	};
	
	this.removeRoute = function() {
		
	    if(clientMarker) clientMarker.setMap(null);
	    if(directionsDisplay) directionsDisplay.setDirections({routes: []});
	    	    
	    var bounds = new google.maps.LatLngBounds();
	    bounds.extend(latLng);

	    mapObject.fitBounds(bounds);
	    mapObject.setZoom(14); 
	    $('#content-map-image-inner').removeClass("active");
	    $("#directions-panel").addClass('inactive');	    
	    
	    routeDisplayed = false;
	};
	
	var _showLastRoute = function(){
	    $("#content-map-image-inner").css("float","right").addClass("active");
	    $("#directions-panel").removeClass('inactive').show();
	    if(clientMarker) clientMarker.setMap(null);
	    
	    setTimeout(function()
	    {
	    	clientMarker = _addMarker(clientLat, clientLng, cfg.static + '/gfx/marker-gray'+(cfg.isRetina? '@2x': '')+'.png');
			directionsDisplay.setPanel(document.getElementById('directions-panel'));
			var bounds = lastRoute.routes[0].bounds;
	
			mapObject.fitBounds(bounds);
			mapObject.setCenter(bounds.getCenter());
			_mapRecenter(150,-50);
	        
	       directionsDisplay.setDirections(lastRoute);
	       routeDisplayed = true;
	    },350);
	};
	
	this.displayRoute = function(address) {
		mapObject.streetView.setVisible(false); streetViewMode = false;
		if(lastAddress == address && lastRoute)
		{
			if(routeDisplayed) return false;
			_showLastRoute();
			return true;
		}
    	//_mapRecenter(-100,0);
	    window._mapRecenter = _mapRecenter;
	    var geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'address': address }, function(results, status) 
	    {
	    	if (status == google.maps.GeocoderStatus.OK) 
	    	{
	    		
	    	    setTimeout(function()
	    	    {
		    		clientLat = results[0].geometry.location.lat();
		    		clientLng = results[0].geometry.location.lng();
		    		

				    if(clientMarker)
				    {
				    	clientMarker.setMap(null);
				   	}
				    
				    clientMarker = _addMarker(clientLat, clientLng, cfg.static + '/gfx/marker-gray'+(cfg.isRetina? '@2x': '')+'.png');
				    
				    directionsDisplay.setDirections({routes: []});
				    directionsDisplay.setMap(mapObject);
				    directionsDisplay.setOptions( { suppressMarkers: true } );
			
				    var request = {
				        origin : new google.maps.LatLng(clientLat, clientLng),
				        destination : latLng,
				        travelMode : google.maps.TravelMode.DRIVING
				    };
				    directionsService = new google.maps.DirectionsService();
				    
				    directionsService.route(request, function(response, status) {
				        if (status == google.maps.DirectionsStatus.OK) {
				    	    $("#content-map-image-inner").css("float","right").addClass("active");
				    	    $("#directions-panel").removeClass('inactive').show();
				    	    
				        	directionsDisplay.setPanel(document.getElementById('directions-panel'));
				        	var bounds = response.routes[0].bounds;
			 		
				        	mapObject.fitBounds(bounds);
				        	mapObject.setCenter(bounds.getCenter());
				            _mapRecenter(150,-50);
				             
				            directionsDisplay.setDirections(response);
				            
				            lastRoute = response;
				            routeDisplayed = true;
				            lastAddress = address;
				        }
				        else
				        {
				        	alert("Przepraszamy wystąpił nieoczekiwany błąd. Prosimy spróbować później." );
				        }
				    });
				    
	    	    },350);
	    	}
	    	else if( status = google.maps.GeocoderStatus.OVER_QUERY_LIMIT )
	    	{
	    		alert("Przepraszamy wystąpił nieoczekiwany błąd. Prosimy spróbować później." );
	    	}
	    	else 
	    	{
	    		alert("Nie udało się rozpoznać lokalizacji." );
	    	}

	    });
	};
	
	this.showMapView = function() { mapObject.streetView.setVisible(false); streetViewMode = false; };
	
	this.resetMapView = function() { google.maps.event.trigger(mapObject, "resize"); mapObject.setCenter(latLng); };
	this.centerMap = function() { mapObject.fitBounds((routeDisplayed)? lastRoute.routes[0].bounds: (new google.maps.LatLngBounds()).extend(latLng)); mapObject.setZoom(14); };
	this.zoomin = function() { mapObject.setZoom(mapObject.getZoom()+1); };
	this.zoomout = function() { mapObject.setZoom(mapObject.getZoom()-1); };
	this.isStreetViewActive = function(){ return streetViewMode; };
	
	this.load();
};


modules.map = {
	script: {
		mapbox: '',
		gmap: '',
	},
	
	scriptsLoaded: {},
	
	initCard: function(data){
		return (cfg.mapType == 2)? new _mapObjectMB(data): new _mapObjectGM(data);
	}
}
