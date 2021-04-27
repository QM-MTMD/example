package com.qm.example.jaxrs.endpoint;

import org.openapitools.api.IcecreamsApi;
import org.openapitools.model.RestIceCream;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.ws.rs.Path;
import java.util.List;

@ApplicationScoped
@Path("icecreams")
public class IceCreamResource implements IcecreamsApi {

    @Inject
    IceCreamStore iceCreamStore;

    @Override
    public List<RestIceCream> iceCreamList() {
        return iceCreamStore.findAll();
    }

    @Override
    public void storeIceCream(RestIceCream restIceCream) {
        iceCreamStore.add(restIceCream);
    }
}