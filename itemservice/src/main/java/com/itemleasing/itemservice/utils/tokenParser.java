package com.itemleasing.itemservice.utils;

import com.itemleasing.itemservice.config.ServiceConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by z00382545 on 8/25/17.
 */
public class tokenParser {

    @Autowired
    private ServiceConfig serviceConfig;

    public static String getUsername(String token, String signingKey) {
        String username = "";

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(signingKey.getBytes("UTF-8"))
                    .parseClaimsJws(token).getBody();

            username = (String) claims.get("user_name");

            return username;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return username;
    }
}
