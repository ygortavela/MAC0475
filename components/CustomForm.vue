<template>
  <form id="custom-form" @submit="handleSubmit" @reset="handleReset">
    <slot :errors="errors" :clean-error="handleCleanError"></slot>
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
import validate from '@/utils/validators'
import validationMessages from '@/constants/validationMessage'

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
    validator: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errors: {
        type: Object,
        default: () => {},
      },
    }
  },
  mounted() {
    this.errors = Object.keys(this.validator).reduce((acc, current) => {
      acc[current] = []

      return acc
    }, {})
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()

      const inputElements = event.target.elements
      const inputValues = Object.keys(this.validator).reduce((acc, current) => {
        acc[current] = inputElements[current].value

        return acc
      }, {})

      const notValidFields = validate(this.validator, inputValues)

      if (Object.keys(notValidFields).length > 0) {
        Object.entries(notValidFields).forEach(([field, errorsArray]) => {
          this.errors[field] = errorsArray.map(
            (error) => `${field} ${validationMessages[error]}`
          )
        })
      }

      this.$emit('form-submit')
    },
    handleReset() {
      Object.keys(this.errors).forEach((field) => this.handleCleanError(field))
    },
    handleCleanError(target) {
      this.errors[target] = []
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