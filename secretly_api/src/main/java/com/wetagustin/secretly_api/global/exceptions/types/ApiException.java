package com.wetagustin.secretly_api.global.exceptions.types;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
