<script src="./Main.js"></script>
<style src="./Style.scss"></style>

<template>
    <div class='ui centered card'>
        <div class='content'>
            <div class='header'>
                {{ todo.title }}
            </div>
            <div class='meta'>
                {{ todo.project }}
            </div>
            <div class='extra content'>
                <span class='right floated edit icon'>
            <i class='edit icon'></i>
          </span>
            </div>
        </div>
        <div class='ui bottom attached green basic button' v-show="todo.done">
            Completed
        </div>
        <div class='ui bottom attached red basic button' v-show="!todo.done">
            Complete
        </div>
    </div>
</template>

