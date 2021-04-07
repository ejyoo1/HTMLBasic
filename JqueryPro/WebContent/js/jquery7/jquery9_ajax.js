/**
 * 
 */

function fnGet(){
	// submit 실행
	var fm = document.getElementById("fm");// <form>
	fm.action = "html1.html?userId=test01&password=asdf";// url 세팅
	fm.method = "post";
	fm.submit();
	
}

function fnAjax(){
	$.ajax({
		url : "intro.html"
		,type : "GET"
// 			,data :
// 			,dataType :
		,success : function(data){
			$("#divResult").html(data);
		}
		,error : function(){
			
		}
	});
	
}

function fnText(){
	$.ajax({
		url : "/JqueryPro/html/sample/data_text.txt"
// 			,type : "get"
// 			,data : {}
		,dataType : "html"
		,success : function(data){
			// 아래 둘다 무관. text 이기 때문에
// 				$("#divResult").text(data);
			$("#divResult").html(data);
		}
	});
}

function fnJsonObj(){
	$.ajax({
		url : "/JqueryPro/html/sample/data_json_obj.txt"
		,dataType : "json"
		,success : function(data){
			console.log(data);
			console.log(data.name);
			
			// div에 이름:~, 나이:~, 
			var str = "";
			str += "이름 : " + data.name + "<br>"
				+ "나이 : " + data.age + "<br>"
				+ "성별 : " + data.gender + "<br>"
				+ "직업 : " + data.job;
			
			$("#divResult").html(str);
			
		}
		
	});
}

function fnJsonArr(){
	console.log(">>>>>fnJsonArr호출");
	$.ajax({
		url : "/JqueryPro/html/sample/data_json_arr.txt"
		,dataType : "json"
		,success : function(data){
			console.log(">>>>> 성공:"+data);
			makeResult(data);
			
		}
		,error : function(data){
			console.log(">>>>> 오류:" + data);
			console.log(data);
		}
	});
	
}

function fnJsonList(){
	$.ajax({
		url : "/JqueryPro/html/sample/data_json_list.txt"
		,dataType : "json"
		,success : function(data){
			console.log(data);
			// 1번째 회원
			// 이름 :~
			// 나이 :~
			
// 				for(){
// 					var obj = data[i];
// 					obj.name
// 				}
		}
	});
}

function fnXml(){
	$.ajax({
		url : "cd_catalog.xml"
// 			,type : "get"//"post"
// 			,data : {}
		,dataType : "xml"
		,success : function(data){
			makeArtistList(data);

		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류발생");
		}
			
	});
	
}

function fnXml2(){
	$.ajax({
		url : "cd_catalog.xml"
// 			,type : "get"//"post"
// 			,data : {}
		,dataType : "xml"
		,success : function(data){
			makeTitleList(data);

		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류발생");
		}
			
	});
	
}

function fnXmlTable(){
	$.ajax({
		url : "cd_catalog1.xml"
		,dataType : "xml"
		,success : function(data){
			makeXmlList(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류발생");
		}
	});
}

function makeResult(param){
	var str = "<ol>";
	for(var i=0 ; i<param.length ; i++){
		str += "<li>" + param[i] + "</li>";
	}
//		$.each(param, function(idx){
//			str += "<li>" + param[idx] + "</li>";
//		});
	str += "</ol>";
	
	$("#divResult").html(str);
		
}

function makeArtistList(param){
	console.log(param);//param ==> document
// 		console.log(param.getElementsByTagName("CATALOG"));
// 		console.log(param.getElementsByTagName("CD"));
//		document.getElementsByTagName("~")
//		childNodes
//		children
	var arr = param.getElementsByTagName("ARTIST");
	console.log(arr);
	console.log(arr[0]);
	console.log(arr[0].innerHTML);
	
	var str = "";
	for(var i=0 ; i<arr.length ; i++){
		str += arr[i].innerHTML + "<br>";// 가수 이름
	}
	$("#divResult").html(str);
	
}

function makeTitleList(param){
	var arr = param.getElementsByTagName("TITLE");
// 		console.log(arr[0].innerHTML);
// 		console.log($(arr[0]).html());
	console.log(arr[0]);
	console.log(arr[0].childNodes);
	console.log(arr[0].childNodes[0]);
	console.log(arr[0].childNodes[0].nodeValue);
	// [HTML 교재 10 - DOM순회]pdf에서 참고
	
	var str = "";
	for(var i=0 ; i<arr.length ; i++){
		str += arr[i].childNodes[0].nodeValue + "<br>";// 가수 이름
	}
	$("#divResult").html(str);
	
}

function makeXmlList(param){
	//param : document
	var arrCd = param.getElementsByTagName("CD");
//	var arrCd = $("CD", param);
	
	var str = ""
			+ "<table>         "
			+ "<tr>            "
			+ "	<th>번호</th>    "
			+ "	<th>제목</th>    "
			+ "	<th>가수</th>    "
			+ "	<th>가격</th>    "
			+ "	<th>발행년도</th>  "
			+ "</tr>           ";
	
	for(var i=0 ; i<arrCd.length ; i++){
		var title = "", artist = "", price = "", year = "";
		
		var obj = arrCd[i];
		// obj : <CD>
		var objTitle = obj.getElementsByTagName("TITLE");
		var objArtist = obj.getElementsByTagName("ARTIST");
		var objPrice = obj.getElementsByTagName("PRICE");
		var objYear = obj.getElementsByTagName("YEAR");
		
		if($(objTitle).length > 0)
			title = $(objTitle).html();// 난알아요
		
		if($(objArtist).length > 0)
			artist = $(objArtist).html();// 난알아요
		
		if($(objPrice).length > 0)
			price = $(objPrice).html();// 난알아요
		
		if($(objYear).length > 0)
			year = $(objYear).html();// 난알아요
		
		str += "<tr>              "
			+ "	<td>" + (i+1) +"</td>      "//번호
			+ "	<td>" + title + "</td>      "//제목
			+ "	<td>" + artist + "</td>      "//가수
			+ "	<td>" + price + "</td>      "//가수
			+ "	<td>" + year + "</td>    "//발행년도
			+ "</tr>             ";
		
	}
	str += "</table>";
	
	$("#divResult").html(str);
	
}






//	console.log($("CD", param));


function makeXmlList1(param){
	var arr = param.getElementsByTagName("CD");
//	console.log(arr);// arr : HTMLCollection
	for(var obj of arr){
//		console.log(obj);
//		console.log($(obj).children());
//		console.log($(obj).children().eq(0));
		console.log($(obj).children().eq(0).html());
//		console.log($(obj).children().eq(0).attr("nodeName"));
//		console.log($(obj).children().eq(0).attr("localName"));
//		console.log($(obj).children().eq(0).attr("tagName"));
		
		return;
	}
	
}








