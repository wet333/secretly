package com.wetagustin.secretly_api.secrets;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class SecretDTO {
    Long id;
    String keyName;
    String value;
}
