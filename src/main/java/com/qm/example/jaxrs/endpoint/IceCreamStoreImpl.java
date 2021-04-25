package com.qm.example.jaxrs.endpoint;

import com.qm.example.icecream.IceCream;
import one.microstream.storage.types.EmbeddedStorage;
import one.microstream.storage.types.EmbeddedStorageManager;
import org.openapitools.model.RestIceCream;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class IceCreamStoreImpl implements IceCreamStore {
    private final List<RestIceCream> iceCreams;
    private final EmbeddedStorageManager storage;

    public IceCreamStoreImpl()
    {
        super();

        this.iceCreams = new ArrayList<>();

        this.storage   = EmbeddedStorage.start(
                this.iceCreams,
                Paths.get("${user.home}/icecream-store")
        );
    }

    @Override
    public void storeAll()
    {
        this.storage.store(this.iceCreams);
    }

    @Override
    public void add(final RestIceCream iceCream)
    {
        this.iceCreams.add(iceCream);
        this.storeAll();
    }

    @Override
    public List<RestIceCream> findAll()
    {
        return this.iceCreams;
    }
}
