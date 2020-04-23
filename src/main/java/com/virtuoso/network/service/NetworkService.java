package com.virtuoso.network.service;

import com.virtuoso.network.dto.Network;
import com.virtuoso.network.dto.Node;
import com.virtuoso.network.dto.NodeConfiguration;
import com.virtuoso.network.model.NetworkDocument;
import com.virtuoso.network.repository.NetworkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NetworkService {
    private final NetworkRepository networkRepository;
    private final ModelMapper mapper;

    public NetworkService(NetworkRepository networkRepository, ModelMapper modelMapper)
    {
        this.networkRepository = networkRepository;
        this.mapper = modelMapper;
    }

    public Page<Network> listNetworks(Pageable pageable){
        Page<NetworkDocument> networkDocumentsPage = networkRepository.findAll(pageable);
        List<Network> networks = networkDocumentsPage.get().map(n -> mapper.map(n, Network.class)).collect(Collectors.toList());
        int start, end, size;

        size = networks.size();
        start = (int) pageable.getOffset();
        end = Math.min((start + pageable.getPageSize()), size);

        return new PageImpl<>(networks.subList(start, end), pageable, size);

    }

    public Optional<Network> findNetworkById(String networkId){
        Optional<Network> result = Optional.empty();
        Optional<NetworkDocument> networkDocument = networkRepository.findById(UUID.fromString(networkId));
        if (networkDocument.isPresent()){
            result = Optional.of(mapper.map(networkDocument.get(), Network.class));
        }

        return result;
    }

    public Network createNetwork(List<NodeConfiguration> nodeConfigurations){
        // Repository handles the ID generation
        List<Node> nodes = nodeConfigurations.stream()
                .map(nc -> new Node(nc.getType(), nc.getConnections()))
                .collect(Collectors.toList());

        Network networkToCreate = new Network(nodes);

        NetworkDocument doc = mapper.map(networkToCreate, NetworkDocument.class);
        doc = networkRepository.save(doc);
        return mapper.map(doc, Network.class);
    }
}
