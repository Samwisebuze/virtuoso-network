import MachineForManipulation from './machineForManipulation'
import { MachineModel, MachineDocument } from '../models'
class MachineToCreateDTO extends MachineForManipulation {

    public toModel(): MachineDocument {
        return new MachineModel({
            version: 1,
            type: this.type,
            imageName: this.imageName,
            openPorts: this.openPorts
        })
    }
}

export default MachineToCreateDTO