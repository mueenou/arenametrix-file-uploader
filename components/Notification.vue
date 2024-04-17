<template>
  <div v-if="notification">
    <div
      class="fixed bottom-0 right-0 m-10 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
    >
      {{ notification }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  notification: String,
});
</script>

<style></style>
