package pe.gob.vuce.template.common.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import pe.gob.vuce.template.common.application.dto.*;

import java.util.ArrayList;
import java.util.List;

@Component()
public class ResponseHandler {
	public ResponseEntity<Object> getCommandResponse(HttpStatus status, Object object, String message) {
		ResponseDto responseDto = new ResponseDto();
		ResponseCommandDto responseCommandDto = new ResponseCommandDto();
		Boolean error = status.value() == 500;
		responseCommandDto.setResponse(object);
		responseCommandDto.setError(error);
		responseCommandDto.setMessage(message);
		responseCommandDto.setStatus(status.value());
		responseDto.setResponse(responseCommandDto);
		return new ResponseEntity<Object>(responseDto.getResponse(), status);
	}
	
	public ResponseEntity<Object> getResponse(Object object, HttpStatus status, String message) {
		ResponseDto responseDto = new ResponseDto();
		ResponseCommandDto responseCommandDto = new ResponseCommandDto();
		responseCommandDto.setResponse(object);
		Boolean error = status.value() == 500;
		responseCommandDto.setError(error);
		responseCommandDto.setMessage(message);
		responseCommandDto.setStatus(status.value());
		responseDto.setResponse(responseCommandDto);
		return new ResponseEntity<Object>(responseDto.getResponse(), status);
	}
	
	public <T> ResponseEntity<Object> getDataResponse(List<T> data, HttpStatus status, String message) {
		ResponseDto responseDto = new ResponseDto();
		ResponseQueryDto<T> responseQueryDto = new ResponseQueryDto<T>();
		Boolean error = status.value() == 500;
		responseQueryDto.setData(data);
		responseQueryDto.setError(error);
		responseQueryDto.setMessage(message);
		responseQueryDto.setStatus(status.value());
		responseDto.setResponse(responseQueryDto);
		return new ResponseEntity<Object>(responseDto.getResponse(), status);
	}
	
	public ResponseEntity<Object> getAppCustomErrorResponse(String errorMessages)
    {
		ResponseDto responseDto = new ResponseDto();
		String[] errors = errorMessages.split(",");
		List<ErrorDto> errorsDto = new ArrayList<ErrorDto>();
        for (String error : errors) {
            errorsDto.add(ErrorDto.builder().message(error).build());
        }
        ResponseErrorDto responseErrorDto = ResponseErrorDto.builder().errors(errorsDto).build();
        responseDto.setResponse(responseErrorDto);
        return new ResponseEntity<Object>(responseDto.getResponse(), HttpStatus.BAD_REQUEST);
    }
	
	public ResponseEntity<Object> getAppExceptionResponse()
    {
		ResponseDto responseDto = new ResponseDto();
		List<ErrorDto> errorsDto = new ArrayList<ErrorDto>();
        errorsDto.add(ErrorDto.builder().message("Server error").build());
        ResponseErrorDto responseErrorDto = ResponseErrorDto.builder().errors(errorsDto).build();
        responseDto.setResponse(responseErrorDto);
        return new ResponseEntity<Object>(responseDto.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
