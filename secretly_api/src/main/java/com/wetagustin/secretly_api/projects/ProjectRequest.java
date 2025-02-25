package com.wetagustin.secretly_api.projects;

import com.wetagustin.secretly_api.secrets.SecretRequest;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Value
@Builder
@Jacksonized
public class ProjectRequest {
    String name;
    List<SecretRequest> secrets;
}
