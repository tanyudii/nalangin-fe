import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AnyAction, createStore, Store } from 'redux';

export interface State {
    tick: string;
}

// create your reducer
const reducer = (state: State = { tick: 'init' }, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload };
        case 'TICK':
            return { ...state, tick: action.payload };
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
