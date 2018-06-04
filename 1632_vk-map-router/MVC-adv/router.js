import Controller from './controller.js';

function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const [name, id] = hash.split('/');

    return { name, params: { id } }
}

function getRouteInfoAdvanced() {
    let [, name, params] = location.hash.match(/#(\w+)(?:\?(.+)|$)/) || [];

    if (params) {
        params = params
            .split('&')
            .map(part => part.match(/^([^=]+)=(.+)/))
            .reduce((obj, [, name, value]) => {
                obj[name] = value;
                return obj;
            }, {});
    } else {
        params = {};
    }

    return { name, params }
}

function handleHash() {
    const { name, params } = getRouteInfoAdvanced();

    if (name) {
        const routeName = name + 'Route';

        if (Controller.hasOwnProperty(routeName)) {
            Controller[routeName](params);
        }
    }
}

export default {
    init() {
        addEventListener('hashchange', handleHash);
        handleHash();
    }
}

// задача - вызов методов контроллера (вызов action)
