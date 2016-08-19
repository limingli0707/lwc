/* @flow */

export const ComponentToContextMap = new WeakMap();
export const topLevelContextSymbol = Symbol('Top Level Context');
export let currentContext = {
    [topLevelContextSymbol]: true,
};

export function createNewContext(newContextObj: Object|null = {}): Object {
    currentContext = newContextObj;
    return currentContext;
}

export function setContext(component: Object, context: Object) {
    if (ComponentToContextMap.get(component)) {
        throw new Error('A context already exist for component ' + component);
    }
    ComponentToContextMap.set(component, context);
}

export function getContext(component: Object): Object {
    let ctx = ComponentToContextMap.get(component);
    if (!ctx) {
        throw new Error('No context found for component ' + component);
    }
    return ctx;
}

export function establishContext(ctx: Object) {
    currentContext = ctx;
}
