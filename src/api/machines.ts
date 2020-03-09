import * as express from 'express';
import { NetworkModel, MachineDocument } from '../models'
import { MachineToCreateDTO, MachineDTO, MachineToEditDTO } from '../dtos'
const router = express.Router();

/* GET - Machine Collection
    Request Params:
     - networkId: Guid - Id of parent network
    Query Params:
    Response:
     Header: X-Pagination
     Body: An Array of Machines
 */
router.get('', async (req, res, next) => {
    const { networkId } = req.params;
    try {
        const machinesFromRepo: MachineDocument[] = await NetworkModel.getMachines({ networkId })
        const machines: MachineDTO[] = machinesFromRepo.map(m => MachineDTO.fromModel(m))
        // TODO: Pagination
        // TODO: HATEOAS
        res.status(200).json(machines)
    } catch (err) {
        next(err)
    }
});

/* POST - Create Machine
    Request Params:
        - networkId: Guid - Id of Parent Network
    Response:
        Header: Location - relative link to the new resource
        Body: the newly created Machine
 */
router.post('', async (req, res, next) => {
    const { networkId } = req.params;
    const networkExists = await NetworkModel.exists({ _id: networkId });
    if (!networkExists) { res.status(404).send() }

    const { machineToCreate }: { machineToCreate: MachineToCreateDTO } = req.body
    //TODO: Input Validation
    if (!machineToCreate) { res.status(400).send() }

    const machineToCreateModel = machineToCreate.toModel()
    const validationError = machineToCreateModel.validateSync()
    if (validationError) { res.status(400).json(validationError) }

    try {
        const machineFromRepo = await NetworkModel.addMachine({
            networkId,
            machineModel: machineToCreateModel
        })

        const machineToReturn = MachineDTO.fromModel(machineFromRepo);

        res
            .status(201)
            .header('Location', `/networks/${networkId}/machines/${machineToReturn.id}`)
            .json(machineToReturn)

    } catch (err) {
        next(err)
    }
});

/* GET - Get Machine */
router.get('/:machineId', async (req, res, next) => {
    const { networkId, machineId } = req.params

    try {
        const networkExists = await NetworkModel.exists({ _id: networkId })
        if (!networkExists) { res.status(404).send() }

        const machineFromRepo = await NetworkModel.getMachine({ networkId, machineId })

        if (!machineFromRepo) { res.status(404).send() }
        // TODO: HATEOAS
        const machineToReturn = MachineDTO.fromModel(machineFromRepo)
        res.status(200).json(machineToReturn)
    } catch (err) {
        next(err)
    }
});

router.put('/:machineId', async (req, res, next) => {
    const { networkId, machineId } = req.params
    const { machineToEdit }: { machineToEdit: MachineToEditDTO } = req.body

    try {
        const networkExists = await NetworkModel.exists({ _id: networkId })
        if (!networkExists) { res.status(404).send() }

        const machineToEditModel: MachineDocument = machineToEdit.toModel()
        // Validate
        const validationError = machineToEditModel.validateSync();
        if (validationError) { res.status(400).json(validationError) }

        const machineFromRepo = NetworkModel.editMachine({
            networkId,
            machineId,
            machineModel: machineToEditModel
        })
    } catch (err) {
        next(err)
    }
});

router.delete('/:machineId', async (req, res, next) => {
    const { networkId, machineId } = req.params

    try {
        const networkExists = await NetworkModel.exists({ _id: networkId })
        if (!networkExists) { res.status(404).send() }

        await NetworkModel.removeMachine({ networkId, machineId })

        res.status(204).send()
    } catch (err) {
        next(err)
    }
});



export default router;