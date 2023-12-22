<template>
  <main class="min-h-screen flex justify-center items-center">
    <div :class="`
        flex flex-col justify-around items-center w-3/4 h-96
        max-w-md border border-black rounded-md shadow-sm px-8
      `"
    >
      <h1 class="text-3xl font-bold text-blue-500">Nuxtweb Socket</h1>

      <section class="flex flex-col gap-4 w-full">
        <HomeButton
          title="Join a Meeting"
          btnType="primary"
        />

        <HomeButton
          title="Host a Meeting"
          btnType="secondary"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import HomeButton from '@/components/Home/HomeButton.vue'
</script>

