function objview78_000(url){ 
    var obj=new Object; 
    obj.expires = _pushshowjs_.expires ? _pushshowjs_.expires : 10;
    obj.param = _pushshowjs_.param;
    obj.iWidth = 320;
    obj.iHeight = 240;
    obj.centerWid = 0;
    obj.centerHeig = 0;
    obj.iPosition = 1;
    obj.iBorder = 1;
    obj.iShowType = 1;  
    obj.bHadShow = false;
    obj.sInterval = 5;
    obj.bNeedShow = false;
    obj.bShowing = false;
    obj.hHandle; // the handle of scroll timer;
    obj.hCheckAD;  // the handle of adchecker timer;
    obj.arralreadysend = false; //
    obj.iPid = 0; 
    obj.base_url = _pushshowjs_.baseurl;
    obj.url = url;
    obj.elmHeight = 0;
    obj.policyParam = '';


    obj.GetViewHtml = function(){
      var str = '';
			if(obj.iPosition == 1){
					str = str + '<div id="_embed_v3_dc" style="overflow:hidden;margin:0;display:none;width:100%; position:relative;">';
			}else{
				  str = str + '<div id="_embed_v3_dc" style="overflow:hidden; margin:0; float:left; z-index:9998; position:fixed;display:none;width:100%;">';
			}
		if(obj.iPosition != 1){
str = str + '    <div id="_embed_v3_hd_r" style="overflow:hidden; z-index:2147483647; width:100%; height:20px; position:relative;  " onclick="javascript:document.getElementById(\'_embed_v3_dc\').style.display=\'none\'; document.getElementById(\'_embed_v3_frmc\').src=\'\'; "><img src="http://ad.zhiong.net:2525/pushjs/normalclose.png" style=" height:20px; width:50px; float:right;"  />';
	    str = str + '  <div id="_embed_v3_hd">';
	    str = str + '    <div id="_embed_v3_hd_l"></div>';
	    str = str + '    <div id="_embed_v3_hd_c"></div>';
	    str = str + '  </div></div>';
		}else{
	    str = str + '  <div id="_embed_v3_hd">';
            str = str + '    <div id="_embed_v3_hd_l"></div>';
            str = str + '    <div id="_embed_v3_hd_c"></div>';
	    str = str + '    <div id="_embed_v3_hd_r" style="z-index:2147483647; position:relative; width:100%; height:100%; float:left;" onclick="javascript:document.getElementById(\'_embed_v3_dc\').style.display=\'none\'; document.getElementById(\'_embed_v3_frmc\').src=\'\'; "><img src="http://ad.zhiong.net:2525/pushjs/topclose.png" style=" height:15px; width:15px; "  /></div>';
	    str = str + '  </div>';
		}
      str = str + '  <div id="_embed_v3_main" style="z-index:2147483646;height:100%; top:20px;"><iframe id="_embed_v3_frmc" style="border:0px;width:100%;height:100%;" scrolling="no" src="'+obj.url+'"></iframe></div>';
      str = str + '  <div id="_embed_v3_ft"></div>';
      str = str + '</div>';
        
      //alert(str);
      return str;
    };
    obj.getParams = function() {
        var paramarray = obj.param.split("|");
        obj.SetCookie(obj.policyParam,obj.policyParam, { expires: obj.expires, path: '/' });
        try {
            //obj.iWidth = parseInt(paramarray[0], 10);
	    obj.iWidth = document.body.clientWidth;
            obj.iPosition = parseInt(paramarray[3], 10);
            if(obj.iPosition == 1){
              obj.iHeight = 60;
            }else{
              obj.iHeight = 80;
            }
	    if(obj.iPosition==5){
				//obj.iHeight = 240;
				//obj.iWidth=220;
                                obj.iWidth = parseInt(paramarray[2], 10);
                                obj.iHeight = parseInt(paramarray[1], 10);
                                obj.centerWid = parseInt(paramarray[2], 10);
                                obj.centerHeig = parseInt(paramarray[1], 10);
			}else if(obj.iPosition==9){
				obj.iHeight = 42;
				obj.iWidth=283;
	    }
            //obj.iBorder = parseInt(paramarray[4], 10);
	    obj.iBorder = 1;
            obj.iShowType = parseInt(paramarray[5], 10);
            
        } catch (e) {
            obj.iWidth = 320;
            obj.iHeight = 240;
            obj.iPosition = 1;
            obj.iBorder = 1;
            obj.iShowType = 1;
           
        }
	  //alert(obj.iPosition);
	  //var useragentstr = navigator.userAgent;
	  //useragentstr = useragentstr.toLowerCase()
	  
	  //alert(useragentstr);
    };
	obj.getPolicyParam = function(){
	  	return obj.param;
	};
    obj.getStyle = function(el, style) {
        if (!document.getElementById) return;
        var value = el.style[obj.toCamelCase(style)];

        if (!value) if (document.defaultView) value = document.defaultView.getComputedStyle(el, "").getPropertyValue(style);

        else if (el.currentStyle) value = el.currentStyle[obj.toCamelCase(style)];

        return value;
    };
    obj.setStyle = function(objId, style, value) {
        document.getElementById(objId).style[style] = value;
    };
    obj.toCamelCase = function(sInput) {
        var oStringList = sInput.split('-');
        if (oStringList.length == 1) return oStringList[0];
        var ret = sInput.indexOf("-") == 0 ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
        for (var i = 1,len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            ret += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return ret;
    };
    obj.add_css = function(str_css) {
        var style;
        if (document.createStyleSheet) {
            style = document.createStyleSheet();
            style.cssText = str_css;
        } else {
            style = document.createElement("style");
            style.type = "text/css";
            style.textContent = str_css;
            document.getElementsByTagName("head")[0].appendChild(style);
        }
    };
    obj.DrawAdDiv = function(iStyle) {
        //iStyle: 1:no border; 2:qq style;3:sina style
        //no border
        if (iStyle == 1) {
            obj.setStyle('_embed_v3_frmc', "height", obj.iHeight + "px");
            obj.setStyle('_embed_v3_frmc', "width", obj.iWidth + "px");
            obj.setStyle('_embed_v3_dc', "height", obj.iHeight + "px");
            //obj.setStyle('_embed_v3_dc', "width", obj.iWidth + "px");
            //obj.setStyle('_embed_v3_dc', "position", "fixed");
            //obj.setStyle('_embed_v3_hd_l', "text-indent", "-9999px");
            //document.getElementById("_embed_v3_hd_c").innerHTML = "&nbsp;";
            //document.getElementById("_embed_v3_btnc").style.cssText = "width:20px; height:14px; float:right; background-color:Silver; font-size:12px; cursor:pointer; text-align:center; position:relative; z-index:9999; margin:-14px 5px 0 0;";
            document.getElementById("_embed_v3_main").style.cssText = "position:absolute; top:20; left:0; z-index:9997;overflow:hidden;";
            obj.setStyle('_embed_v3_main', "width", obj.iWidth + "px");
        }
        //2:qq style;
        if (iStyle == 2) {
            obj.setStyle('_embed_v3_frmc', "height", obj.iHeight + "px");
            obj.setStyle('_embed_v3_frmc', "width", obj.iWidth + "px");
            obj.setStyle('_embed_v3_dc', "height", obj.iHeight + 24 + 5 + "px");
            //obj.setStyle('_embed_v3_dc', "width", obj.iWidth + 3 + 3 + "px");
            obj.setStyle('_embed_v3_dc', "position", "fixed");
            document.getElementById("_embed_v3_hd").style.cssText = 'height:24px; overflow:hidden;';
            obj.setStyle('_embed_v3_hd', "width", obj.iWidth + 3 + 3 + "px");
            document.getElementById("_embed_v3_hd_l").style.cssText = 'width:3px; height:24px;background:url("'+obj.base_url+'images/qqstyle_01.gif") no-repeat; text-indent:-9999px; float:left;';
            document.getElementById("_embed_v3_hd_c").style.cssText = 'height:24px; background:url("'+obj.base_url+'images/qqstyle_02.gif") repeat-x; float:left;';
            obj.setStyle('_embed_v3_hd_c', "width", obj.iWidth + 3 + 3 - 3 - 20 + "px");
            document.getElementById("_embed_v3_hd_r").style.cssText =  'width:20px; height:24px; float:left;';
            document.getElementById("_embed_v3_btnc").style.cssText = 'width:20px;height:24px;float:right; background:url("'+obj.base_url+'images/qqstyle_06.gif") no-repeat; position:relative; z-index:9999; text-indent:-9999px;cursor:pointer;';
            document.getElementById("_embed_v3_main").style.cssText = 'background:#bddefd; text-align:center; padding:0 3px;';
            obj.setStyle('_embed_v3_main', "width", obj.iWidth + "px");
            document.getElementById("_embed_v3_ft").style.cssText = 'height:5px; background:#bddefd;';
            obj.setStyle('_embed_v3_ft', "width", obj.iWidth + 3 + 3 + "px");
        }
        //3:sina style	
        if (iStyle == 3) {
            obj.setStyle('_embed_v3_frmc', "height", obj.iHeight + "px");
            obj.setStyle('_embed_v3_frmc', "width", obj.iWidth + "px");
            obj.setStyle('_embed_v3_dc', "height", obj.iHeight + 27 + 5 + "px");
            //obj.setStyle('_embed_v3_dc', "width", obj.iWidth + 3 + 3 + "px");
            obj.setStyle('_embed_v3_dc', "position", "fixed");
            document.getElementById("_embed_v3_hd").style.cssText = 'height:27px; overflow:hidden;';
            obj.setStyle('_embed_v3_hd', "width", obj.iWidth + 3 + 3 + "px");
            document.getElementById("_embed_v3_hd_l").style.cssText = 'width:3px; height:27px;background:url("'+obj.base_url+'images/sinastyle_01.gif") no-repeat; text-indent:-9999px; float:left;';
            document.getElementById("_embed_v3_hd_c").style.cssText = 'height:27px; background:url("'+obj.base_url+'images/sinastyle_02.gif") repeat-x; float:left;';
            obj.setStyle('_embed_v3_hd_c', "width", obj.iWidth + 3 + 3 - 3 - 65 + "px");
            document.getElementById("_embed_v3_hd_r").style.cssText ='width:65px; height:27px; float:left;cursor:pointer;';
            document.getElementById("_embed_v3_btnc").style.cssText ='width:65px;height:27px; float:right; background:url("'+obj.base_url+'images/sinastyle_06.gif") no-repeat; position:relative; z-index:9999; text-indent:-9999px;';
            document.getElementById("_embed_v3_main").style.cssText = 'background:#bddefd; text-align:center; padding:0 3px;';
            obj.setStyle('_embed_v3_main', "width", obj.iWidth + "px");
            document.getElementById("_embed_v3_ft").style.cssText ='height:5px; background:#bddefd;';
            obj.setStyle('_embed_v3_ft', "width", obj.iWidth + 3 + 3 + "px");
        }
    };
    obj.ShowIt = function(elmHeight) {       
        if (obj.bHadShow || obj.bShowing) return;        
        obj.bShowing = true;       
        obj.setStyle('_embed_v3_dc', 'display', '');
        if (obj.iShowType == 1) {
           obj.setStyle('_embed_v3_dc', 'height', elmHeight + "px");
           obj.bHadShow = true;
           obj.bShowing = false;           
        } else {
           obj.elmHeight = elmHeight;
           obj.hHandle = setInterval(obj.scrollit, obj.sInterval);
        }
    };
    
    obj.scrollit = function() {
        var currh = parseInt(obj.getStyle(document.getElementById("_embed_v3_dc"), "height"));
        currh++;
        obj.setStyle('_embed_v3_dc', 'height', currh + "px");
        if (currh >= obj.iHeight) {
           obj.bHadShow = true;
           obj.bShowing = false;
           clearInterval(obj.hHandle);
 	   			clearInterval(obj.hCheckAD);
        }
    };
    obj.Get_scroll_70e=(document.compatMode=="CSS1Compat")?document.documentElement:document.body;
    obj.PositionIE = function(){
	    if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
		    var q=parseFloat(RegExp.$1);
		    return (q>=7&&document.compatMode!="BackCompat");
	    }else return true;
    };
    obj.xcy_move = function(){
	    if(obj.Get_scroll_70e==null){
		    obj.Get_scroll_70e=(document.compatMode=="CSS1Compat")?document.documentElement:document.body;
		}		    
		var dcWidth = parseInt(obj.getStyle(document.getElementById('_embed_v3_dc'), "width"));
        var dcHeight = parseInt(obj.getStyle(document.getElementById('_embed_v3_dc'), "height"));  
        //alert("top="+obj.Get_scroll_70e.scrollTop + obj.Get_scroll_70e.clientHeight - dcHeight);
        //alert("left="+obj.Get_scroll_70e.scrollLeft + obj.Get_scroll_70e.clientWidth - dcWidth);
        obj.setStyle('_embed_v3_dc', "left", parseInt(obj.Get_scroll_70e.scrollLeft + obj.Get_scroll_70e.clientWidth - dcWidth) + "px");
        obj.setStyle('_embed_v3_dc', "top", (obj.Get_scroll_70e.scrollTop + obj.Get_scroll_70e.clientHeight - dcHeight) + "px");
    };
    obj.locatead = function(showad){ 		
		var posLeft = 0;
		var posTop = 0;
		//FixDomain();
		var docWidth = obj.Get_scroll_70e.scrollLeft + obj.Get_scroll_70e.clientWidth;
		var docHeight = obj.Get_scroll_70e.scrollTop + obj.Get_scroll_70e.clientHeight;   
		var dcWidth = parseInt(obj.getStyle(document.getElementById('_embed_v3_dc'), "width"));
    var dcHeight = parseInt(obj.getStyle(document.getElementById('_embed_v3_dc'), "height")); 
		var w = parseInt(obj.getStyle(document.getElementById('_embed_v3_main'), "width")); 
		var h = parseInt(obj.getStyle(document.getElementById('_embed_v3_main'), "height"));  
		//alert(obj.iPosition+"-"+docWidth+"|"+docHeight+"*"+dcWidth+"|"+dcHeight);
    //alert(docHeight+"|"+dcHeight);            
		switch (obj.iPosition) {
			case 1:
				obj.setStyle('_embed_v3_dc', "top", "0px");
				//obj.setStyle('_embed_v3_dc', "top", "0px");
				//obj.setStyle('_embed_v3_dc', "left", "0px");
				//obj.setSytle('_embed_v3_dc', "width", obj.iWidth+"px");
				break;
			case 2:
				obj.setStyle('_embed_v3_dc', "left", "0px");
				obj.setStyle('_embed_v3_dc', "top", parseInt((docHeight - dcHeight) / 2) + "px");
				break;
			case 3:
				//obj.setStyle('_embed_v3_dc', "left", "0px");
				//var useragentstr = navigator.userAgent;
				//alert(useragentstr);
	  		//useragentstr = useragentstr.toLowerCase();
	  		//alert(useragentstr.indexOf("iphone"));
	  		//alert(useragentstr.indexOf("ucbrowser"));
	  		//if(useragentstr.indexOf("iphone") > -1 ){
	  			
	  			//if(useragentstr.indexOf("ucbrowser") > -1 || useragentstr.indexOf("sogoumobilebrowser") > -1 ){
	  				
	  				//	obj.setStyle('_embed_v3_dc', "top", (docHeight - dcHeight-44) + "px");
	  					
	  			//}else{
	  			////		obj.setStyle('_embed_v3_dc', "top", (docHeight - dcHeight) + "px");
	  			//}
	  			
	  		//}else{
				//	obj.setStyle('_embed_v3_dc', "top", (docHeight - dcHeight) + "px");
				//}
				
				
				obj.setStyle('_embed_v3_dc', "bottom",  "0px");	
				break;
			case 4:
				obj.setStyle('_embed_v3_dc', "top", "0px");
				obj.setStyle('_embed_v3_dc', "left", "0px");
				break;
			case 5:

				//if(docWidth > docHeight){
				  //obj.setStyle('_embed_v3_dc', "left", "30%");
				//}else{
				  //obj.setStyle('_embed_v3_dc', "left", "8%");
				//}
				obj.setStyle('_embed_v3_dc', "left",  parseInt((docWidth - obj.centerWid) / 2) + "px");
				//obj.setStyle('_embed_v3_dc', "left", parseInt((docWidth - dcWidth))/2-50 + "px");
				//obj.setStyle('_embed_v3_dc', "top", parseInt((docHeight - dcHeight) / 2) + "px");
				//obj.setStyle('_embed_v3_dc', "bottom",  parseInt((docHeight+dcHeight))/4-95+"px");
                                //obj.setStyle('_embed_v3_dc', "top", "25%");
                                obj.setStyle('_embed_v3_dc', "top",  parseInt((docHeight - obj.centerHeig))/2  +"px");	
				//obj.setStyle('_embed_v3_frmc',"height","100%");
				//obj.setStyle('_embed_v3_frmc',"width","85%"); 	
                                obj.setStyle('_embed_v3_frmc',"height", obj.centerHeig + "px");
                                obj.setStyle('_embed_v3_frmc',"width", obj.centerWid + "px");
				obj.setStyle('_embed_v3_hd_r', "width", obj.centerWid + "px");
				break;
			case 6:
				obj.setStyle('_embed_v3_dc', "left", "0px");
				obj.setStyle('_embed_v3_dc', "top", (docHeight - dcHeight) + "px");
				break;
			case 7:
				//obj.setStyle('_embed_v3_dc', "top", "0px");
				obj.setStyle('_embed_v3_dc', "bottom",  "0px");	

				break;
			case 8:
				//obj.setStyle('_embed_v3_dc', "left", "0px");
				//obj.setStyle('_embed_v3_dc', "top", (docHeight - dcHeight) + "px");
                                obj.setStyle('_embed_v3_dc', "bottom",  "0px");	
				break;
			case 9:
				//obj.setStyle('_embed_v3_dc', "left", (docWidth - dcWidth) + "px");
				//obj.setStyle('_embed_v3_dc', "bottom", (docHeight - dcHeight) + "px");
				obj.setStyle('_embed_v3_dc', "bottom",  "0px");	
				break;
		}
		//CheckScreenSize();
		//if (obj.bHadShow == false && showad && !obj.bShowing) {
		//	obj.setStyle('_embed_v3_dc', "height", "0px");  
		//	if (parseInt(getStyle($('dc'), 'top')) + dcHeight == docHeight) {
		//		setStyle('dc', "top", "");
		//		setStyle('dc', "bottom", "0px");
		//	}        
		//	ShowIt(dcHeight);
		//}
         
        if (obj.bHadShow == false && showad && !obj.bShowing) {
            //var dcHeight = parseInt(obj.getStyle(document.getElementById('_embed_v3_dc'), "height"));             
            obj.setStyle('_embed_v3_dc', "height", "0px");                  
            obj.ShowIt(dcHeight);
	    obj.hCheckAD=window.setInterval(obj.resize,100);
			//obj.iframecontent();
        }	      
    };
	obj.resize = function(){
		obj.iWidth = document.body.clientWidth;
		obj.DrawAdDiv(obj.iBorder); 
		obj.locatead(false);
	};
	obj.iframecontent = function(){
	try{
	    var aa =document.getElementById("_embed_v3_frmc").contentWindow.document.body.innerHTML;
	    }catch(e){}
	};
    obj.view = function(){
		if(obj.adcheck()) return;

        obj.getParams();
        //document.writeln(obj.GetViewHtml());
				var a=document.createElement("div");
				a.innerHTML= obj.GetViewHtml(); 
        //document.body.appendChild(a);
				if(obj.iPosition == 1){
				   document.getElementsByTagName("body")[0].insertBefore(a,document.getElementsByTagName("body")[0].firstChild); 
				}else{
				   document.body.appendChild(a);
				}
				obj.setStyle("_embed_v3_dc", "display", "none");
                       
        obj.bNeedShow = true;
        if (!obj.bShowing && !obj.bHadShow){ 
            obj.dispad();
        }
    };
    obj.adcheck = function() {

        if(location.href.indexOf("gd.189.cn")>=0) return true;
        var isIf = false;		
		try{
			if(self != top){
				isIf = true;
		}}catch(e){
			//如果是在和父页面不同域
			isIf = true;
		}		
		return isIf;
    };
    obj.dispad = function() {
        if (obj.bShowing == false && obj.bNeedShow) {
            obj.DrawAdDiv(obj.iBorder); 
            obj.locatead(true);
        }
    };
    obj.trim = function(text){  
     return (text || "").replace(/^\s+|\s+$/g, ""); 
    };
    obj.GetCookie = function(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = obj.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
   obj.SetCookie = function(name, value, options) {    
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires  * 1000));
            } else {
                date = options.expires;
            }   
            expires = '; expires=' + date.toUTCString();
        }        
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    };
    
    obj.removePosition = function (){
    	if(obj.iPosition == 1){
    	  var classElements=[],allElements=document.getElementsByTagName('*');
		    for(var i=0;i<allElements.length;i++){
		    				if(allElements[i].className == "header"){
		            				allElements[i].style.cssText = "position:absolute;";
		            }
		            if(allElements[i].className == "tm-mobile-header"){
		            				allElements[i].style.cssText = "position:absolute;";
		            }
		             if(allElements[i].className == "tag-box"){
		            				allElements[i].style.cssText = "position:absolute;";
		            }
		             if(allElements[i].className == "inp-search"){
		            				allElements[i].style.cssText = "position:absolute;";
		            }
		             if(allElements[i].className == "km-tab g-tab"){
		            				allElements[i].style.cssText = "position:inherit;";
		            }
		             if(allElements[i].className == "sch_new sch_new_20140508"){
		             			allElements[i].style.cssText = "position:fixed;";
		            }
		            //美食天下 http://m.meishichina.com/
		            if(allElements[i].className == "topbar"){
		             			allElements[i].style.cssText = "position:inherit;";
		            }
		            //优酷 http://www.youku.com/
		            if(allElements[i].className == "yk-header-container"){
		             			allElements[i].style.cssText = "position:inherit;";
		            } 
		            //搜狐 http://m.sohu.com/
		            if(allElements[i].className == "h_min_w "){
		             			allElements[i].style.cssText = "position:inherit;";
		            }
		            //搜狐 http://m.sohu.com/
		            if(allElements[i].className == "h_min_w"){
		             			allElements[i].style.cssText = "position:inherit;";
		            }//360新闻http://m.news.haosou.com/
		            if(allElements[i].className == "view current"){
		             			allElements[i].style.cssText = "position:inherit;";
		            }//360新闻http://m.news.haosou.com/
		            if(allElements[i].className == "p-article view curr-article current"){
		             			allElements[i].style.cssText = "position:inherit;";
		            }
		            //携程http://m.ctrip.com/
		            if(allElements[i].className == "search-index js_search_index"){
		             			allElements[i].style.cssText = "position:inherit;";
		            }//糗百网http://m.qiushibaike.com/
		            //if(allElements[i].className == "animated fast clearfix headroom"){
		            //			alert(111111);
		             			//allElements[i].style.cssText = "position:inherit;";
		            //}
		           
		    }
		  }
    	};
    
    return obj; 
}

var _oP78_000=objview78_000(_pushshowjs_.url); 
try{
		
		_oP78_000.policyParam =  _oP78_000.getPolicyParam();
    if (_oP78_000.GetCookie(_oP78_000.policyParam) == null){       
			_oP78_000.view();
			_oP78_000.removePosition();
    }
}catch (err) {}
