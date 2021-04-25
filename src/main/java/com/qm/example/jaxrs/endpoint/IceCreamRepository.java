package com.qm.example.jaxrs.endpoint;

import com.qm.example.icecream.IceCream;
import java.util.List;

public interface IceCreamRepository {

    void add(IceCream customer);

    List<IceCream> findAll();

    void storeAll();
}