var mtableConfig = {
	tableListData:null,
	id : "AppManagerTableada",
	pid : "AppManagerTableDiv",
	openDelete : true,
	key : "_id",
	pagerSwitchThreshold : 600,
	pagesize:20,
	head : {
		_id : [ 'ID', '15%' ],
		groupid : [ '授权组', '15%' ],
		ldapkey : [ 'LDAP关键字', '10%' ],
		appids : [ '授权APP', '35%' ],
	//	createtime : [ '创建时间' ,'15%'],
		operationtime : [ '操作时间', '15%' ],
		operationuser : [ '操作人', '10%' ]
	//,state      : ['状态', '5%']
	},
	cloHideStrategy : {
		1100 : [ 0, 1, 2, 3, 4, 5 ],
		1000 : [ 0, 1, 4, 5 ],
		800 : [ 0, 1, 2 ],
		500 : [ 0, 1, 2 ],
		400 : [ 0 ]
	}
};

var table;
function initGroupsTable() {
	table = new AppHubTable(mtableConfig);
	table.delRowUser = userDelete; //Config the delete function of user
	table.cellClickUser = loadGroupById_RESTClient;
	table.sendRequest = loadAllGroups_RESTClient;
	table.initTable();
}


$("document").ready(function() {
	$(document.body).append("<div id=\"AppManagerTableDiv\"></div>");
	initGroupsTable();
});
