import MachineForManipulation from './machineForManipulation'
import { MachineDocument, MachineModel } from '../models'

class MachineToEditDTO extends MachineForManipulation {
    public toModel(): MachineDocument{
        return new MachineModel({
            type: this.type,
            openPorts: this.openPorts,
            imageName: this.imageName
        })
    }
}

export default MachineToEditDTO