/**
 * 
 */

function fnXml1(){
		  $.ajax({
			  url : "./cd_catalog.xml"
// 			  ,type : "get"//or "post"
// 			  ,data : {}
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
  
function makeArtistList(param){//param ==> document
  console.log(param);
// 		  console.log(param.getElementsByTagName("CATALOG"));//xml형식을 태그 네임으로 갖고올 수 있음.
// 		  console.log(param.getElementsByTagName("CD"));
  
  var arr = param.getElementsByTagName("ARTIST");
  console.log(arr);
  console.log(arr[0]);
  console.log(arr[0].innerHTML);
  
  var str = "";
  for(var i = 0 ; i < arr.length ; i++){
	  str += arr[i].innerHTML + "<br>";// 가수 이름
	  console.log(arr[i].innerHTML);
  }
  $("#divResult").html(str);
}
  
function fnXml2(){
      $.ajax({
        url : "./cd_catalog.xml"
//	        ,type : "get"//or "post"
//	        ,data : {}
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
  
function makeTitleList(param){
	  var arr = param.getElementsByTagName("TITLE");
  //console.log(arr[0].innerHTML);
  //console.log($(arr[0]).html());
  console.log(arr[0]);//<TITLE>Empire Burlesque</TITLE>
  console.log(arr[0].childNodes);//NodeList[text] ==> 0: text ==> nodeValue, data ... 등 표시
  console.log(arr[0].childNodes[0]);//"Empire Burlesque"
  console.log(arr[0].childNodes[0].nodeValue);//정석적인 방법(html 10ppt DOM 순회) // Empire Burlesque
  
  var str = "";
  for(var i = 0 ; i < arr.length ; i++){
	  console.log(arr[i].childNodes[0].nodeValue);
	  str += arr[i].childNodes[0].nodeValue + "<br>"; 
  }
  $("#divResult").html(str);
}

function fnXmlTable(){
	$.ajax({
		url : "./cd_catalog.xml"
		,dataType : "xml"
		,success : function(data){
			console.log(data);
			makeAllList(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류발생");
		}
	});
}

// table 생성하기
/*
<table class="test">
    <tr>
      <th>TITLE</th>
      <th>ARTIST</th>
      <th>COUNTRY</th>
      <th>COMPANY</th>
      <th>PRICE</th>
      <th>YEAR</th>
    <tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table> 
*/
function makeAllList(param){
	var arr = param.getElementsByTagName("CD");
	console.log(arr);// cd 가져오기
	console.log(arr.length);// cd 개수 가져오기
	console.log(1);
	console.log(arr[0].innerHTML);
	console.log(arr[0].getElementsByTagName("TITLE"));
	console.log(arr[0].getElementsByTagName("TITLE")[0]);
	console.log(arr[0].getElementsByTagName("TITLE")[0].innerHTML);
	console.log(2);
	console.log(arr[0].children);//태그 가져오기
	console.log(arr[0].childElementCount);//태그 개수 가져오기
	console.log(arr[0].children[0].nodeName);//태그 가져오기
	console.log(3);
	console.log(arr[0].children[0].innerHTML);//태그내 값 가져오기
	console.log("-----------------");
	
	var str = "<table class='test'><tr>" +
			"<th>TITLE</th>" +
			"<th>ARTIST</th>" +
			"<th>COUNTRY</th>" +
			"<th>COMPANY</th>" +
			"<th>PRICE</th>" +
			"<th>YEAR</th>" +
			"<tr>";
	for(var i = 0 ; i < arr.length ; i++){
		str += 
			"<tr>" +
				"<td>" + arr[i].getElementsByTagName("TITLE")[0].innerHTML + "</td>" +// 이 방법을 사용하면 온전이 6개가 될것이라는 보장이 없음.
				"<td>" + arr[i].getElementsByTagName("ARTIST")[0].innerHTML + "</td>" +
				"<td>" + arr[i].getElementsByTagName("COUNTRY")[0].innerHTML + "</td>" +
				"<td>" + arr[i].getElementsByTagName("COMPANY")[0].innerHTML + "</td>" +
				"<td>" + arr[i].getElementsByTagName("PRICE")[0].innerHTML + "</td>" +
				"<td>" + arr[i].getElementsByTagName("YEAR")[0].innerHTML + "</td>" +
			"</tr>";
	}
	str += "<table>";
	
	$("#divResult").html(str);
	
	//=================================================
	
	str =   "<table class='test'><tr>";
	//컬럼의 최대 카운트 개수 구하기
	var arrCount = 0;
	var maxEle;
	for(var i = 0 ; i < arr.length ; i++){
		var temp = arr[i].childElementCount;
		if(arrCount < temp){
			arrCount = temp;
			maxEle = arr[i];
		}
	}
	console.log("최대 카운트 수");
	console.log(arrCount);
	console.log("최대 자식 노드를 가지고 있는 element");
	console.log(maxEle);
	
//				"<th>TITLE</th>" +
//				"<th>ARTIST</th>" +
//				"<th>COUNTRY</th>" +
//				"<th>COMPANY</th>" +
//				"<th>PRICE</th>" +
//				"<th>YEAR</th>";
	
	//최대 카운트를 갖고 있는 요소의 제목을 th로 설정
	for(var i = 0 ; i < arrCount ; i++){
		console.log("최대 자식 노드의 Tag 목록")
		console.log(maxEle.children[i]);//태그 가져옴<title>~<title>
		console.log(arr[0].children[0].nodeName);//태그 가져오기
		console.log(maxEle.children[i].innerHTML);//값 가져오기
		str += "<th>" + maxEle.children[i].nodeName + "</th>" ;
	}
	
	str += "<tr>";
	// 위의 방법 개선 (온전히 안의 태그가 고정될 보장은 없음. 고정된 개수인 CD를 가져와서 하위 태그에 따라 for문을 돌림)
	for(var i = 0 ; i < arr.length; i++){//cd의 개수만큼 for문 돌음
		str += "<tr>";
		for(var j = 0 ; j < arr[i].childElementCount ; j++){//cd의 하위 요소만큼 돌림
			if(arr[i].children[j].innerHTML == ""){
				str += "<td>empty</td>";
			}else{
				str += "<td>" + arr[i].children[j].innerHTML + "</td>";
			}
		}
		str += "</tr>";
		
//		return;//[요령] for문에서 1건만 찍도록 리턴사용
	}
	str += "<table>";
	$("#divResult2").html(str);
	
	/*
	 향상된 for문
	 for(var obj of arr){
	 	console.log(obj);
	 	console.log($(obj).children());
	 	console.log($(obj).child().eq(0));
	 	console.log($(obj).children().eq(0).html());
	 }
	 
	 $.each()
	*/
}