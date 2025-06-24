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
      <ClientOnly>
        <Transition name="menu" mode="out-in">
          <SunIcon
            key="si"
            class="size-6 cursor-pointer"
            v-if="mode == 'dark'"
            @click="$colorMode.preference = 'light'"
          />
          <MoonIcon
            key="mi"
            class="size-6 cursor-pointer"
            @click="$colorMode.preference = 'dark'"
            v-else
          />
        </Transition>
        <template #fallback>
          <div class="size-6 bg-slate-300 dark:bg-slate-700 rounded-md" />
        </template>
      </ClientOnly>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["toggle-nav"]);

const mode = computed(() => {
  return useColorMode().value;
});

defineProps({
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
