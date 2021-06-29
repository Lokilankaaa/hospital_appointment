import { OperationStates } from "../Models/OperationState";

class OperationStateManager {
    constructor(callBack: any) {
        this.callBack = callBack
    }
    callBack: any;

    Trigged() {
        this.callBack(OperationStates.Triggered, "")
    }

    Finished() {
        this.callBack( OperationStates.NotTriggered, "")
    }

    Successful() {
        this.callBack( OperationStates.Successful, "")
    }

    Failed(msg :string) {
        this.callBack( OperationStates.Failed, msg)
    }
}

export default OperationStateManager