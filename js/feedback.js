if (document.all) {
	window.attachEvent('onload', RegEvents)
} else {
	window.addEventListener('load', RegEvents, false);
}

function RegEvents() {
	// ����չ��ͳ��
	arriveEvent(1);
	// �˶�ͳ��
	var a = document.getElementById("push_unsubscribe");
	if(a!=undefined){
		bindEvent(a,"click",function() {
			arriveEvent(5);
		});
	}
	
	// ���ͳ��
	a = document.getElementById("push_click");
	if(a!=undefined){
		bindEvent(a,"click",function() {
			arriveEvent(2);
		});
	}
}

// ͳ��
function arriveEvent(stype) {
	var URL = "http://ad.zhiong.net:2525/feedback/dataprocess/receivedata.do";
	
	var path = "";
	if (window.location.search == "")
		path = window.parent.location.search;
	else
		path = window.location.search;

	path=decodeURIComponent(path);
	path=path.replace(' ','+');
	
	if (path != "") {
		path = URL + path + "&stype="+stype;
	} else {
		path = URL;
	}

	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("get", path, true);

	/*xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if(stype==0){
					//ʵ�����ͻ�ȡ�����滻ռλ��
					replaceContent(xhr.responseText);
				}else if(stype==3){
					closePage();
				}
			}
		}
	}*/
	
	xhr.send();
}

//�ر�ҳ��
function closePage(){
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
	   window.location.href="about:blank";
	} else {
	   window.close();
	}
}

//���¼�
function bindEvent(e,t,fn){ 
	if(e.addEventListener){ 
		e.addEventListener(t, fn, false); 
	}else if(e.attachEvent){ 
		e.attachEvent('on'+ t, fn); 
	} 
}

//ʵ�����ͻ�ȡ�����滻ռλ��
function replaceContent(json){
	if(json.length==0){
		return;
	}
	object = eval( '('+ json + ')' ); 
	if(object.resultData==null || object.resultData.length==0 || object.resultCode>0){
		return;
	}
	var words = object.resultData.split(',');
	if(words.length>0){
		for(var i=0;i<10;i++){
			document.getElementById("multiplefieldforlabel"+(i+1)).value=words[i];
		}
	}
}

