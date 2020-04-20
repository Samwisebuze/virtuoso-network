package com.virtuoso.network.repository;

import com.virtuoso.network.model.NetworkDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NetworkRepository extends MongoRepository<NetworkDocument, UUID>  {
}
