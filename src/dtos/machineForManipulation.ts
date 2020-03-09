import { MachineDocument } from "../models"

abstract class MachineForManipulation {
    public imageName: string
    public type: string
    public openPorts: Array<number>

    abstract toModel() : MachineDocument
}

export default MachineForManipulation