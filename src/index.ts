//https://github.com/actions/toolkit/tree/main/packages/

const core = require('@actions/core');
const github = require('@actions/github');

type ResultType = string | number | boolean | null;
try {
    let result = run(new Map<string, ResultType>(), github.context);
    console.log(JSON.stringify(github.context, null, 4))
    console.log(JSON.stringify(Object.fromEntries(result), null, 4));

    result.forEach((value, key) => {
        core.setOutput(key, value);
    });
} catch (e) {
    if (typeof e === "string") {
        core.setFailed(e.toUpperCase());
    } else if (e instanceof Error) {
        core.setFailed(e.message);
    }
}

function run(result: Map<string, ResultType>, context: any): Map<string, ResultType>{
    // Check for custom webhook event with client_payload
    addToMap(result, context?.payload?.client_payload || {});
    addToMap(result, context?.payload?.client_payload?.inputs || {});

    // Check for workflow_dispatch event and its defaults
    addToMap(result, context?.payload?.inputs || {});
    addToMap(result, context?.payload?.workflow_dispatch?.inputs || {});
    addToMap(result, context?.payload?.workflow_call?.inputs || {});
    addDefaults(result, context?.workflow_dispatch?.inputs)
    addDefaults(result, context?.workflow_call?.inputs)
    addEventType(result, context);
    return replaceNullWithEmptyMap(sortMap(result));
}

function addEventType(result: Map<string, ResultType>, context: any) {
    result.set('event_actor', context?.actor || null)
    result.set('event_ref', context?.ref || null)
    result.set('event_sha', context?.sha || null)
    result.set('event_name', context?.eventName || null)
    result.set('event_job', context?.eventName || null)
    result.set('event_workflow', context?.eventName || null)
    result.set('event_run_id', context?.eventName || null)
    result.set('event_run_number', context?.eventName || null)
    switch (context?.eventName || '') {
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

function addDefaults(result: Map<string, ResultType>, defaults?: { [key: string]: unknown }): Map<string, ResultType>{
    for (const [key, value] of Object.entries(defaults || {})) {
        if (!result.has(key) && key !== null && key !== undefined && value !== null && value !== undefined && typeof value !== 'object') {
            result.set(key, value as ResultType);
        }
    }
    return result;
}

function addToMap(result: Map<string, ResultType>, inputs: { [key: string]: unknown }): Map<string, ResultType>{
    for (const [key, value] of Object.entries(inputs)) {
        if (key !== null && key !== undefined && value !== null && value !== undefined && typeof value !== 'object') {
            result.set(key, value as ResultType);
        }
    }
    return result;
}

function sortMap(input: Map<string, any>): Map<string, any> {
    const sortedEntries = Array.from(input.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    return new Map(sortedEntries);
}

function replaceNullWithEmptyMap(input: Map<string, any>): Map<string, any> {
    const output = new Map<string, any>();
    input.forEach((value, key) => {
        if (value === null || value === undefined) {
            output.set(key, '');
        } else {
            output.set(key, value);
        }
    });
    return output;
}

module.exports = {run};
