package com.itemleasing.itemservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
@EnableFeignClients
@EnableEurekaClient
@RefreshScope
public class ItemserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItemserviceApplication.class, args);
	}
}
