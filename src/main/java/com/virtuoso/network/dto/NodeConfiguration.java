package com.virtuoso.network.dto;

import java.util.List;

public class NodeConfiguration {
    private String type;
    private List<NodeConnection> connections;

    public NodeConfiguration(String type, List<NodeConnection> connections) {
        this.type = type;
        this.connections = connections;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<NodeConnection> getConnections() {
        return connections;
    }

    public void setConnections(List<NodeConnection> connections) {
        this.connections = connections;
    }
}
