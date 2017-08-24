//package com.itemleasing.authentication.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
//import org.springframework.security.oauth2.common.OAuth2AccessToken;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.security.oauth2.provider.token.TokenEnhancer;
//
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * Created by z00382545 on 8/23/17.
// */
//public class JWTTokenEnhancer implements TokenEnhancer {
//
//    @Override
//    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
//        Map<String, Object> additionalInfo = new HashMap<>();
//        String orgId =  "dummy organization id";
//
//        additionalInfo.put("organizationId", orgId);
//
//        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
//        return accessToken;
//    }
//}
