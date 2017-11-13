<script src="./Main.js"></script>
<style src="./Style.scss"></style>

<template>
    <div>
        <p>Completed Tasks: {{ completed }}</p>
        <p>Pending Tasks: {{ pending }}</p>
        <todo v-for="todo in todos" :key="todo.id" v-bind:todo="todo"></todo>
    </div>
</template>
