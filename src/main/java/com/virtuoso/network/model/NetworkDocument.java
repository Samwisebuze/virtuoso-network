package com.virtuoso.network.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "networks")
public class NetworkDocument {
    @Id
    private ObjectId id;
    private List<NodeModel> nodes;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public List<NodeModel> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeModel> nodes) {
        this.nodes = nodes;
    }



    @Override
    public String toString() {
        return "Network [id: " + id + ", nodes: " + nodes + "]";
    }
}
