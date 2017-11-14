package by.htp.itacademy.hotel.domain.vo;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A list wrapper with the information we need.
 * 
 * @author Viktor
 *
 * @param <T>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListPage<T> implements Serializable {

	private static final long serialVersionUID = -5481698637370816315L;

	private Integer page;
	private List<T> data;
	private Long total;
	private Integer maxPerPage;
	private String command;

	public ListPage(Integer page, Integer maxPerPage, String command) {
		super();
		this.page = page;
		this.maxPerPage = maxPerPage;
		this.command = command;
	}

	public ListPage(List<T> data, Integer page, Long total, Integer maxPerPage, String command) {
		super();
		this.page = page;
		this.data = data;
		this.total = total;
		this.maxPerPage = maxPerPage;
		this.command = command;
	}

	public void setTotalAndData(Long total, List<T> data) {
		this.total = total;
		this.data = data;
	}

	public ListPage<T> setData(List<T> data) {
		this.data = data;
		return this;
	}

	public ListPage<T> setTotal(Long total) {
		this.total = total;
		return this;
	}


}
