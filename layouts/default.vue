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
    <div
      class="mt-8 grid grid-cols-1 px-3 md:grid-cols-7 md:px-8 lg:grid-cols-5"
    >
      <SideBar class="hidden md:col-span-2 md:block lg:col-span-1" />
      <div class="md:col-span-5 lg:col-span-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = useDark();
const navOpen = ref(false);

const toggle_dark = useToggle(isDark);
</script>
