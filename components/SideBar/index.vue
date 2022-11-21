<template>
  <aside>
    <div class="flex flex-col gap-5">
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        to="/"
      >
        <PlayIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">Daily Challenge</p>
      </SideBarLink>
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        to="/about"
      >
        <CalendarIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">Past Challenges</p>
      </SideBarLink>
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        to="/test"
      >
        <QuestionMarkCircleIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">How to play?</p>
      </SideBarLink>
      <SideBarLink
        class="flex items-center space-x-2 py-3 px-3 transition-all duration-100 ease-in-out"
        to="/bla"
      >
        <CurrencyDollarIcon class="h-5 w-5" />
        <p class="pt-[2.3px] text-sm">Coffee</p>
      </SideBarLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  PlayIcon,
  CalendarIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
</script>
