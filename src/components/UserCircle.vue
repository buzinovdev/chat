<script setup>
defineProps({tag: String, color: String})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div
        class="rounded-circle d-flex justify-content-center align-items-center fs-4 fw-bold"
        :style="`background: ${color}`">
      {{ tag[0].toUpperCase() }}
    </div>
  </div>
</template>

<style scoped>
.rounded-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
