package by.htp.itacademy.hotel.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.User;

import static by.htp.itacademy.hotel.util.Parameter.*;

/**
 * A filter that the user authenticates.
 * 
 * @author Viktor
 *
 */
public class AuthorizationUser implements Filter {

	private List<String> actionList = Arrays.asList(REQUEST_ACTION_PERSONALPAGE, REQUEST_ACTION_CREATE_ORDER,
			REQUEST_ACTION_ORDER_LIST_USER, REQUEST_ACTION_ORDER_DELETE, REQUEST_ACTION_ORDER_UPDATE,
			REQUEST_ACTION_ORDER_UPDATE_ADMIN, REQUEST_ACTION_ORDER_LIST_ADMIN, REQUEST_ACTION_ROOM_PAYMENT, REQUEST_PARAMETER_ORDER);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpSession session = req.getSession(true);
		String action = req.getParameter(REQUEST_PARAMETER_ACTION);
		User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
		Boolean presenceAction = actionList.contains(action.toLowerCase());
		if (presenceAction && (user == null)) {
            System.out.println("ddd");
            return;
		}
		chain.doFilter(request, response);

	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
