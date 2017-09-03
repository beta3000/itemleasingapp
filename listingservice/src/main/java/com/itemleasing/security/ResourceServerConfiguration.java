package com.itemleasing.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * Created by z00382545 on 8/23/17.
 */

@Configuration
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter{

    private static final String[] PUBLIC_MATCHERS = {
            "/v1/listing/all",
            "/v1/listing/{id}",
            "/v1/listing/{id}/item"
    };

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(PUBLIC_MATCHERS)
                .permitAll()
                .antMatchers("/v1/listing/**")
                .hasRole("USER")
                .anyRequest()
                .authenticated();
    }

}
