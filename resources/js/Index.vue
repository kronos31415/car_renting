<template>
    <div>
        <router-link :to="{name: 'home', params: {}}">Link to Home PAge</router-link>
        <router-view></router-view>
    </div>
</template>