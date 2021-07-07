<template>
  <section id="sign-in">
    <navigation />
    <custom-form
      :buttons="buttons"
      :tooltip="{
        label: 'Not an user yet?',
        routeLabel: 'Sign-up now!',
        route: '/sign-up',
      }"
    >
      <input-field
        v-model="userData.email.value"
        name="email"
        label="Email"
        type="email"
        :errors="userData.email.errors"
      />
      <input-field
        v-model="userData.password.value"
        name="password"
        label="Password"
        type="password"
        :errors="userData.password.errors"
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
        { type: 'submit', value: 'Sign in', primary: true },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
#sign-in {
  @apply flex flex-col items-center;
}
</style>