package com.wetagustin.secretly_api.global.exceptions;

import com.wetagustin.secretly_api.global.dtos.ExceptionResponse;
import com.wetagustin.secretly_api.global.dtos.ServiceExceptionResponse;
import com.wetagustin.secretly_api.global.exceptions.types.ServiceException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    // Catches all Service's method exceptions
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ServiceExceptionResponse> handleServiceException(ServiceException ex, HttpServletRequest request) {
        ServiceExceptionResponse response = new ServiceExceptionResponse(
                ex.getServiceClassName(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug(response.toString());
        logger.error(ex.getMessage(), ex);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Catch-All Exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug(response.toString());
        logger.error(ex.getMessage(), ex);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
