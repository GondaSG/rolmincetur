package pe.gob.vuce.template.common.infrastructure.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import pe.gob.vuce.template.common.application.dto.ErrorDto;
import pe.gob.vuce.template.common.application.dto.ResponseDto;
import pe.gob.vuce.template.common.application.dto.ResponseErrorDto;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class JwtTokenFilter extends GenericFilterBean {
	private final JwtTokenProvider jwtTokenProvider;

	public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
			throws IOException, ServletException {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
		try {
			if (!isPublicEndPoint(req) && jwtTokenProvider.validateToken(token)) {
				Authentication auth = token != null ? jwtTokenProvider.getAuthentication(token) : null;
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		} catch (Exception ex) {
            ResponseDto responseDto = new ResponseDto();
    		List<ErrorDto> errorsDto = new ArrayList<ErrorDto>();
            errorsDto.add(ErrorDto.builder().message(ex.getMessage()).build());
            ResponseErrorDto responseErrorDto = ResponseErrorDto.builder().errors(errorsDto).build();
            responseDto.setResponse(responseErrorDto);
            byte[] responseToSend = restResponseBytes(responseDto.getResponse());
            ((HttpServletResponse) res).setHeader("Content-Type", "application/json");
            ((HttpServletResponse) res).setStatus(403);
            res.getOutputStream().write(responseToSend);
            return;
		}
		filterChain.doFilter(req, res);
	}
	
	/*public Long getSessionFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Long userIdFromToken = Long.parseLong(authentication.getName());
            return 0L;
        }
        return null;
    }*/
	
	private byte[] restResponseBytes(Object response) throws IOException {
        String serialized = new ObjectMapper().writeValueAsString(response);
        return serialized.getBytes();
    }
	
	private boolean isPublicEndPoint(ServletRequest req) {
		HashSet<String> publicEndPoints = getPublicEndPoints();
		HttpServletRequest request = (HttpServletRequest) req;
		String path = request.getRequestURI().substring(request.getContextPath().length());
		return publicEndPoints.contains(path.toLowerCase());
	}
	
	private HashSet<String> getPublicEndPoints() {
		HashSet<String> endPoints = new HashSet<String>();
		endPoints.add("/authorization/extranet");
		endPoints.add("/authorization/reload-session");
		return endPoints;
	}
}
