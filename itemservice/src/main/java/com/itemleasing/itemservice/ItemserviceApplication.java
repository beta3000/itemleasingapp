package com.itemleasing.itemservice;

import com.itemleasing.itemservice.event.UserChangeModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
@EnableFeignClients
@EnableEurekaClient
@EnableBinding(Sink.class)
@EnableCircuitBreaker
//@RefreshScope
public class ItemserviceApplication {
	private static final Logger logger = LoggerFactory.getLogger(ItemserviceApplication.class);

	@Bean
	public OAuth2RestTemplate oauth2RestTemplate(OAuth2ClientContext oauth2ClientContext,
												 OAuth2ProtectedResourceDetails details) {
		return new OAuth2RestTemplate(details, oauth2ClientContext);
	}

	@StreamListener(Sink.INPUT)
	public void loggerSink(
			UserChangeModel userChange
	){
		logger.debug("Received an event for username {}", userChange.getUsername());
	}

	public static void main(String[] args) {
		SpringApplication.run(ItemserviceApplication.class, args);
	}
}
