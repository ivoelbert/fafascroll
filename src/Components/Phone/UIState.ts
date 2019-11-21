import { EventEmitter } from 'events';

export type UIStateEntries = {
    time: number;
    pullOutTime: number,
    moveAndRotateTime: number,
};

export type UIStateKeys = keyof UIStateEntries;

export const initialState: UIStateEntries = {
    time: 0,
    pullOutTime: 0,
    moveAndRotateTime: 0,
};

export class UIState extends EventEmitter {
    private _state: UIStateEntries;

    private static _instance: UIState;
    private constructor() {
        super();
        this._state = initialState;
    }

    public static getInstance(): UIState {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public get state() {
        return this._state;
    }

    // For now broadcast every state change
    public setState = (stateData: UIStateEntries) => {
        this._state = {
            ...this._state,
            ...stateData,
        };

        this.emit('CHANGE', this._state);
    };
}
