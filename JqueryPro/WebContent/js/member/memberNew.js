/**
 * 1. 배치는 호출 흐름 순으로 기술
 * 2. 전역변수는 처음 줄에 모두 기술
 * 3. document.ready 작성
 * 4. document.ready 내 화면 초기화 작업들 진행
 */

$(document).ready(function(){
	/**
	 * 화면 초기화 작업 진행
	 * 1. 직업코드 조회 후 세팅 :  initJobSelect();
	 * 2. 기념일 코드 조회 후 세팅 : initMemorialSelect();
	 * 3. '광고 메일 수신 여부' 기본값 세팅 - 미수신
	 * 4. 취미 코드 세팅
	 * 5. 우편번호찾기화면 시 세팅
	 */
	 initJobSelect();
	 initMemorialSelect();
	 $("#recvEmailYnN").prop("checked", true);
	 initHobbyCheck();
	 initCitySelect();
});

/** 직업 코드 조회하여 세팅*/
function initJobSelect(){ 
	  $.ajax({
		   url : "/JqueryPro/CodeServlet"
		   ,type : "post"
		   ,data : {"groupCode" : "A02"} // 직업 코드 조회
		   ,dataType : "json"
		   ,success : function(data){
			   console.log(data);
			   makeJobSelect(data);
			   
		   }
	     ,error : function(xhr){
	    	 console.log(xhr);
	    	 console.log("오류");
	     }
	  });
}

/** 기념일 셀렉트 박스 생성 */
function initMemorialSelect(){
	$.ajax({
		url : "/JqueryPro/CodeServlet"
		,type : "post"
		,data : {"groupCode" : "A03"} // 기념일 유형 조회
	    ,dataType : "json"
	    ,success : function(data){
	    	console.log(data);
	    	makeMemorialSelect(data);
	    }
	    ,error : function(xhr){
	    	console.log(xhr);
	    	console.log("오류");
	    }
	});
}

function initHobbyCheck(){
	$.ajax({
		url : "/JqueryPro/CodeServlet"
		,type : "post"
		,data : {"groupCode" : "A01"} // 취미 코드 조회
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeHobbyCheck(data);
		}
		, error : function(xhr){
			console.log(xhr);
			console.log("오류");
		}
	});
}

function initCitySelect(){
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
			,dataType : "json"
				,success : function(data){
					console.log(data);
					makeCitySelect(data);
				}
				,error : function(xhr){
					console.log(xhr);
					alert("오류");
				}
	});
}

/** 직업 셀렉트 박스 생성 */
function makeJobSelect(data){
	// 방법1)
// 	var strHtml = "";
// 	$("#memJob").html(); // <select>
	
	
// 	방법2) ★★★★★★★★★★
// 	$("#memJob").empty();
// 	$("#memJob").append(ele1);
// 	$("#memJob").append(ele2);

	var strHtml = "";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].value +'">' + data[i].name + '</option>';
	}
	$("#memJobs").html(strHtml);
}

function makeMemorialSelect(data){
	var strHtml = '<option value="">선택하세요</option>';
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].value +'">' + data[i].name + '</option>';
	}
	$("#memMemorialType").html(strHtml);
	
}

function makeHobbyCheck(data){
	var strHtml = "";
	for(var i = 0 ; i < data.length ; i++){
		strHtml += "<label class='checkbox-inline'>"
			    + "<input type='checkbox' value='" + data[i].value + "'>" + data[i].name
			    + "</label>";
	}
	$("#divHobby").html(strHtml);
}

function makeCitySelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].sido +'">' + data[i].sido + '</option>';
	}
	$("#city").html(strHtml);
	
	// 방법 2)
	// setGu();
	// 방법 3)
	// trigger로 change 이벤트 호출
}

function setGu(){
	var param = {
			'sido' : $("#city").val()
			,'flag' : 'GU'
			};
	console.log(param);
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeGugunSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}
	});
	
}

function setDong(){
	var param = {
		'sido' : $("#city").val()
		,'gugun' : $("#gu").val()
		,'flag' : 'DONG'
	};
	console.log(param);
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			makeDongSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}	
	});
}

function makeGugunSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].gugun +'">' + data[i].gugun + '</option>';
	}
	$("#gu").html(strHtml);
	$("#gu").prop("disabled", false);
}

function makeDongSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].dong +'">' + data[i].dong + '</option>';
	}
	$("#dong").html(strHtml);
	$("#dong").prop("disabled", false);
}

function searchZipCode(){
	var sido = $("#city").val();
	var gu = $("#gu").val();
	var dong= $("#dong").val();
	
	var param = {
			'sido' : sido
			,'gugun' : gu
			,'dong' : dong
			,'flag' : 'SEARCH'
		};
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			makeZipTable(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}	
	});
}

function makeZipTable(data){
	$('#divZipResult').show();
	$("#tbZipResult tbody").empty();
	
	  var str = "";
	  for(var i = 0 ; i < data.length ; i++){
		  str += "<tr>"
			  + "<td>" + data[i].zipcode + "</td>"
			  + "<td>" + changeEmptyVal(data[i].bunji) + "</td>"
			  + "<td>" + data[i].sido + " " + data[i].gugun + " " + data[i].dong + " </td>"
			  + "</tr>";
	  }
	  $("#tbZipResult tbody").html(str);
}


  // [중복검사] 버튼에 클릭 이벤트
function chkId(){
    var memId = $("#memId").val();
    console.log("memId : " + memId);
    
    if(isEmpty(memId)){
      alert("ID 값이 입력되지 않았습니다.");
      $("#memId").focus();
      $("#spMemId").show();
      return;
    }
    
    // 유효성 검사 - 영어 소문자와 숫자로 구성, 3글자 이상 10글자 이하
    var regExp = /^[a-z0-9]{3,10}$/;
    if(!regExp.test(memId)){ // 정규식 값에 맞는지 확인함.
      alert("ID 값이 유효하지 않습니다.");
      $("#memId").focus();
      $("#spMemId").show();
      return;
    }
    
    // DB에서 중복검사 수행 
    $.ajax({
      url : "/JqueryPro/MemberServlet" // 서블릿 가져오기(jsp 통째로 넘어온 것)
      ,type : "post"
      ,data : {"memId" : memId, "flag" : "CHKID"} // 서블릿에게 행할 행위 명령
      ,dataType : "json"
      ,success : function(data){
        if(data.resultCnt == 0){
        	alert("사용 가능한 아이디 입니다.");
        	$("#spMemId").text("사용 가능한 아이디 입니다.");
        }else if(data.resultCnt == 1){
        	alert("중복된 아이디 입니다.");
        	$("#spMemId").text("중복된 아이디입니다.");
        }
      }
      ,error : function(xhr){
        console.log(xhr);
        alert("ID 중복 검사 중 오류가 발생했습니다.");
      }
    });
  }
