import * as mongoose from 'mongoose'
import { MachineDocument, machineSchema } from './machine'

const networkSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    networkName: {
        type: String,
        required: true,
        unique: true
    },
    machines: [machineSchema],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: Date
})

interface NetworkDocument extends mongoose.Document {
    version: number,
    owner: string,
    networkName: string,
    machines: Array<MachineDocument>,
    createdAt: Date,
    updatedAt: Date
}

interface NetworkModel extends mongoose.Model<NetworkDocument> {
    //#region Network Methods
    list(): Promise<NetworkDocument[]>

    get({ networkId }: { networkId: string }): Promise<NetworkDocument>

    add({
        networkName,
        owner
    }: {
        networkName: string,
        owner: string
    }): Promise<NetworkDocument>

    edit({
        networkId,
        networkDoc
    }: {
        networkId: string,
        networkDoc: NetworkDocument
    }): Promise<NetworkDocument>

    delete({ networkId }: { networkId: string }): Promise<void>
    //#endregion
    //#region Machine Methods
    getMachine({
        networkId,
        machineId
    }: {
        networkId: string,
        machineId: string
    }): Promise<MachineDocument>

    getMachines({ networkId }: { networkId: string }): Promise<MachineDocument[]>

    addMachine({
        networkId,
        machineModel
    }: {
        networkId: string,
        machineModel: MachineDocument
    }): Promise<MachineDocument>


    editMachine({
        networkId,
        machineId,
        machineModel
    }: {
        networkId: string,
        machineId: string,
        machineModel: MachineDocument
    }): Promise<MachineDocument>

    removeMachine({
        networkId,
        machineId
    }: {
        networkId: string,
        machineId: string
    }): Promise<void>
    //#endregion
}

class NetworkClass extends mongoose.Model {
    /*
     * Returns an array of Network Documents
    */
    public static async list(): Promise<NetworkDocument[]> {
        return this.find({}).sort({ createdAt: 1 })
    }

    public static async getMachines({ networkId }): Promise<MachineDocument[]> {
        if (!networkId) { throw new Error('Invalid Id') }
        const network: NetworkDocument = await this.findById(networkId)
        return network.machines
    }

    public static async get({ networkId }) {
        if (!networkId) { throw new Error('Invalid Id') }

        return this.findById(networkId)
    }

    public static async getMachine({ networkId, machineId }) {
        if (!networkId || !machineId) {
            throw new Error('Invalid Id')
        }
        // Leveraging any type here on purpose
        // sub-document arrays had a function called id() in mongoose
        // there is no typescript binding
        const network = await this.findById(networkId)
        return network.machines.id(machineId)
    }

    public static async add({ networkName, owner }) {
        if (!networkName || !owner) {
            throw new Error('Invalid Inputs')
        }

        const machines = new Array<MachineDocument>()
        const version = 1

        const networkToCreate: unknown = {
            networkName,
            owner,
            machines,
            version,
            createdAt: Date.now()
        }

        const newNetwork = this.create(<NetworkDocument>networkToCreate)

        return newNetwork
    }

    public static async addMachine({
        networkId,
        machineDocument
    }) {
        if (!networkId) { throw new Error('Missing Network Id') }
        if (!machineDocument) { throw new Error('Invalid Data') }

        const network = await this.findById(networkId)
        const newMachine = network.machines.create({ machineDocument })
        network.updatedAt = Date.now()

        await network.save()

        return newMachine
    }

    public static async edit({ networkId, networkDoc }) {
        if (!networkId || !networkDoc) {
            throw new Error('Invalid Input')
        }

        const updatedNetwork = this.findOneAndUpdate(
            { _id: networkId },
            { networkDoc, updatedAt: Date.now() },
            { runValidators: true, new: true }
        )

        return updatedNetwork
    }

    public static async editMachine({ networkId, machineId, machineDocument }) {
        if (!networkId || !machineId) { throw new Error("Invalid Id") }
        if (!machineDocument) { throw new Error('Invalid Document') }

        const network = await this.findById(networkId)

        network.machines.id(machineId).set({ machineDocument })

        await network.save()

        return network.machines.id(machineId)
    }

    public static async delete({ networkId }) {
        if (!networkId) { throw new Error('Invalid Id') }

        return this.findByIdAndRemove({ _id: networkId })
    }
}

networkSchema.loadClass(NetworkClass)

const Network = mongoose.model<NetworkDocument, NetworkModel>('Network', networkSchema)

export default Network
export { NetworkDocument }