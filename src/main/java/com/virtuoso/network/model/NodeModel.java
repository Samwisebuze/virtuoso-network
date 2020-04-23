package com.virtuoso.network.model;

import java.util.List;

public class NodeModel {
    private String type;
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private List<NodeConnectionModel> connections;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<NodeConnectionModel> getConnections() {
        return connections;
    }

    public void setConnections(List<NodeConnectionModel> connections) {
        this.connections = connections;
    }

    @Override
    public String toString() {
        return "Node [id:" + id + ", type:" + type + ", connections=" + connections + "]";
    }
}
