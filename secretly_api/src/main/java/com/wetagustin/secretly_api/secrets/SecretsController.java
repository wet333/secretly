package com.wetagustin.secretly_api.secrets;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secrets")
public class SecretsController {

    @GetMapping
    String getHelloWorld() {
        return "Hello World";
    }

}
