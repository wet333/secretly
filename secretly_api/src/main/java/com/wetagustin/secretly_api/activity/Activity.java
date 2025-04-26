package com.wetagustin.secretly_api.activity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "activities")
public class Activity {

    public enum ActivityAction { CREATE, DELETE, UPDATE }

    public enum ActivityType {
        PROJECT_ACTIVITY,
        SECRET_ACTIVITY,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private Timestamp createdAt;

    private ActivityAction activityAction;
    private ActivityType activityType;

    @Convert(converter = MapStringStringConverter.class)
    @Column(columnDefinition = "TEXT")
    private Map<String, String> activityInfo;

    @Converter
    public static class MapStringStringConverter implements AttributeConverter<Map<String, String>, String> {
        private static final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public String convertToDatabaseColumn(Map<String, String> attribute) {
            try {
                return objectMapper.writeValueAsString(attribute);
            } catch (JsonProcessingException e) {
                return "{}";
            }
        }

        @Override
        public Map<String, String> convertToEntityAttribute(String dbData) {
            try {
                if (dbData == null || dbData.isEmpty()) {
                    return new HashMap<>();
                }
                return objectMapper.readValue(dbData, new TypeReference<>(){});
            } catch (JsonProcessingException e) {
                return new HashMap<>();
            }
        }
    }
}
