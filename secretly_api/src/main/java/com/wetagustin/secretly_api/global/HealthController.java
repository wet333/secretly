package com.wetagustin.secretly_api.global;

import com.wetagustin.secretly_api.global.dtos.SimpleResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping
    public ResponseEntity<SimpleResponse<Map<String, String>>> health() {
        SimpleResponse<Map<String, String>> response = new SimpleResponse<>();

        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                response.setMessage("Service is healthy");
                response.setData(Map.of("status", "UP"));
                return ResponseEntity.ok(response);
            }
        } catch (SQLException ignored) {
        }

        response.setMessage("Service is unavailable");
        response.setData(Map.of("status", "DOWN"));
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}
