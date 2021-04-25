package com.qm.example.jaxrs.endpoint;

import org.openapitools.api.IcecreamsApi;
import org.openapitools.model.RestIceCreamResponse;

public class IceCreamResource implements IcecreamsApi {

    @Override
    public RestIceCreamResponse iceCreamList() {
        return new RestIceCreamResponse();
    }
}
