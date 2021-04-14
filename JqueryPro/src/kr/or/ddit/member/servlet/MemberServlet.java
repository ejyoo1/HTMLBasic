package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet(name = "MemberServlet", urlPatterns = "/MemberServlet") // web.xml 에 서블릿 연결하는 것을 어노테이션으로 자동화
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp); // 서버를 Debug모드로 돌리면 마우스 갖다댔을 때, 그 값이 뭔지 나옴(sysout 안찍어도 됨)
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//		super.doPost(req, resp); // 지워야함 : extends한 HttpServlet 의 doPost를 호출하는 것이기 때문에 현재 클래스의 doPost를 사용할 수 없음 ==> RequestDispatcher 이 객체를 사용할 때 원하는 페이지로 이동할 수 없음.
		String flag = req.getParameter("flag"); // 브라우저로 부터 받은 값을 사용하기 위해 request에서 parameter를 get
		try {
			//flag.equals("C")를 쓰면 flag가 null일 때 오류가 난다. 이때, "L".equals(flag)이렇게 사용하면 null 처리를 따로 하지 않아도 된다.
			if("L".equals(flag)) { // 목록 조회
				List<MemberVO> list = retrieveMemberList(req);
				
				req.setAttribute("list", list); // 브라우저로 전달할 결과를 request에 attribute로 세팅
				
				RequestDispatcher  disp = req.getRequestDispatcher("/html/member/memberListResult.jsp"); // 결과를 받을 url 세팅
				disp.forward(req, resp);
				
			} else if("C".equals(flag)) { // 등록
				createMember(req);
			} else if("R".equals(flag)) { // 단건 조회
				
			} else if("U".equals(flag)) { // 수정
				
			} else if("D".equals(flag)) { // 삭제
				
			} else if("CHKID".equals(flag)) { //ID검사
				System.out.println("★★★★★★CHKID로 옴");
				
				MemberVO memberVo = checkMemberId(req);
				
				int resultCnt = 0;
				if(memberVo != null) {
					resultCnt = 1; // 중복된 ID가 있음
				}
				
				req.setAttribute("resultCnt", resultCnt);
				RequestDispatcher  disp = req.getRequestDispatcher("/html/common/checkResult.jsp"); // 결과를 받을 url 세팅(jsp 만들어서 데이터 받아서 처리)
				disp.forward(req, resp);
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private MemberVO checkMemberId(HttpServletRequest req) throws SQLException {
		String memId = req.getParameter("memId");
		
		MemberService service = new MemberService();
		MemberVO memberVo = service.retrieveMember(memId);
		
		return memberVo;
	}

	private void createMember(HttpServletRequest req) throws SQLException {
		String memId = req.getParameter("memId");
		String memName = req.getParameter("memName");
		// 그 외 정보들...
		
		MemberVO memberVo = new MemberVO();
		memberVo.setMemId(memId);
		memberVo.setMemName(memName);
		// 그 외 정보들 VO에 세팅
		
		MemberService service = new MemberService();
		service.createMember(memberVo);
		
	}

	private List<MemberVO> retrieveMemberList(HttpServletRequest req) throws SQLException {
		// 브라우저로 부터 받은 값을 사용하기 위해 request에서 parameter를 get.
		String memId = req.getParameter("memId");
		String memName = req.getParameter("memName");
		// form serialize를 사용해서 파라미터를 전달한 경우, request에 요소의 name으로 parameter가 매핑됨.
		// 예) <input type="text" name="userId"> ==> req.getParameter("userId")
		
		MemberVO memberVo = new MemberVO();
		memberVo.setMemId(memId);
		memberVo.setMemName(memName);
		
		//회원 목록 조회
		MemberService service = new MemberService();
		List<MemberVO> list = service.retrieveMemberList(memberVo);
		return list;
	}
}
