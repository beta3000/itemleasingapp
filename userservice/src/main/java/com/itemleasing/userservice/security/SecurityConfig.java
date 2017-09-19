package com.itemleasing.userservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by z00382545 on 8/24/17.
 */

@Configuration
public class SecurityConfig extends ResourceServerConfigurerAdapter {

    private static final String[] PUBLIC_MATCHERS = {
            "/v1/user/**"
//            "/v1/user"
    };

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests().
//                antMatchers("/**").
        antMatchers(PUBLIC_MATCHERS).
                permitAll().anyRequest().authenticated();
    }
}
