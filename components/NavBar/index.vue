<template>
  <nav
    class="flex items-center justify-between bg-white py-5 shadow-md dark:bg-slate-700"
  >
    <div class="flex space-x-2 px-3 md:block md:px-6">
      <Bars3Icon
        @click="$emit('toggle-nav')"
        class="h-6. w-6 cursor-pointer md:hidden"
      />
      <NuxtLink to="/" class="pt-[3.2px] text-xl">Code Streaks</NuxtLink>
    </div>
    <div class="px-3 md:px-6">
      <Transition name="menu" mode="out-in">
        <ComputerDesktopIcon
          class="h-6 w-6 cursor-pointer"
          @click="toggleSystem"
          key="ci"
          v-if="isSystem"
        />
        <SunIcon
          key="si"
          class="h-6 w-6 cursor-pointer"
          v-else-if="dark"
          @click="$emit('toggle-dark')"
        />
        <MoonIcon
          key="mi"
          class="h-6 w-6 cursor-pointer"
          @click="$emit('toggle-dark')"
          v-else
        />
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from "@heroicons/vue/24/outline";

let isSystem = ref(true);

const emit = defineEmits(["toggle-dark", "toggle-nav"]);

const toggleSystem = () => {
  isSystem.value = false;
  emit("toggle-dark");
};

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
