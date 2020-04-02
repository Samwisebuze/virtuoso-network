import { MachineDocument } from '../models/machine'

enum MACHINE_VER {
    v1 = 1
}

class MachineDTO {
    public id!: string 
    public version: number = MACHINE_VER.v1
    public type!: string
    public imageName!: string
    public openPorts!: Array<number>

    public static fromModel(machineDocument: MachineDocument): MachineDTO {
        const m = new MachineDTO()
        
        m.id = machineDocument._id
        m.imageName = machineDocument.imageName
        m.openPorts = machineDocument.openPorts
        m.type = machineDocument.type
        m.version = machineDocument.version

        return m
    }
}

export default MachineDTO