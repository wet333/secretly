package com.wetagustin.secretly_api.global;

import java.sql.Timestamp;

public class Utils {
    /**
     * Returns the current timestamp based on the system clock in milliseconds.
     *
     * @return a {@link Timestamp} object representing the current system time.
     */
    public static Timestamp now() {
        return new Timestamp(System.currentTimeMillis());
    }
}
