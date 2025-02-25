package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.secrets.SecretDTO;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Value
@Builder
@Jacksonized
public class ProjectDTO {
    Long id;
    String name;
    List<SecretDTO> secrets;
}
