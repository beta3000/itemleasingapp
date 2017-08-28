package com.itemleasing.itemservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.itemleasing.itemservice.model.Item;
import com.itemleasing.itemservice.service.ItemService;
import org.apache.commons.codec.binary.Base64;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.number.OrderingComparison.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * Created by z00382545 on 8/27/17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = ItemserviceApplication.class
)
@AutoConfigureMockMvc
public class ItemRestControllerTest {

    @Autowired
    private MockMvc mvc;

    @LocalServerPort
    private int port;

    @Test
    public void testGettingAllItems_Status200() throws IOException, Exception {
        mvc.perform(get("/v1/item/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(5))))
                .andExpect(jsonPath("$[0].name", is("item1")));
    }

    @Test
    public void testGettingItemById_Status200() throws IOException, Exception {
        mvc.perform(get("/v1/item/7").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(7)))
                .andExpect(jsonPath("$.name", is("item1")));
    }

    @Test
    public void testGettingItemByUser_Status200() throws IOException, Exception {

        //
        //get access token from authorization server
        //
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("grant_type", "password");
        map.add("scope", "webclient");
        map.add("username", "jadams");
        map.add("password", "password");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String plainCreds = "eagleeye:thisissecret";
        byte[] plainCredsBytes = plainCreds.getBytes();
        byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
        String base64Creds = new String(base64CredsBytes);

        headers.add("Authorization", "Basic " + base64Creds);

        final HttpEntity<MultiValueMap<String, String>> entity1 = new HttpEntity<MultiValueMap<String, String>>(map,
                headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> authResponse = restTemplate.exchange("http://localhost:8901/oauth/token", HttpMethod.POST, entity1, String.class);
        JsonParser jsonParser = new JsonParser();
        JsonObject authObject = (JsonObject)jsonParser.parse(authResponse.getBody());

        JsonElement accessToken = authObject.get("access_token");

        //
        //add access token in the header and fetch items by the user
        //
        headers.clear();
        headers.add("Authorization", "Bearer "+accessToken.getAsString());
        final HttpEntity<String> entity2 = new HttpEntity<String>(headers);
        ResponseEntity<String> itemResponse = restTemplate.exchange("http://localhost:"+port+"/v1/item/itemsByUser", HttpMethod.GET, entity2, String.class);
        JsonArray items = (JsonArray) jsonParser.parse(itemResponse.getBody());
        System.out.println(items);

        List<Item> itemList = new ArrayList<>();

        Gson gson = new Gson();
        for (JsonElement je : items) {
            Item item = gson.fromJson(je, Item.class);
            itemList.add(item);
        }

        //
        //verify the item list
        //
        assertThat(itemList, hasSize(4));
        assertThat(itemList.get(0).getId(), is(7L));
        assertThat(itemList.get(0).getName(), is("item1"));
        assertThat(itemList.get(0).getUser().getUsername(), is("jadams"));

    }
}
