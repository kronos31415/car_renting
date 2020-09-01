<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <router-link :to="{name: 'home', params: {}}" class="navbar-brand mr-auto">Link to Home PAge</router-link>
            <router-link :to="{name: 'home', params: {}}" class="btn nav-btn">Second Page</router-link>
        </nav>
        <div class="container mt-5 mb-5 pr-5 pl-5">
            <router-view></router-view>
        </div>
    </div>
</template>