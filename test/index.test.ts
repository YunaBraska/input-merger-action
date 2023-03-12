const main = require('../src/index');
//
// describe('run function', () => {
//     const context = {
//         eventName: 'workflow_dispatch',
//         payload: {
//             client_payload: {
//                 my_input1: 'hello',
//             },
//             inputs: {
//                 my_input1: 'world',
//             },
//             workflow_call: {
//                 inputs: {
//                     my_input1: 'howdy',
//                 },
//             },
//             workflow_dispatch: {
//                 inputs: {
//                     my_input1: 'bonjour',
//                 },
//             },
//         },
//     };
//
// });

describe('Workflow Dispatch [UI]', () => {
    it('should set default values and include user input when provided', () => {
        const context = {
            eventName: 'workflow_dispatch',
            inputs: {
                var_with_default: 'default_value_1',
                var_no_default: null,
                var_should_be_set: 'default_value_2',
            },
            payload: {
                client_payload: {
                    inputs: {
                        var_should_be_set: 'user_input_value',
                    },
                },
            },
        };

        const result = main.run(new Map(), context);

        expect(result.get('event_name')).toBe('workflow_dispatch');
        expect(result.get('event_source')).toBe('UI');
        // expect(result.get('var_with_default')).toBe('default_value_1');
        expect(result.get('var_should_be_set')).toBe('user_input_value');
        expect(result.size).toBe(10);
    });
});
//
// it('should return the correct result for ui user manual input', () => {
//     const context = {
//         eventName: 'workflow_dispatch',
//         payload: {
//             inputs: {
//                 var_with_default: 'default_value_1',
//                 var_no_default: null,
//                 var_should_be_set: 'default_value_2',
//             },
//             client_payload: {
//                 var_should_be_set: 'user_imput_value'
//             }
//         }
//     };
//     const result = main.run(new Map(), context);
//     expect(result.get('event_name')).toBe('workflow_dispatch');
//     expect(result.get('event_source')).toBe('UI');
//     expect(result.get('var_with_default')).toBe('default_value_1');
//     expect(result.get('var_should_be_set')).toBe('user_imput_value');
//     expect(result.size).toBe(4);
// });
