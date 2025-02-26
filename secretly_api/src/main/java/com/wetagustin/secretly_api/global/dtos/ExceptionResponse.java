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
    private String type;
    private String title;
    private int status;
    private String detail;

    public ExceptionResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ExceptionResponse(int status, String title, String detail, String type) {
        this(); // No args constructor
        this.status = status;
        this.title = title;
        this.detail = detail;
        this.type = type;
    }
}
