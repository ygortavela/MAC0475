<template>
  <section id="sign-up">
    <navigation />
    <custom-form
      :buttons="buttons"
      :validator="dataContract"
      @form-submit="signUp"
    >
      <template #default="slotProps">
        <input-field
          v-model="userData.username.value"
          name="username"
          label="Username"
          :slot-props="slotProps"
        />
        <input-field
          v-model="userData.email.value"
          name="email"
          label="Email"
          placeholder="test@email.com"
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
      buttons: [
        { type: 'reset', value: 'Clear', primary: false },
        { type: 'submit', value: 'Sign up', primary: true },
      ],
    }
  },
  methods: {
    async signUp() {
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
#sign-up {
  @apply flex flex-col items-center;
}
</style>