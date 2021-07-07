<template>
  <div id="input-field">
    <label :for="name" class="input__label">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      class="input"
      :class="{ 'input--error': hasError }"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="hasError && slotProps.cleanError($event.target.name)"
    />
    <p v-for="error in errors" :key="error" class="input__message">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    slotProps: {
      type: Object,
      default: () => {
        return {
          errors: {},
          cleanErrorCallback: () => {},
        }
      },
    },
  },
  computed: {
    errors() {
      return this.slotProps.errors[this.name]
    },
    hasError() {
      return this.errors?.length > 0
    },
  },
}
</script>

<style lang="postcss" >
#input-field {
  @apply flex flex-col;
  @apply w-64;
  @apply my-2;
}

.input__label {
  @apply text-gray-700 text-xs font-medium uppercase tracking-wider;
}

.input {
  @apply mt-1 border border-gray-300 rounded-md py-1 px-4;
  @apply shadow-sm text-lg bg-gray-50;
}

.input:focus {
  @apply ring-indigo-500 border-indigo-500;
  @apply outline-none;
}

.input--error {
  @apply border-red-400;
}

.input__message {
  @apply text-red-400 text-sm;
}
</style>