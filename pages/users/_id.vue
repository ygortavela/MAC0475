<template>
  <section id="profile">
    <navigation :profile="true" />
    <div class="profile">
      <img src="~/assets/images/luffy.jpg" class="profile__picture" />
      <ul class="profile__info">
        <li>
          Email: <span class="profile__info--item">{{ user.email }}</span>
        </li>
        <li>
          Username: <span class="profile__info--item">{{ user.username }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  middleware({ route, store, redirect }) {
    if (route.name === 'users-id' && !store.getters.getAccessToken) {
      redirect('/sign-in')
    }
  },
  data() {
    return {
      user: {},
    }
  },
  async mounted() {
    try {
      this.$axios.setHeader(
        'Authorization',
        `Bearer ${this.$store.getters.getAccessToken}`
      )

      const response = await this.$axios.$get(
        `/600/users/${this.$route.params.id}`,
        {}
      )

      this.user = response
    } catch (error) {
      const { response } = error

      alert(
        `Please try again, request failed with status ${response.status}: ${response.data}`
      )

      if (response.status === 403) this.$router.replace({ path: '/sign-in' })
    }
  },
}
</script>

<style lang="postcss" scoped>
#profile {
  @apply flex flex-col items-center;
}

.profile {
  @apply flex flex-col items-center;
  @apply w-11/12;
  @apply m-8 border border-indigo-100 rounded-lg py-6 px-8;
  @apply bg-gray-100 shadow-xl;
}

.profile__picture {
  @apply w-24 h-24;
  @apply mr-8 border-2 border-indigo-300 rounded-full p-1;
  @apply shadow-lg;
}

li {
  @apply my-2;
}

.profile__info {
  @apply text-gray-700 text-lg font-medium uppercase tracking-wider;
  @apply self-start mt-4;
}

.profile__info--item {
  @apply font-bold text-left;
}

@media (min-width: 720px) {
  .profile {
    @apply flex-row;
    @apply w-9/12;
  }

  .profile__info {
    @apply self-auto mt-0;
  }
}

@media (min-width: 1200px) {
  .profile {
    @apply w-7/12;
  }
}
</style>