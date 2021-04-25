package com.qm.example.jaxrs.endpoint;

import com.qm.example.icecream.IceCream;
import one.microstream.storage.types.EmbeddedStorage;
import one.microstream.storage.types.EmbeddedStorageManager;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class IceCreamRepositoryImpl implements IceCreamRepository{
    private final List<IceCream> iceCreams;
    private final EmbeddedStorageManager storage;

    public IceCreamRepositoryImpl()
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
    public void add(final IceCream customer)
    {
        this.iceCreams.add(customer);
        this.storeAll();
    }

    @Override
    public List<IceCream> findAll()
    {
        return this.iceCreams;
    }
}
