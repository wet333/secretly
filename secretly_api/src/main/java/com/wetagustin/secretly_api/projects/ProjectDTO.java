package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.secrets.SecretDTO;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

import java.util.ArrayList;
import java.util.List;

@Value
@Builder
@Jacksonized
public class ProjectDTO {
    String name;
    List<SecretDTO> secrets;

    public static ProjectDTO fromProject(Project project) {
        List<SecretDTO> dtoSecrets = new ArrayList<>();
        project.getSecrets().forEach(secret -> {
            dtoSecrets.add(
                    SecretDTO.builder()
                            .projectName(project.getName())
                            .keyName(secret.getKeyName())
                            .value(secret.getValue())
                            .build()
            );
        });

        return new ProjectDTO(
                project.getName(),
                dtoSecrets
        );
    }
}
