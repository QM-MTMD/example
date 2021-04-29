package com.qm.example.jaxrs.endpoint;

import org.openapitools.model.RestIceCream;

import java.util.List;

public interface IceCreamStore {

    void add(RestIceCream customer);

    List<RestIceCream> findAll();

    void storeAll();

    void delete(RestIceCream toBeDeleted);
}