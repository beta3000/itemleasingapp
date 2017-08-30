package com.itemleasing.itemservice.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

    @Configuration
    public class AWSConfiguration {

        @Value("${cloud.aws.credentials.accessKey}")
        private String accessKey;

        @Value("${cloud.aws.credentials.secretKey}")
        private String secretKey;

        @Bean
        public AmazonS3 amazonS3Client() {
            BasicAWSCredentials creds = new BasicAWSCredentials(accessKey, secretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(creds)).withRegion("us-east-1").build();

            return s3Client;
        }
    }
