<template>
  <div
    class="h-screen bg-slate-100 font-mono dark:bg-slate-600 dark:text-slate-100"
    :class="{ dark: isDark }"
  >
    <NavBar
      @toggle-dark="toggle_dark"
      @toggle-nav="navOpen = !navOpen"
      :dark="isDark"
      :nav="navOpen"
    />
    <div class="mt-8 grid grid-cols-6 px-3 md:px-8">
      <SideBar class="col-span-2" />
      <slot class="col-span-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = useDark();
const navOpen = ref(false);

const toggle_dark = useToggle(isDark);
</script>
