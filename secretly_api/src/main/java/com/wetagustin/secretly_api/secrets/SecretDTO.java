package com.wetagustin.secretly_api.secrets;

import com.wetagustin.secretly_api.projects.Project;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.util.ArrayList;
import java.util.List;

@Value
@Builder
@Jacksonized
public class SecretDTO {
    String projectName;
    String keyName;
    String value;

    public static SecretDTO fromSecret(Secret secret) {
        return new SecretDTO(
                secret.getProject().getName(),
                secret.getKeyName(),
                secret.getValue()
        );
    }

    public static List<SecretDTO> extractFromProject(Project project) {
        List<SecretDTO> secretDTOs = new ArrayList<>();

        for (Secret secret : project.getSecrets()) {
            secretDTOs.add(SecretDTO.builder()
                    .projectName(project.getName())
                    .keyName(secret.getKeyName())
                    .value(secret.getValue())
                    .build()
            );
        }
        return secretDTOs;
    }
}
