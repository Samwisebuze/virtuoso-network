package com.virtuoso.network.controller;

import com.virtuoso.network.dto.CreateNetworkRequest;
import com.virtuoso.network.dto.Network;
import com.virtuoso.network.service.NetworkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/networks")
public class NetworkController {
    private final NetworkService networkService;

    public NetworkController(NetworkService networkService) {
        this.networkService = networkService;
    }

    @GetMapping
    public ResponseEntity<Page<Network>> listNetworks(Pageable pageable) {
        ResponseEntity res = ResponseEntity.badRequest().build();
        try {
            Page<Network> networks = networkService.listNetworks(pageable);
            res = ResponseEntity.ok(networks);
        } catch (Exception e) {
            res = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return res;
    }

    @GetMapping("/{networkId}")
    public ResponseEntity<Network> getNetworkById(@PathVariable String networkId) {
        ResponseEntity res = ResponseEntity.badRequest().build();
        try {
            Optional<Network> network = networkService.findNetworkById(networkId);
            if (!network.isPresent()) {
                res = ResponseEntity.notFound().build();
            } else {
                res = ResponseEntity.ok(network.get());
            }
        } catch (Exception e) {
            res = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return res;
    }

    @PostMapping
    public ResponseEntity<Network> createNetwork(@RequestBody CreateNetworkRequest createNetworkRequest) {
        ResponseEntity res = ResponseEntity.badRequest().build();
        Network network = null;
        try {
            network = networkService.createNetwork(createNetworkRequest.getNodeConfigs());
            res = ResponseEntity.ok(network);
        } catch (Exception e) {
            res = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (network == null) {
                res = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return res;
    }

    @GetMapping("/{networkId}/machines")
    public ResponseEntity<Network> getMachinesForNetwork(@PathVariable String networkId) {
        ResponseEntity res = ResponseEntity.badRequest().build();
        try {
            Optional<Network> network = networkService.findNetworkById(networkId);
            if (!network.isPresent()) {
                res = ResponseEntity.notFound().build();
            } else {
                res = ResponseEntity.ok(network.get().getMachines());
            }
        } catch (Exception e) {
            res = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return res;
    }
}
