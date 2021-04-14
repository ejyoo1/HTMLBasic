<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="kr">
<head>
<meta charset="UTF-8">
<title>회원 등록 화면</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="../../js/common/myutils.js"></script>
<script>
$(document).ready(function(){
  // 직업코드 조회해서 세팅하기
  $.ajax({
	   url : "/JqueryPro/CodeServlet"
	   ,type : "post"
	   ,data : {"groupCode" : "A02"} // 직업 코드 조회
	   ,dataType : "json"
	   ,success : function(data){
		   console.log(data);
		   /*
		   <select class="form-control" id="memJob">
                <option value="07">군인</option>
                <option value="08">전업주부</option>
                <option>직업3</option>
                <option>직업4</option>
              </select>
		   */
		   /*
		   data ==> 
		   [
			   {"value" : "07", "name" : "군인"}
			   ,{"value" : "08", "name" : "전업주부"}
			   ,{"value" : "09"}
			   ,{"value" : "10"}
		   ]
		   */
		   
		   makeJobSelect(data);
		   
	   }
     ,error : function(xhr){
    	 console.log(xhr);
    	 console.log("오류");
     }
  });
});

function makeJobSelect(data){
	// 방법1)
// 	var strHtml = "";
// 	$("#memJob").html(); // <select>
	
	
// 	방법2) ★★★★★★★★★★
// 	$("#memJob").empty();
// 	$("#memJob").append(ele1);
// 	$("#memJob").append(ele2);

	  var strHtml ="";
	  for(var i = 0 ; i < data.length ; i++){
		  strHtml += '<option value="' + data[i].value + '">' + data[i].name + '</option>';
	  }
	  console.log(strHtml);
	  
	  $("#memJob1").html(strHtml);
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
        console.log("★★★data : " + data);
        // data ==> {"resultCnt" : "0"}
        // data ==> {"resultCnt" : "1"}
        console.log("★★★data.resultCnt : " + data.resultCnt);
        if(data.resultCnt == 0){
        	console.log("★★★ resultCnt 가 0임");
        	alert("사용 가능한 아이디 입니다.");
        	$("#spMemId").text("사용 가능한 아이디 입니다.");
        }else if(data.resultCnt == 1){
        	console.log("★★★ resultCnt 가 1임");
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
</script>
</head>
<body>
  <!-- Modal start -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">주소 검색</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label col-sm-2" for="memJob">직업</label>
            <div class="col-sm-10">
              <select class="form-control" id="memJob">
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
        </div>
      </div>
      
    </div>
  </div>
  <!-- Modal end -->
  
  <div class="container">
    <h2>Horizontal form</h2>
    <form class="form-horizontal" action="/action_page.php">
      <div class="form-group">
        <label class="control-label col-sm-2" for="memId">아이디</label>
        <div class="col-sm-3">
          <input type="text" class="form-control" id="memId"
            placeholder="Enter Id" name="memId">
        </div>
        <div class="col-sm-3">
          <!-- Trigger the modal with a button -->
          <button type="button" class="btn btn-info btn-md" id="myBtn1" onclick="chkId()">중복검사</button>
          <span id="spMemId" style="display:none;">영어 소문자와 숫자 사용 가능. 3~10자리</span>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memPass">비밀번호</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memPass"
            placeholder="Enter memPass" name="memPass">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memName">이름</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memName"
            placeholder="Enter memName" name="memName">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memBir">생일</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memBir"
            placeholder="Enter memBir" name="memBir">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memZip">우편번호</label>
        <div class="col-sm-3">
          <input type="text" class="form-control" id="memZip"
            placeholder="Enter memZip" name="memZip">
        </div>
        <div class="col-sm-3">
          <button type="button" class="btn btn-info btn-md" id="myBtn2">주소 검색</button>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memAdd1">상세주소1</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memAdd1"
            placeholder="Enter memAdd1" name="memAdd1">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memAdd2">상세주소2</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memAdd2"
            placeholder="Enter memAdd2" name="memAdd2">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memHp">전화번호</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memHp"
            placeholder="Enter memHp" name="memHp">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memMail">이메일</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="memMail"
            placeholder="Enter memMail" name="memMail">
        </div>
      </div>
      <div class="form-group" class="checkbox"> <!-- ---------체크박스로 변환 필요 ----------- -->
        <label class="control-label col-sm-2" for="recvEmailYn">이메일 수신 동의 여부</label>
        <input type="checkbox" id="recvEmailYn" value="recvEmailYn">
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memJob1">직업</label>
        <div class="col-sm-10">
          <select class="form-control" id="memJob1">
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memMemorialType">기념일</label>
        <div class="col-sm-5">
          <select class="form-control" id="memMemorialType" name="memMemorialType">
            <option>기념일1</option>
            <option>기념일2</option>
            <option>기념일3</option>
            <option>기념일4</option>
          </select>
        </div>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="memMemorialDate"
            placeholder="Enter memMemorialDate" name="memMemorialDate">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memMileage">memMileage</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memMileage"
            placeholder="Enter memMileage" name="memMileage">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memComment">memComment</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5" id="memComment"></textarea>
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label><input type="checkbox" name="remember">
              Remember me</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default">Submit</button>
        </div>
      </div>
    </form>
  </div>

</body>
</html>