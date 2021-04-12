/**
 * 회원 정보를 검색하는 JS
 * jquery7 - ex02_jsonsubmit.html 참고
 */

$(document).ready(function(){
	  $("#btnSearch").click(function(){
		  //서버로 전달할 데이터 만들기
		  var userId = $("#userId").val();
		  var userName = $("#userName").val();
		  
		  var param = {
				         memId : userId // 서버에서 사용할 때 사용할 키 : memId ==> MemberServlet에서 req.getParameter("memId"); 로 사용됨.
				         , memName : userName
				         , flag : "L"
				         }; // ajax이기 때문에 객체로 넘겨주어도 됨.
		  
		  //보고있는 화면에서 목록만 바꾸어 줄 것이므로 ajax 호출
		  $.ajax({
			  url : "/JqueryPro/MemberServlet" // 서블릿 가져오기(jsp 통째로 넘어온것)
			  ,type : "post"
			  ,data : param
			  ,dataType : "json"
			  ,success : function(data){
				  alert("성공");
				  makeTable(data);
			  }
		    ,error : function(xhr){
		    	console.log(xhr);
		    	alert("오류 발생");
		    }
		  });
	  });
	  $("#btnReset").click(function(){ // 데이터 초기화
		  $(".result").html("");
	  });
	  
	  function makeTable(data){
		  console.log("data.length : " + data.length);
		  var str = "";
		  if(data.length > 0){
			  for(var i = 0 ; i < data.length ; i++){
				  str += "<tr>"
					  + "<td>" + data[i].id + "</td>"
					  + "<td>" + data[i].name + "</td>"
					  + "</tr>";
			  }
			  console.log("str : " + str);
		  } else {
			  str = "검색결과가 없습니다.";
		  }
		  
		  $("#tbResult tbody").html(str);
	  }
});