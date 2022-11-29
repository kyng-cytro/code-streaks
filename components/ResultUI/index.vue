<template>
  <div>
    <div class="flex flex-col items-center gap-5 pt-6" v-if="passed">
      <NuxtImg class="h-52 w-52" src="/images/fire.png" />
      <div>
        <h3 class="text-xl font-semibold uppercase">Aced</h3>
      </div>
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
