<template>
  <form id="custom-form" @submit="$emit('form-submit', $event)">
    <slot></slot>
    <div class="form__button">
      <button
        v-for="button in buttons"
        :key="button.value"
        :type="button.type"
        class="button"
        :class="{ 'button--primary': button.primary }"
      >
        {{ button.value }}
      </button>
    </div>
    <p class="form__tooltip">
      {{ tooltip.label }}
      <nuxt-link
        v-if="tooltip.routeLabel && tooltip.route"
        :to="tooltip.route"
        class="link"
        >{{ tooltip.routeLabel }}</nuxt-link
      >
    </p>
  </form>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      default: () => [{ type: 'submit', value: 'submit' }],
    },
    tooltip: {
      type: Object,
      default: () => {
        return {
          label: 'Already an user?',
          routeLabel: 'Sign-in now!',
          route: '/sign-in',
        }
      },
    },
  },
}
</script>

<style lang="postcss" scoped>
#custom-form {
  @apply flex flex-col items-center;
  @apply m-8 border border-indigo-100 rounded-lg py-6 px-8;
  @apply bg-gray-100 shadow-xl;
}

.form__button {
  @apply flex justify-center;
}

.button {
  @apply text-center font-black text-indigo-500;
  @apply my-4 mx-2 border border-indigo-500 rounded py-2 px-4;
  @apply bg-gray-50;
}

.button:hover {
  @apply ring;
}

.button--primary {
  @apply border-indigo-500;
  @apply bg-indigo-500;
  @apply text-white;
}

.link {
  @apply text-indigo-500;
}
</style>