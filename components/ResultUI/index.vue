<template>
  <div class="mt-6 h-screen">
    <div v-if="passed">
      <h3>Awesome</h3>
    </div>
    <div v-else>
      <h3>Yikes Broken Streak</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
const { passed } = defineProps({
  passed: {
    type: Boolean,
    required: true,
  },
});
</script>
