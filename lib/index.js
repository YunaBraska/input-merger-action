"use strict";
//https://github.com/actions/toolkit/tree/main/packages/
const core = require('@actions/core');
const github = require('@actions/github');
try {
    let result = run(new Map(), github.context);
    console.log(JSON.stringify(github.context, null, 4));
    console.log(JSON.stringify(Object.fromEntries(result), null, 4));
    result.forEach((value, key) => {
        core.setOutput(key, value);
    });
}
catch (e) {
    if (typeof e === "string") {
        core.setFailed(e.toUpperCase());
    }
    else if (e instanceof Error) {
        core.setFailed(e.message);
    }
}
function run(result, context) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Check for custom webhook event with client_payload
    addToMap(result, ((_a = context === null || context === void 0 ? void 0 : context.payload) === null || _a === void 0 ? void 0 : _a.client_payload) || {});
    addToMap(result, ((_c = (_b = context === null || context === void 0 ? void 0 : context.payload) === null || _b === void 0 ? void 0 : _b.client_payload) === null || _c === void 0 ? void 0 : _c.inputs) || {});
    // Check for workflow_dispatch event and its defaults
    addToMap(result, ((_d = context === null || context === void 0 ? void 0 : context.payload) === null || _d === void 0 ? void 0 : _d.inputs) || {});
    addToMap(result, ((_f = (_e = context === null || context === void 0 ? void 0 : context.payload) === null || _e === void 0 ? void 0 : _e.workflow_dispatch) === null || _f === void 0 ? void 0 : _f.inputs) || {});
    addToMap(result, ((_h = (_g = context === null || context === void 0 ? void 0 : context.payload) === null || _g === void 0 ? void 0 : _g.workflow_call) === null || _h === void 0 ? void 0 : _h.inputs) || {});
    addDefaults(result, (_j = context === null || context === void 0 ? void 0 : context.workflow_dispatch) === null || _j === void 0 ? void 0 : _j.inputs);
    addDefaults(result, (_k = context === null || context === void 0 ? void 0 : context.workflow_call) === null || _k === void 0 ? void 0 : _k.inputs);
    addEventType(result, context);
    return replaceNullWithEmptyMap(sortMap(result));
}
function addEventType(result, context) {
    result.set('event_actor', (context === null || context === void 0 ? void 0 : context.actor) || null);
    result.set('event_ref', (context === null || context === void 0 ? void 0 : context.ref) || null);
    result.set('event_sha', (context === null || context === void 0 ? void 0 : context.sha) || null);
    result.set('event_name', (context === null || context === void 0 ? void 0 : context.eventName) || null);
    result.set('event_job', (context === null || context === void 0 ? void 0 : context.eventName) || null);
    result.set('event_workflow', (context === null || context === void 0 ? void 0 : context.eventName) || null);
    result.set('event_run_id', (context === null || context === void 0 ? void 0 : context.eventName) || null);
    result.set('event_run_number', (context === null || context === void 0 ? void 0 : context.eventName) || null);
    switch ((context === null || context === void 0 ? void 0 : context.eventName) || '') {
        case 'workflow_dispatch':
            result.set('event_source', 'UI');
            break;
        case 'workflow_call':
            result.set('event_source', 'WORKFLOW_TRIGGER');
            break;
        default:
            result.set('event_source', 'WEBHOOK');
            break;
    }
}
function addDefaults(result, defaults) {
    for (const [key, value] of Object.entries(defaults || {})) {
        if (!result.has(key) && key !== null && key !== undefined && value !== null && value !== undefined && typeof value !== 'object') {
            result.set(key, value);
        }
    }
    return result;
}
function addToMap(result, inputs) {
    for (const [key, value] of Object.entries(inputs)) {
        if (key !== null && key !== undefined && value !== null && value !== undefined && typeof value !== 'object') {
            result.set(key, value);
        }
    }
    return result;
}
function sortMap(input) {
    const sortedEntries = Array.from(input.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    return new Map(sortedEntries);
}
function replaceNullWithEmptyMap(input) {
    const output = new Map();
    input.forEach((value, key) => {
        if (value === null || value === undefined) {
            output.set(key, '');
        }
        else {
            output.set(key, value);
        }
    });
    return output;
}
module.exports = { run };
