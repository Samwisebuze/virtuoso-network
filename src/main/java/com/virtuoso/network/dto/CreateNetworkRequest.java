package com.virtuoso.network.dto;

import java.util.List;

public class CreateNetworkRequest extends ModifyNetworkRequest{
    private List<NodeConfiguration> nodeConfigs;

    public List<NodeConfiguration> getNodeConfigs() {
        return nodeConfigs;
    }

    public void setNodeConfigs(List<NodeConfiguration> nodeConfigs) {
        this.nodeConfigs = nodeConfigs;
    }
}
