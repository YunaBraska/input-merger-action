const main = require('../src/index');

describe('Workflow Call [UI]', () => {
    it('should set default values and include user input when provided', () => {
        const context = {
            payload: {
                inputs: {
                    input_2: "AaBbCc"
                },
                ref: "refs/heads/main",
                workflow: ".github/workflows/test.yml",
                repository: {
                    id: 612981281,
                    size: 0,
                    forks_count: 0,
                    open_issues: 0,
                    stargazers_count: 0,
                    fork: false,
                    private: false,
                    archived: false,
                    disabled: false,
                    is_template: false,
                    allow_forking: true,
                    visibility: "public",
                    default_branch: "main",
                    language: "TypeScript",
                    name: "input-merger-action",
                    created_at: "2023-03-12T14:59:30Z",
                    updated_at: "2023-03-12T15:01:13Z",
                    html_url: "https://github.com/YunaBraska/input-merger-action",
                    description: "Combines user and default inputs for your workflows.",
                    hooks_url: "https://api.github.com/repos/YunaBraska/input-merger-action/hooks",
                    license: {
                        key: "apache-2.0",
                        name: "Apache License 2.0",
                    },
                    owner: {
                        id: 13748223,
                        type: "User",
                        login: "YunaBraska",
                        html_url: "https://github.com/YunaBraska",
                    },
                },
                sender: {
                    id: 13748223,
                    type: "User",
                    login: "YunaBraska",
                    html_url: "https://github.com/YunaBraska",
                }
            },
            eventName: "workflow_dispatch",
            sha: "b63fd71e769ca531cf47192312af3e804793538d",
            ref: "refs/heads/main",
            workflow: "TEST",
            actor: "YunaBraska",
            job: "build",
            runNumber: 8,
            runId: 4398246357,
        };

        const result = main.run(new Map(), context);

        // expect(result.get('event_name')).toBe('workflow_dispatch');
        // expect(result.get('event_source')).toBe('UI');
        // expect(result.get('var_with_default')).toBe('default_value_1');
        // expect(result.get('var_should_be_set')).toBe('user_input_value');
        expect(result.size).toBe(10);
    });
});

describe('Workflow Call [WORKFLOW]', () => {
    it('should set default values and include user input when provided', () => {
        const context = {
            payload: {
                inputs: {
                    input_2: "AaBbCc"
                },
                ref: "refs/heads/main",
                workflow: ".github/workflows/trigger_test.yml",
                repository: {
                    id: 612981281,
                    size: 0,
                    forks_count: 0,
                    open_issues: 0,
                    stargazers_count: 0,
                    fork: false,
                    private: false,
                    archived: false,
                    disabled: false,
                    is_template: false,
                    allow_forking: true,
                    visibility: "public",
                    default_branch: "main",
                    language: "TypeScript",
                    name: "input-merger-action",
                    created_at: "2023-03-12T14:59:30Z",
                    updated_at: "2023-03-12T15:01:13Z",
                    html_url: "https://github.com/YunaBraska/input-merger-action",
                    description: "Combines user and default inputs for your workflows.",
                    hooks_url: "https://api.github.com/repos/YunaBraska/input-merger-action/hooks",
                    license: {
                        key: "apache-2.0",
                        name: "Apache License 2.0",
                    },
                    owner: {
                        id: 13748223,
                        type: "User",
                        login: "YunaBraska",
                        html_url: "https://github.com/YunaBraska",
                    },
                },
                sender: {
                    id: 13748223,
                    type: "User",
                    login: "YunaBraska",
                    html_url: "https://github.com/YunaBraska",
                }
            },
            eventName: "workflow_dispatch",
            sha: "b63fd71e769ca531cf47192312af3e804793538d",
            ref: "refs/heads/main",
            workflow: "TRIGGER WORKFLOW CALL",
            actor: "YunaBraska",
            job: "build",
            runNumber: 8,
            runId: 4398246357,
        };

        const result = main.run(new Map(), context);

        // expect(result.get('event_name')).toBe('workflow_dispatch');
        // expect(result.get('event_source')).toBe('UI');
        // expect(result.get('var_with_default')).toBe('default_value_1');
        // expect(result.get('var_should_be_set')).toBe('user_input_value');
        expect(result.size).toBe(10);
    });
});

describe('Workflow Call [WEBHOOK]', () => {
    it('should set default values and include user input when provided', () => {
        const context = {
            payload: {
                inputs: {
                    input_2: "AaBbCc"
                },
                ref: "refs/heads/main",
                workflow: ".github/workflows/trigger_test.yml",
                repository: {
                    id: 612981281,
                    size: 0,
                    forks_count: 0,
                    open_issues: 0,
                    stargazers_count: 0,
                    fork: false,
                    private: false,
                    archived: false,
                    disabled: false,
                    is_template: false,
                    allow_forking: true,
                    visibility: "public",
                    default_branch: "main",
                    language: "TypeScript",
                    name: "input-merger-action",
                    created_at: "2023-03-12T14:59:30Z",
                    updated_at: "2023-03-12T15:01:13Z",
                    html_url: "https://github.com/YunaBraska/input-merger-action",
                    description: "Combines user and default inputs for your workflows.",
                    hooks_url: "https://api.github.com/repos/YunaBraska/input-merger-action/hooks",
                    license: {
                        key: "apache-2.0",
                        name: "Apache License 2.0",
                    },
                    owner: {
                        id: 13748223,
                        type: "User",
                        login: "YunaBraska",
                        html_url: "https://github.com/YunaBraska",
                    },
                },
                sender: {
                    id: 13748223,
                    type: "User",
                    login: "YunaBraska",
                    html_url: "https://github.com/YunaBraska",
                }
            },
            eventName: "workflow_dispatch",
            sha: "b63fd71e769ca531cf47192312af3e804793538d",
            ref: "refs/heads/main",
            workflow: "TRIGGER WORKFLOW CALL",
            actor: "YunaBraska",
            job: "build",
            runNumber: 8,
            runId: 4398246357,
        };

        const result = main.run(new Map(), context);

        // expect(result.get('event_name')).toBe('workflow_dispatch');
        // expect(result.get('event_source')).toBe('UI');
        // expect(result.get('var_with_default')).toBe('default_value_1');
        // expect(result.get('var_should_be_set')).toBe('user_input_value');
        expect(result.size).toBe(10);
    });
});


