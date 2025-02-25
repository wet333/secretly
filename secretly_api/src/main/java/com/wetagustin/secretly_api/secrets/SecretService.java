package com.wetagustin.secretly_api.secrets;

import com.wetagustin.secretly_api.global.EncryptionUtils;
import org.springframework.stereotype.Service;

@Service
public class SecretService {

    private SecretRepository secretRepository;
    private EncryptionUtils encryptionUtils;
}
