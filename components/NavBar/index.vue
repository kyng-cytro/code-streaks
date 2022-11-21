<template>
  <div
    class="flex items-center justify-between bg-white py-3 shadow-md dark:bg-slate-700"
  >
    <div class="flex space-x-2 px-3 md:block md:px-6">
      <Transition name="menu" mode="out-in">
        <Bars3Icon
          @click="$emit('toggle-nav')"
          class="h-6. w-6 cursor-pointer md:hidden"
          v-if="!nav"
        />
        <XMarkIcon
          @click="$emit('toggle-nav')"
          class="h-6. w-6 cursor-pointer md:hidden"
          v-else
        />
      </Transition>
      <h1 class="pt-[3.2px] text-xl">Code Streaks</h1>
    </div>
    <div class="px-3 md:px-6">
      <Transition name="menu" mode="out-in">
        <SunIcon
          key="su"
          class="h-6 w-6 cursor-pointer"
          v-if="dark"
          @click="$emit('toggle-dark')"
        />
        <MoonIcon
          key="mn"
          class="h-6 w-6 cursor-pointer"
          @click="$emit('toggle-dark')"
          v-else
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";

const { dark, nav } = defineProps({
  dark: {
    type: Boolean,
    required: true,
  },
  nav: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.menu-enter-active {
  animation: scale-up-center 0.25s ease 0s 1 normal none;
}
.menu-leave-active {
  animation: scale-down-center 0.25s ease 0s 1 normal none;
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes scale-down-center {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.2);
  }
}
</style>
