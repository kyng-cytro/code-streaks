<template>
  <aside class="flex flex-col space-y-10 bg-white dark:bg-slate-700">
    <div>
      <XMarkIcon @click="$emit('toggle-nav')" class="h-6 w-6 cursor-pointer" />
    </div>
    <div class="flex flex-col gap-5">
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        @click="$emit('toggle-nav')"
        to="/"
      >
        <PlayIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">Daily Challenge</p>
      </SideBarLink>
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        @click="$emit('toggle-nav')"
        to="/past"
      >
        <CalendarIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">Past Challenges</p>
      </SideBarLink>
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        @click="$emit('toggle-nav')"
        to="/how-to"
      >
        <QuestionMarkCircleIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">How to play?</p>
      </SideBarLink>
      <NuxtLink target="_blank" to="https://www.buymeacoffee.com/cytro">
        <NuxtImg class="h-10 w-36" src="/images/blue-button.png" />
      </NuxtLink>
    </div>
  </aside>
</template>
<script setup lang="ts">
import {
  PlayIcon,
  CalendarIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["toggle-nav"]);
</script>
