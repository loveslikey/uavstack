/**
 * x: 上限
 * y: 下限
 */
function uavRandom(x,y){
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

/*加载侧边栏菜单*/
function LoadSidebarMenu(appInfo){
	var sidebar=document.getElementById("menu");
	
	for(var j=0;j<appInfo.menu.length;j++){
		var paraL=document.createElement("li");
		var paraA=document.createElement("a");
		paraA.innerHTML=appInfo.menu[j].functions;
		
		/**
		* 直接url跳转check
		*/
		var clickUrl = appInfo.menu[j].url;
		if(clickUrl.indexOf("jumpurl")>=0){
			var key = "jumpurl@";
			var begin = clickUrl.indexOf(key)+key.length;
			clickUrl = clickUrl.substring(begin);
			
			window["sidebarMenuType"] = "jumpurl";
		}
		paraA.setAttribute("onclick","javascript:sidebarMenuOnclick(this,'"+clickUrl+"','"+appInfo.menu[j].functions+"')");
		
		paraA.setAttribute("class","appMenu");
		paraL.appendChild(paraA);
		sidebar.appendChild(paraL);
	}

}

/*加载导航栏菜单*/
function LoadNavbarMenu(appInfo){
	var navbar=document.getElementById("nav-menu");
	for(var j=0;j<appInfo.menu.length;j++){
		
		var navbar_para=document.createElement("li");
		navbar_para.setAttribute("class","hidden-sm hidden-md hidden-lg");

		var paraA=document.createElement("a");
		paraA.innerHTML=appInfo.menu[j].functions;
		paraA.setAttribute("href","javascript:jumpUrl('"+appInfo.menu[j].url+"','"+appInfo.menu[j].functions+"')");
		paraA.setAttribute("class","appMenu");

		navbar_para.appendChild(paraA);
		navbar.appendChild(navbar_para);
	}
}

function jumpUrl(url,desc){
	guiPing_RSClient(jumpUrlCallBack(url),"menuclick",url,desc);
}

function jumpUrlCallBack(url){
	/**
	* 每次重新创建，避免缓存 begin
	*/
	var oldIfm= document.getElementById("appContent");
	if(oldIfm){ 
		document.body.removeChild(oldIfm);
	}

	var newIfm = document.createElement("iframe");
	newIfm.id="appContent";
	newIfm.className="appContent";
	document.body.appendChild(newIfm);
	/**
	* 每次重新创建，避免缓存 end
	*/

	setContentHeight();
	
	/**
	 * 用户数据穿透 begin
	 * 
	 * 是跳转菜单，则获取apphub信息 ，因为跳转表示不是apphub自应用。
	 * 如果是apphub自应用，不需要透传信息，因为都可以在自应用拿到。
	 */	
	if(window["sidebarMenuType"] && "jumpurl"==window["sidebarMenuType"] ){
		loadApphubInfoByAES_RSClient();
		if(url.indexOf("?")==-1) {
			url += "?apphubkey="+window["apphubAesInfo"]; 
		}
		else {
			url +="&apphubkey="+window["apphubAesInfo"];  
		}
	}
	/**
	 * 用户数据穿透 end
	 * @returns
	 */
	
	document.getElementById("appContent").contentWindow.document.body.innerText = "";
		
	$("#appContent").attr("src",url);
	$("#navbar").removeClass("in");
	
}

function setContentHeight(){
	var ifm= document.getElementById("appContent");
	if (document.body.clientWidth<768) {
		ifm.style.height =  document.body.clientHeight-52+"px";
	}
	else {
		ifm.style.height =  document.body.clientHeight+"px";
	}
}


/*加载导航栏标题*/
function LoadNote(appInfo){
	$("#note").text(appInfo.title);
	$("#appIco").attr("src",appInfo.url+"/appIco.png");

}

function appMenuInit(){
	var uInfo = window["cachemgr"].get(uavGuiCKey + "user.manage.info");
	uInfo = eval("("+uInfo+")");
	var appIdParam = window["cachemgr"].get(uavGuiCKey + "junmpApp");
	var appInfo = eval("("+uInfo[appIdParam]+")");
	
	if(!appInfo){
		appJumpBackMain();
	}
	
	/**
	 * userlogger记录,通过用ping提交到filter  begin
	 * 同时会进行会话check（ping逻辑）
	 */
	guiPing_RSClient(null,"jumpapp",appInfo.url,appInfo.title);
	/**
	 * userlogger记录,通过用ping提交到filter  end
	 * 
	 * 
	 */
	LoadSidebarMenu(appInfo);	//加载侧边栏菜单
	LoadNavbarMenu(appInfo);	//加载顶部菜单栏
	LoadNote(appInfo);   //标题
	//添加menu控制
	var menuCtrl=HtmlHelper.id("menuCtrl");
	menuCtrl.title="点击缩放应用视图区域";
	menuCtrl.style="cursor: pointer;";
	menuCtrl.onclick=function(e) {
				
		var side=HtmlHelper.id("side");
		var navCtrlBar=HtmlHelper.id("navCtrlBar");
		var appContent=HtmlHelper.id("appContent");
		if (side.style.display!="none") {
			side.style.display="none";			
			navCtrlBar.style.display="none";			
			appContent.setAttribute("class","appContentMax");
			menuCtrl.style.left="0px";
		}
		else {
			side.style.display="";			
			navCtrlBar.style.display="";
			appContent.setAttribute("class","appContent");
			menuCtrl.style.left="192px";
		}
	};
}

function appJumpBackMain(){
	window.location.href="rs/gui/jumpMainPage";
}

/**
 * 侧边菜单点击
 */
function sidebarMenuOnclick(obj,url,desc){
	var lis = obj.parentNode.parentNode.getElementsByTagName('li');
	$.each(lis,function(index,li){
		li.childNodes[0].setAttribute("class","appMenu");	
	});
	obj.setAttribute("class","appMenu appSidebarMenuSel");	
	jumpUrl(url,desc);
}

$("document").ready(
	appMenuInit()
);

 //展示区自动适应高度
window.onresize = function() {
	setContentHeight();
};