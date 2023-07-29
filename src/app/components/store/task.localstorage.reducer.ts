import { Action, ActionReducer, INIT, UPDATE, MetaReducer } from '@ngrx/store';
import { Log } from './logs.model';

const localStorageKey = 'dataItem';

export function localStorageMetaReducer<S, A extends Action = Action>(
    reducer: ActionReducer<S, A>
): ActionReducer<S, A> {
    let onInit = true;

    return (state: any, action: A): S => {
        const nextState = reducer(state, action);

        if (onInit) {
            onInit = false;
            const localStorageState = localStorage.getItem(localStorageKey);
            return localStorageState ? JSON.parse(localStorageState) : nextState;
        }

        const logEntry: Log = {
            time: Date.now().toString(),
            action: action,
            state: nextState,
        }

        const logs: Log[] = JSON.parse(localStorage.getItem('__logs__') || '[]');
        logs.push(logEntry);

        localStorage.setItem('__logs__', JSON.stringify(logs));

        localStorage.setItem(localStorageKey, JSON.stringify(nextState));
        return nextState;
    };
}
export const metaReducers: MetaReducer<any>[] = [localStorageMetaReducer];