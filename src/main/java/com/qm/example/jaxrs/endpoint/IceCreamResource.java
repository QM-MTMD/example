package com.qm.example.jaxrs.endpoint;

import org.openapitools.api.IcecreamsApi;
import org.openapitools.model.RestIceCreamResponse;

import javax.inject.Inject;

public class IceCreamResource implements IcecreamsApi {

    @Inject
    IceCreamStore iceCreamStore;

    @Override
    public RestIceCreamResponse iceCreamList() {
        RestIceCreamResponse restIceCreamResponse = new RestIceCreamResponse();
        restIceCreamResponse.setIcecreamList(iceCreamStore.findAll());
        return restIceCreamResponse;
    }
}
