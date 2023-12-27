<template>
  <CommonLayout>
    <section :class="`
        flex flex-col justify-around items-center w-3/4 h-96 px-8
        sm:max-w-lg border border-blue-500 rounded-lg shadow-md
      `"
    >
      <h1 class="text-3xl font-bold text-blue-500">
        Nuxtweb Socket
      </h1>

      <div class="flex flex-col gap-4 w-full">
        <HomeButton
          title="Join a Meeting"
          btnType="primary"
        />

        <HomeButton
          :isHost="true"
          title="Host a Meeting"
          btnType="secondary"
        />
      </div>
    </section>
  </CommonLayout>
</template>

<script lang="ts" setup>
import HomeButton from '@/components/Home/HomeButton.vue'
import CommonLayout from '@/components/Layout/CommonLayout.vue'
</script>

