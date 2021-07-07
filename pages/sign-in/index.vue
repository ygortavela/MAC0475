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
      :validator="dataContract"
      @form-submit="signIn"
    >
      <template #default="slotProps">
        <input-field
          v-model="userData.email.value"
          name="email"
          label="Email"
          :slot-props="slotProps"
        />
        <input-field
          v-model="userData.password.value"
          name="password"
          label="Password"
          type="password"
          :slot-props="slotProps"
        />
      </template>
    </custom-form>
  </section>
</template>

<script>
export default {
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
      dataContract: {
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
      buttons: [
        { type: 'reset', value: 'Clear', primary: false },
        { type: 'submit', value: 'Sign in', primary: true },
      ],
    }
  },
  methods: {
    async signIn() {
      try {
        const { accessToken } = await this.$axios.$post('/signup', {
          username: this.userData.username.value,
          email: this.userData.email.value,
          password: this.userData.password.value,
        })

        const { sub: id } = JSON.parse(atob(accessToken.split('.')[1]))

        this.$store.dispatch('mutateUser', {
          name: this.userData.username.value,
          email: this.userData.email.value,
          accessToken,
        })

        this.$router.push({ path: `/users/${id}` })
      } catch (error) {
        const { response } = error

        alert(
          `Please try again, request failed with status ${response.status}: ${response.data}`
        )
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
#sign-in {
  @apply flex flex-col items-center;
}
</style>