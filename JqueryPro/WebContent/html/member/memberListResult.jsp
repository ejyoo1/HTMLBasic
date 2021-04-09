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
		System.out.println("list.get(0) : " + list.get(0));
String str="[";
for(int i = 0 ; i < list.size() ; i++){
	System.out.println("list.size() : " + list.size());
	MemberVO vo = list.get(i);
	String memId = vo.getMemId();
	System.out.println("memId : " + memId);
	String memName = vo.getMemName();
	System.out.println("memName : " + memName);
	
	//json 타입으로 만들기 시작
	if(i>0){
		System.out.println("쉼표 추가");
		%>,<%
		str += ",";
	}
%>
  {"name" : "<%=memName%>", "id" : "<%=memId%>"}
  
<%
str += "{name : " + memName + ", id : " + memId + "}]";
}
System.out.println("str : " + str);
%>
]




