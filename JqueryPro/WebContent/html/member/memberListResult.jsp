<%@page import="kr.or.ddit.member.vo.MemberVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    /* json Obj

    [
       {name : "~", id : "~"}
       ,{name : "~", id : "~"}
       ,{name : "~", id : "~"}
    ]
        
    */
    System.out.println("정상적으로 포워딩 됨.");
    %>
[
<%
List<MemberVO> list = (List<MemberVO>) request.getAttribute("list"); // 조회 결과를 "list"로 담아줬음. [MemberServlet.java 48 line]
for(int i = 0 ; i < list.size() ; i++){
	MemberVO vo = list.get(i);
	String memId = vo.getMemId();
	String memName = vo.getMemName();
	
	//json 타입으로 만들기 시작 ==> {"name" : "~", "id" : "~"}
	if(i>0){
		%>,<%
	}
 %>
  {"name" : "<%=memName%>", "id" : "<%=memId%>"}
  
<%
}
%>
]
