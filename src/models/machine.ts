import * as mongoose from 'mongoose'

const machineSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Controller', 'Host', 'Switch', 'Router'],
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    openPorts: [Number]
})

interface MachineDocument extends mongoose.Document {
    version: number,
    type: string
    imageName: string,
    openPorts: Array<number>
}

interface MachineModel extends mongoose.Model<MachineDocument> {}


const Machine = mongoose.model<MachineDocument, MachineModel>('Machine', machineSchema)

export default Machine
export { MachineDocument, machineSchema}

