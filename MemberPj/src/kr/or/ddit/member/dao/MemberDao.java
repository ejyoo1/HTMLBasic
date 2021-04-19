package kr.or.ddit.member.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.base.dao.BaseDao;
import kr.or.ddit.member.vo.MemberVO;

//DAO 만 봐도 쿼리가 뭐가 있는지 알 수 있도록. 메서드명도 Service명, xml id 명 동일하게
public class MemberDao extends BaseDao {
	private SqlMapClient smc;
	
	public MemberDao() {
		smc = super.getSqlMapClient();
	}
	
	
	//createMember
	
	//updateMember
	
	//retrieveMember
	public MemberVO retrieveMember(String memId) throws SQLException {
		return (MemberVO) smc.queryForObject("member.retrieveMember", memId); // queryForObject : 단 건 조회
	}
	
	public List<MemberVO> retrieveMemberList(MemberVO memberVo) throws SQLException {
		return smc.queryForList("member.retrieveMemberList", memberVo); // queryForList : 여러 건 조회
	}


	public void createMember(MemberVO memberVo) throws SQLException {
		smc.insert("member.createMember", memberVo);
	}
	
}
