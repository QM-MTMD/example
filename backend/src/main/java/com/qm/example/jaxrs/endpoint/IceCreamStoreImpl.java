package com.qm.example.jaxrs.endpoint;

import one.microstream.storage.types.EmbeddedStorage;
import one.microstream.storage.types.EmbeddedStorageManager;
import org.openapitools.model.RestIceCream;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class IceCreamStoreImpl implements IceCreamStore {
    private final List<RestIceCream> iceCreams;
    private final EmbeddedStorageManager storage;

    public IceCreamStoreImpl()
    {
        super();

        this.iceCreams = new ArrayList<>();

        this.storage   = EmbeddedStorage.start(
                this.iceCreams,
                Paths.get("icecream-store")
        );
    }

    @Override
    public void storeAll()
    {
        this.storage.store(this.iceCreams);
    }

    @Override
    public void delete(RestIceCream toBeDeleted) {
        this.iceCreams.remove(toBeDeleted);
    }

    @Override
    public void add(final RestIceCream iceCream) {
        if (!exist(iceCream.getName())) {
            this.iceCreams.add(iceCream);
            this.storeAll();
        } else {
            System.out.println("Ist schon da.");
        }
    }

    @Override
    public List<RestIceCream> findAll() {
        return this.iceCreams;
    }

    boolean exist(String name) {
        if (name == null) {
            throw new IllegalArgumentException("Name has to be available.");
        }
        for (RestIceCream iceCreamFromList : this.iceCreams) {
            return iceCreamFromList.getName().equals(name);
        }
        return true;
    }
}
