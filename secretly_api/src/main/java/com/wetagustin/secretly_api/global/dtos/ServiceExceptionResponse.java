package com.wetagustin.secretly_api.global.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ServiceExceptionResponse extends ExceptionResponse {

    private String serviceClass;

    public ServiceExceptionResponse() {
        super();
    }

    public ServiceExceptionResponse(String service, int status, String error, String message, String path) {
        super(status, error, message, path);
        this.serviceClass = service;
    }
}
