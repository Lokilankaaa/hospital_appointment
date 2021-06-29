export enum OperationStates {
    Triggered,
    NotTriggered,
    Failed,
    Successful
};

export interface OPerationStatus {
    state: OperationStates,
    msg: string
}