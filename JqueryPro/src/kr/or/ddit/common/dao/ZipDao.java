package kr.or.ddit.common.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.base.dao.BaseDao;
import kr.or.ddit.common.vo.ZipVO;

public class ZipDao extends BaseDao{
private SqlMapClient smc;
	
	public ZipDao() {
		smc = super.getSqlMapClient();
	}

	public List<ZipVO> retrieveSidoList() throws SQLException {
		return smc.queryForList("zip.retrieveSidoList"); // queryForList : 여러 건 조회
	}
	public List<ZipVO> retrieveGugunList(ZipVO zipVO) throws SQLException {
		return smc.queryForList("zip.retrieveGugunList", zipVO); // queryForList : 여러 건 조회
	}
	public List<ZipVO> retrieveDongList(ZipVO zipVO) throws SQLException {
		return smc.queryForList("zip.retrieveDongList", zipVO); // queryForList : 여러 건 조회
	}
	public List<ZipVO> retrieveZipList(ZipVO zipVO) throws SQLException {
		return smc.queryForList("zip.retrieveZipList", zipVO); // queryForList : 여러 건 조회
	}
}
