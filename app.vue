<script setup lang="ts">
import { useHead } from 'unhead'

useHead({
    titleTemplate: "%s - etfTracker"
});
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>