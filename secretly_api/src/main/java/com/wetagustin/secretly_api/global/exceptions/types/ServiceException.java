package com.wetagustin.secretly_api.global.exceptions.types;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceException extends ApiException {

    private final String serviceClassName;

    public ServiceException(String serviceClassName, String message) {
        super(message);
        this.serviceClassName = serviceClassName;
    }
}
