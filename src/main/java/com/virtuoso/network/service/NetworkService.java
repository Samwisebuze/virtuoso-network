package com.virtuoso.network.service;

import com.virtuoso.network.dto.Network;
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
    private final ModelMapper mapper = new ModelMapper();

    public NetworkService(NetworkRepository networkRepository) {
        this.networkRepository = networkRepository;
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

    public Network createNetwork(Network networkToCreate){
        // Repository handles the ID generation
        if (networkToCreate.getId() != null) { networkToCreate.setId(null); }

        NetworkDocument doc = mapper.map(networkToCreate, NetworkDocument.class);
        doc = networkRepository.save(doc);
        return mapper.map(doc, Network.class);
    }
}
