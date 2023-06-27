<script setup>
    defineProps({
        title:{type:String, required:true},
        description:{type:String, required:true},
        date:{type:String, required:true},
        state:{type:String, required:true}
    })
</script>
<template>
    <div class="card">
        <div class="card-header">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>