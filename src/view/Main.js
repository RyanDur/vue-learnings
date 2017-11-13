import TodoList from './TodoList/Component.vue';

export default {
    name: 'app',
    components: {
        TodoList
    },
    // data function avails data to the template
    data() {
        return {
            todos: [{
                title: 'Todo A',
                project: 'Project A',
                done: false,
            }, {
                title: 'Todo B',
                project: 'Project B',
                done: true,
            }, {
                title: 'Todo C',
                project: 'Project C',
                done: false,
            }, {
                title: 'Todo D',
                project: 'Project D',
                done: false,
            }],
        };
    },
};