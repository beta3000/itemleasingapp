package com.itemleasing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
@RefreshScope
public class ListingserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListingserviceApplication.class, args);
	}
}
