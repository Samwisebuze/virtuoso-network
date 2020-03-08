import * as express from 'express';
import networkRepo from '../models/network';

// TODO: DTOs for inputs and Outputs
const router = express.Router();

router.get('', async (req, res, next) => {
    try {
        const networks = await networkRepo.list()
        // TODO: Pagination
        res.status(200).json(networks)
    } catch (err) {
        next(err)
    }
});

router.post('', async (req, res, next) => {
    try {
        const { networkName } = req.body
        const owner = 'admin' // TODO: req.owner binding && Middleware
        const network = await networkRepo.add({ networkName, owner })

        res
            .status(201)
            .header('Location', `/networks/${network._id}`)
            .json(network) // TODO: Do not send back the Database format, this needs to be cast into a DTO
    } catch (err) {
        next(err)
    }
});

router.get('/:networkId', async (req, res, next) => {
    try {
        const { networkId } = req.params
        const network = await networkRepo.get({ networkId })

        if (!network) { res.status(404).send() }

        res.status(200).json(network)
    } catch (err) {
        next(err)
    }
});

router.put('/:networkId', async (req, res, next) => {
    try {
        const { networkId } = req.params
        const { networkDoc } = req.body
        // TODO: NetworkDoc needs validation
        const networkExists = await networkRepo.exists({ _id: networkId })
        if (!networkExists) { res.status(404).send() }

        const network = await networkRepo.edit({ networkId, networkDoc })

        if (!network) { res.status(500).send() }

        res.status(200).json(network)
    } catch (err) {
        next(err)
    }
});

router.delete('/:networkId', async (req, res, next) => {
    try {
        const { networkId } = req.params

        const networkExists = await networkRepo.exists({ _id: networkId })
        if (!networkExists) { res.status(404).send() }

        await networkRepo.delete({ networkId })

        res.status(204).send()
    } catch (err) {
        next(err)
    }
});

export default router;