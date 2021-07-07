<template>
  <nav id="navigation">
    <nuxt-link to="/sign-in" class="link">Sign in</nuxt-link>
    <nuxt-link to="/sign-up" class="link link--primary">Sign up</nuxt-link>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
#navigation {
  @apply sticky h-16 w-full uppercase;
  @apply border-b-2 border-indigo-500 py-4 px-8;
  @apply bg-indigo-200;
  @apply flex justify-end items-center;
}

.link {
  @apply font-bold text-lg;
  @apply mx-3;
}

.link--primary {
  @apply border border-indigo-500 rounded-full py-1 px-3;
  @apply bg-indigo-500;
  @apply text-white;
}
</style>