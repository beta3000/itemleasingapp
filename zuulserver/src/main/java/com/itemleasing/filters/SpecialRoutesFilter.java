//package com.itemleasing.filters;
//
//import com.itemleasing.model.AbTestingRoute;
//import com.netflix.zuul.ZuulFilter;
//import com.netflix.zuul.context.RequestContext;
//import org.apache.http.Header;
//import org.apache.http.HttpHost;
//import org.apache.http.HttpRequest;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.HttpClient;
//import org.apache.http.client.methods.HttpPatch;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.client.methods.HttpPut;
//import org.apache.http.entity.ContentType;
//import org.apache.http.entity.InputStreamEntity;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.message.BasicHeader;
//import org.apache.http.message.BasicHttpRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.netflix.zuul.filters.ProxyRequestHelper;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.RestTemplate;
//
//import javax.servlet.http.HttpServletRequest;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.URL;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.Random;
//
///**
// * Created by z00382545 on 9/17/17.
// */
//
//@Component
//public class SpecialRoutesFilter extends ZuulFilter {
//    private static final int FILTER_ORDER =  1;
//    private static final boolean SHOULD_FILTER =true;
//
//    private ProxyRequestHelper helper
//            = new ProxyRequestHelper();
//
//    @Autowired
//    private FilterUtils filterUtils;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Override
//    public String filterType() {
//        return filterUtils.ROUTE_FILTER_TYPE;
//    }
//
//    @Override
//    public int filterOrder() {
//        return FILTER_ORDER;
//    }
//
//    @Override
//    public boolean shouldFilter() {
//        return SHOULD_FILTER;
//    }
//
//    public Object run() {
//        RequestContext ctx = RequestContext.getCurrentContext();
//
//        AbTestingRoute abTestRoute = getAbRoutingInfo( filterUtils.getServiceId());
//
//        if ( abTestRoute != null && useSpecialRoute (abTestRoute) ) {
//            String route = buildRouteString(ctx.getRequest().getRequestURI(), abTestRoute.getEndpoint(), ctx.get("serviceID").toString());
//            forwardToSpecialRoute(route);
//        }
//
//        return null;
//    }
//
//    private AbTestingRoute getAbRoutingInfo(String serviceName) {
//        ResponseEntity<AbTestingRoute> restExchange = null;
//
//        try {
//            restExchange = restTemplate.exchange("http://specialrouteservice/v1/route/abtesting/{serviceName}", HttpMethod.GET, null, AbTestingRoute.class, serviceName);
//        } catch (HttpClientErrorException ex) {
//            if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
//                throw ex;
//            }
//        }
//        return restExchange.getBody();
//
//    }
//
//    public boolean useSpecialRoute(AbTestingRoute testRoute) {
//        Random random = new Random();
//
//        if (testRoute.getActive().equals("N")) {
//            return false;
//        }
//
//        int value = random.nextInt((10 - 1) + 1) + 1;
//
//        if (testRoute.getWeight() < value) {
//            return true;
//        }
//
//        return false;
//    }
//
//    private void forwardToSpecialRoute(String route) {
//        RequestContext context = RequestContext.getCurrentContext();
//        HttpServletRequest request = context.getRequest();
//
//        MultiValueMap<String, String> headers = helper.buildZuulRequestHeaders(request);
//        MultiValueMap<String, String> params = helper.buildZuulRequestQueryParams(request);
//
//        String verb = getVerb(request);
//        InputStream requestEntity = getRequestBody(request);
//        if(request.getContentLength() < 0) {
//            context.setChunkedRequestBody();
//        }
//
//        this.helper.addIgnoredHeaders();
//        CloseableHttpClient httpClient = null;
//        HttpResponse response = null;
//
//        try {
//            httpClient = HttpClients.createDefault();
//            response = forward(httpClient, verb, route, request, headers, params, requestEntity);
//            setResponse(response);
//        }  catch (Exception ex ) {
//            ex.printStackTrace();
//
//        }
//        finally{
//            try {
//                httpClient.close();
//            }
//            catch(IOException ex){
//            }
//        }
//    }
//
//    private org.apache.http.HttpResponse forward(HttpClient httpclient, String verb, String uri,
//                                                 HttpServletRequest request, MultiValueMap<String, String> headers,
//                                                 MultiValueMap<String, String> params, InputStream requestEntity)
//            throws Exception {
//        Map<String, Object> info = this.helper.debug(verb, uri, headers, params,
//                requestEntity);
//        URL host = new URL( uri );
//        HttpHost httpHost = getHttpHost(host);
//
//        HttpRequest httpRequest;
//        int contentLength = request.getContentLength();
//        InputStreamEntity entity = new InputStreamEntity(requestEntity, contentLength,
//                request.getContentType() != null
//                        ? ContentType.create(request.getContentType()) : null);
//        switch (verb.toUpperCase()) {
//            case "POST":
//                HttpPost httpPost = new HttpPost(uri);
//                httpRequest = httpPost;
//                httpPost.setEntity(entity);
//                break;
//            case "PUT":
//                HttpPut httpPut = new HttpPut(uri);
//                httpRequest = httpPut;
//                httpPut.setEntity(entity);
//                break;
//            case "PATCH":
//                HttpPatch httpPatch = new HttpPatch(uri );
//                httpRequest = httpPatch;
//                httpPatch.setEntity(entity);
//                break;
//            default:
//                httpRequest = new BasicHttpRequest(verb, uri);
//
//        }
//        try {
//            httpRequest.setHeaders(convertHeaders(headers));
//            org.apache.http.HttpResponse zuulResponse = forwardRequest(httpclient, httpHost, httpRequest);
//
//            return zuulResponse;
//        }
//        finally {
//        }
//    }
//
//    private InputStream getRequestBody(HttpServletRequest request) {
//        InputStream requestEntity = null;
//        try {
//            requestEntity = request.getInputStream();
//        }
//        catch (IOException ex) {
//            // no requestBody is ok.
//        }
//        return requestEntity;
//    }
//
//    private void setResponse(HttpResponse response) throws IOException {
//        this.helper.setResponse(response.getStatusLine().getStatusCode(),
//                response.getEntity() == null ? null : response.getEntity().getContent(),
//                revertHeaders(response.getAllHeaders()));
//    }
//
//    private String buildRouteString(String oldEndpoint, String newEndpoint, String serviceName){
//        int index = oldEndpoint.indexOf(serviceName);
//
//        String strippedRoute = oldEndpoint.substring(index + serviceName.length());
//        System.out.println("Target route: " + String.format("%s/%s", newEndpoint, strippedRoute));
//        return String.format("%s/%s", newEndpoint, strippedRoute);
//    }
//
//    private String getVerb(HttpServletRequest request) {
//        String sMethod = request.getMethod();
//        return sMethod.toUpperCase();
//    }
//
//    private HttpHost getHttpHost(URL host) {
//        HttpHost httpHost = new HttpHost(host.getHost(), host.getPort(),
//                host.getProtocol());
//        return httpHost;
//    }
//
//    private Header[] convertHeaders(MultiValueMap<String, String> headers) {
//        List<Header> list = new ArrayList<>();
//        for (String name : headers.keySet()) {
//            for (String value : headers.get(name)) {
//                list.add(new BasicHeader(name, value));
//            }
//        }
//        return list.toArray(new BasicHeader[0]);
//    }
//
//    private org.apache.http.HttpResponse forwardRequest(HttpClient httpclient, HttpHost httpHost,
//                                                        HttpRequest httpRequest) throws IOException {
//        return httpclient.execute(httpHost, httpRequest);
//    }
//
//
//    private MultiValueMap<String, String> revertHeaders(Header[] headers) {
//        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
//        for (Header header : headers) {
//            String name = header.getName();
//            if (!map.containsKey(name)) {
//                map.put(name, new ArrayList<String>());
//            }
//            map.get(name).add(header.getValue());
//        }
//        return map;
//    }
//
//
//}
