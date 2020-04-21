package com.virtuoso.network.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

public class NodeDocument {
    private String type;
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private List<NodeConnectionDocument> connections;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<NodeConnectionDocument> getConnections() {
        return connections;
    }

    public void setConnections(List<NodeConnectionDocument> connections) {
        this.connections = connections;
    }

    @Override
    public String toString() {
        return "Node [id:" + id + ", type:" + type + ", connections=" + connections + "]";
    }
}
