<template>
  <section id="sign-up">
    <navigation />
    <custom-form :buttons="buttons" @form-submit="handleFormSubmit">
      <input-field
        v-model="userData.username.value"
        name="username"
        label="Username"
        :errors="userData.username.errors"
        @clean-errors="handleCleanErrors"
      />
      <input-field
        v-model="userData.email.value"
        name="email"
        label="Email"
        type="email"
        placeholder="test@email.com"
        :errors="userData.email.errors"
        @clean-errors="handleCleanErrors"
      />
      <input-field
        v-model="userData.password.value"
        name="password"
        label="Password"
        type="password"
        :errors="userData.password.errors"
        @clean-errors="handleCleanErrors"
      />
    </custom-form>
  </section>
</template>

<script>
import Navigation from '@/components/Navigation'
import CustomForm from '@/components/CustomForm'
import InputField from '@/components/InputField'

export default {
  components: {
    Navigation,
    CustomForm,
    InputField,
  },
  data() {
    return {
      userData: {
        username: {
          value: '',
          errors: [],
        },
        email: {
          value: '',
          errors: [],
        },
        password: {
          value: '',
          errors: [],
        },
      },
      buttons: [
        { type: 'reset', value: 'Clear', primary: false },
        { type: 'submit', value: 'Sign up', primary: true },
      ],
    }
  },
  methods: {
    handleCleanErrors(target) {
      this.userData[target].errors = []
    },
    handleFormSubmit(event) {
      event.preventDefault()
    },
  },
}
</script>

<style lang="postcss" scoped>
#sign-up {
  @apply flex flex-col items-center;
}
</style>