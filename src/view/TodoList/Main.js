import Todo from '../Todo/Component.vue';

export default (function () {

    const countDone = (isDone, todos) =>
        todos.filter(todo => todo.done === isDone).length;

    return {
        props: ['todos'],
        computed: {
            completed() {
                return countDone(true, this.todos)
            },
            pending() {
                return countDone(false, this.todos)
            }
        },
        components: {
            Todo
        }
    }
})()
