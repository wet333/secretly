package com.wetagustin.secretly_api.global.exceptions;

import com.wetagustin.secretly_api.global.dtos.ExceptionResponse;
import com.wetagustin.secretly_api.global.dtos.ServiceExceptionResponse;
import com.wetagustin.secretly_api.global.exceptions.types.ServiceException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.NonUniqueResultException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    //------------------------------------------------------------------------------------------------------------------
    // Catches all Service's method exceptions
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ServiceExceptionResponse> handleServiceException(
            ServiceException ex, HttpServletRequest request
    ) {
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

    //------------------------------------------------------------------------------------------------------------------
    // Database Exceptions
    @ExceptionHandler({EntityNotFoundException.class, NoResultException.class, EmptyResultDataAccessException.class})
    public ResponseEntity<ExceptionResponse> handleNotFoundExceptions(Exception ex, HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug(response.toString());
        logger.error("Resource not found: {}", ex.getMessage(), ex);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            InvalidDataAccessApiUsageException.class,
            NonUniqueResultException.class
    })
    public ResponseEntity<ExceptionResponse> handleInvalidQueryExceptions(Exception ex, HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Invalid query or parameters: " + ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug(response.toString());
        logger.error("Invalid query: {}", ex.getMessage(), ex);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            DataIntegrityViolationException.class,
            EntityExistsException.class
    })
    public ResponseEntity<ExceptionResponse> handleDataIntegrityException(
            DataIntegrityViolationException ex, HttpServletRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug(response.toString());
        logger.error(ex.getMessage(), ex);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ExceptionResponse> handleDataAccessException(
            DataAccessException ex, HttpServletRequest request
    ) {
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

    //------------------------------------------------------------------------------------------------------------------
    // HTTP Exceptions
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpServletRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Malformed JSON request",
                request.getRequestURI()
        );
        logger.debug("Malformed JSON: {}", response);
        logger.error("JSON parse error", ex);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleAccessDeniedException(
            AccessDeniedException ex, HttpServletRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
                HttpStatus.FORBIDDEN.value(),
                HttpStatus.FORBIDDEN.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        logger.debug("Access denied: {}", response);
        logger.error("Access denied error", ex);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    //------------------------------------------------------------------------------------------------------------------
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
