<template>
    <div style="padding: 1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4"> REVIEW LIST</h6>
        <div class="border-bottom d-none d-md-block" v-for="number in 3" :key="number">
            <div class="row pt-4">
                <div class="col-md-6">Author: Pawcio</div>
                <div class="col-md-6 d-flex justify-content-end">starRating</div>
            </div>
            <div class="row">
                <div class="col-md-12">Added 5 min ago</div>
            </div>
            <div class="row">
                <div class="col-md-12 pt-4 pb-4">Review Content</div>
            </div>
            </div>
    </div>
</template>