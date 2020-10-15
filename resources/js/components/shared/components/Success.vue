<template>
    <div class="error text-center">
        <i class="fas fa-car-alt"></i>
        <h1 class="mt-4">Success !!!</h1>
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<style scoped>
.error {
    color: #999;
    font-size: 10rem;
}  
</style>