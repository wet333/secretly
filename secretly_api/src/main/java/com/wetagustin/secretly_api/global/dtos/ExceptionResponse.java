package com.wetagustin.secretly_api.global.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ExceptionResponse {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ExceptionResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ExceptionResponse(int status, String error, String message, String path) {
        this(); // No args constructor
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}
