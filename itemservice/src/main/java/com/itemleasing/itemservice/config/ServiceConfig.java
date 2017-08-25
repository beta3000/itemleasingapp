package com.itemleasing.itemservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * Created by z00382545 on 8/23/17.
 */

@Component
@Configuration
public class ServiceConfig {

    @Value("${signing.key}")
    private String jwtSigningKey = "";

    public String getJwtSigningKey() {
        return jwtSigningKey;
    }
}
