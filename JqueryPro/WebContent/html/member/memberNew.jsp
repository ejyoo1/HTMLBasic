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
  <script src="../../js/member/memberNew.js?v=1"></script>
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
        <label class="control-label col-sm-2 required" for="memId">주소</label>
        <div class="col-sm-10 form-inline">
          <input type="text" class="form-control form-inline-zip1" id="memZip" name="memZip" readonly="readonly" required>
          <button type="button" class="btn btn-info btn-small" data-toggle="modal" data-target="#zipModal">주소검색</button>
          <input type="text" class="form-control form-inline-zip2" id="memAdd1" name="memAdd1" readonly="readonly" required>
          <br>
          <div class="form-group-inner-down">
          <input type="text" class="form-control" id="memAdd2" name="memAdd2" placeholder="상세주소를 입력하세요" required>
          </div>
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
        <label class="control-label col-sm-2" for="memJobs">직업</label>
        <div class="col-sm-10">
          <select class="form-control" id="memJobs">
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memMemorialType">기념일</label>
        <div class="col-sm-5">
          <select class="form-control" id="memMemorialType" name="memMemorialType">
          </select>
      </div>
      <div class="form-group">
       <label class="control-label col-sm-2" for="recvEmail">광고메일</label>
       <div class="col-sm-10">
         <label class="radio-inline"><input type="radio" name="recvEmailYn" value="Y" checked>수신</label>
         <label class="radio-inline"><input type="radio" name="recvEmailYn" value="N" id="recvEmailYnN">미수신</label>
       </div>
      </div>
      <div class="form-group">
       <label class="control-label col-sm-2" for="hobby">취미</label>
       <div class="col-sm-10" id="divHobby">
       <!-- js 삽입부분 -->
       </div>
         <input type="hidden" name="memLike" id="memLike">
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
        <label class="control-label col-sm-2" for="memComment">비고</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5" id="memComment" name="memComment" maxlength="1000"></textarea>
        </div>
      </div>
      <input type="hidden" name="action" id="actionFm">
    </form>
    <div class="form-button text-center">
      <button type="button" class="btn btn-primary" onclick="save()">저장</button>
      <button type="button" class="btn btn-default" onclick="goList()">취소</button>
    </div>
  </div>
  
  <!-- 우편번호 검색 Modal -->
  <div class="modal fade" id="zipModal" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h5 class="modal-title">주소 검색</h5>
        </div>
        <div class="modal-body">
          시: <select id="city" onchange="setGu()">
<!--             <option value="대전">대전</option> -->
          </select>
          구: <select id="gu" onchange="setDong()" disabled="disabled">
            <option>선택하세요</option>
          </select>
          동: <select id="dong" disabled="disabled">
            <option>선택하세요</option>
          </select>
          <button type="button" onclick="searchZipCode()" id="btnZip">검색</button>
          <hr>
          <div id="divZipResult" style="display: none;">
            <table class="table table-striped" id="tbZipResult">
              <thead>
                <tr>
                  <th>우편번호</th>
                  <th>번지</th>
                  <th>주소</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseZipModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
  
  <form id="tmpFm">
    <input type="hidden" name="action" id="actionTmlFm">
    <input type="hidden" name="memId" id="selectedMemId">
    <input type="hidden" name="targetUrl" id="targetUrl">
  </form>

</body>
</html>