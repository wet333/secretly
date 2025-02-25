package com.wetagustin.secretly_api.global;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class EncryptionUtils {

    @Value("app.security.private-key")
    private String SECRET_KEY;

    private final String INIT_VECTOR = "encryptionIntVec";

    public String encrypt(String value) {
        try {
            IvParameterSpec iv = new IvParameterSpec(INIT_VECTOR.getBytes());
            SecretKey secretKey = new SecretKeySpec(this.SECRET_KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

            cipher.init(Cipher.ENCRYPT_MODE, secretKey, iv);
            byte[] encrypted = cipher.doFinal(value.getBytes());

            return Base64.getEncoder().encodeToString(encrypted);

        } catch (Exception ex) {
            throw new RuntimeException("Error occurred while encrypting data", ex);
        }
    }

    public String decrypt(String encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(INIT_VECTOR.getBytes());
            SecretKey secretKey = new SecretKeySpec(this.INIT_VECTOR.getBytes(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);

            byte[] original = cipher.doFinal(Base64.getDecoder().decode(encrypted));
            return new String(original);

        } catch (Exception ex) {
            throw new RuntimeException("Error occurred while decrypting data", ex);
        }
    }
}
