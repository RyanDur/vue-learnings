<script src="./Main.js"></script>
<style lang="scss" src="./Style.scss"></style>

<template>
    <div class="container">
        <p>Completed Tasks: {{ completed }}</p>
        <p>Pending Tasks: {{ pending }}</p>
        <todo v-for="todo in todos" :key="todo.id" v-bind:todo="todo"></todo>
    </div>
</template>
