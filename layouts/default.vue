<template>
  <div
    class="flex min-h-screen select-none flex-col bg-slate-100 font-mono dark:bg-slate-600 dark:text-slate-100"
    :class="{ dark: isDark }"
  >
    <!-- Nav Bar -->
    <NavBar
      @toggle-dark="toggle_dark"
      @toggle-nav="navOpen = !navOpen"
      :dark="isDark"
      :nav="navOpen"
    />
    <!-- Side and Content -->
    <div
      class="mt-8 grid flex-1 grid-cols-1 px-3 md:grid-cols-7 md:px-8 lg:grid-cols-5"
    >
      <!-- Side Bar -->
      <SideBar class="hidden md:col-span-2 md:block lg:col-span-1" />
      <!-- Blur -->
      <Transition name="fade">
        <div
          v-show="navOpen"
          class="fixed top-[72px] left-0 z-10 h-full w-full bg-transparent backdrop-blur-sm transition delay-150 ease-in-out md:hidden"
          @click="navOpen = false"
        ></div>
      </Transition>
      <!-- Mobile Side Bar -->
      <Transition name="side" mode="out-in">
        <SideBarMobile
          class="absolute top-0 left-0 z-20 h-screen px-3 pt-6 md:hidden"
          @toggle-nav="navOpen = !navOpen"
          v-if="navOpen"
        />
      </Transition>
      <!-- Content -->
      <div class="flex flex-col justify-between md:col-span-5 lg:col-span-4">
        <NuxtPage />
        <Footer class="mb-5 mt-16 px-3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = useDark();
const navOpen = ref(false);

const toggle_dark = useToggle(isDark);
</script>

<style scoped>
.fade-enter-active {
  animation: fade-in-top 0.25s ease 0s 1 normal none;
}
.side-enter-active {
  animation: shutter-in-left 0.24s ease 0s 1 normal none;
}
.side-leave-active {
  animation: shutter-out-left 0.24s ease 0s 1 normal none;
}
@keyframes shutter-out-left {
  0% {
    transform: rotateY(0);
    transform-origin: left;
    opacity: 1;
  }
  100% {
    transform: rotateY(-70deg);
    transform-origin: left;
    opacity: 0;
  }
}
@keyframes shutter-in-left {
  0% {
    transform: rotateY(100deg);
    transform-origin: left;
    opacity: 0;
  }
  100% {
    transform: rotateY(0);
    transform-origin: left;
    opacity: 1;
  }
}
@keyframes fade-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
