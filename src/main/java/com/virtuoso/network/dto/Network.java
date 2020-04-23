package com.virtuoso.network.dto;

import java.util.List;

public class Network {
    private String id;
    private List<Node> machines;

    public Network(List<Node> machines) {
        this.machines = machines;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Node> getMachines() {
        return machines;
    }

    public void setMachines(List<Node> machines) {
        this.machines = machines;
    }

}
