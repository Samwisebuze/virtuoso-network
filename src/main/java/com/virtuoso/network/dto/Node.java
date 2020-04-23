package com.virtuoso.network.dto;

import java.util.List;
import java.util.UUID;

public class Node extends NodeConfiguration {
    private String id = UUID.randomUUID().toString();

    public Node(String type, List<NodeConnection> connections) {
        super(type, connections);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
