<template>
  <section id="sign-up">
    <navigation />
    <custom-form
      :buttons="buttons"
      :validator="userData.dataContract"
      @form-submit="handleFormSubmit"
    >
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
import validationMessages from '@/constants/validationMessage'

export default {
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
        dataContract: {
          username: {
            type: 'username',
            required: true,
          },
          email: {
            type: 'email',
            required: true,
          },
          password: {
            type: 'string',
            required: true,
            lengthRange: {
              min: 8,
              max: 32,
            },
          },
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
    handleFormSubmit(notValidFields) {
      if (Object.keys(notValidFields).length > 0) {
        Object.entries(notValidFields).forEach(([field, errorsArray]) => {
          this.userData[field].errors = errorsArray.map(
            (error) => `${field} ${validationMessages[error]}`
          )
        })

        return
      }

      console.log('bla')
    },
  },
}
</script>

<style lang="postcss" scoped>
#sign-up {
  @apply flex flex-col items-center;
}
</style>