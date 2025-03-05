package com.wetagustin.secretly_api.global;

import java.sql.Timestamp;

public class Utils {
    public static Timestamp now() {
        return new Timestamp(System.currentTimeMillis());
    }
}
