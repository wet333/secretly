package com.wetagustin.secretly_api.secrets;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class SecretRequest {
    String keyName;
    String value;
}
