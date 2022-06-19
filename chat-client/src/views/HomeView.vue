<template>
  <div class="home">
    <h1>id: {{user.id}}</h1>
    <h1>username: {{user.username}}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  computed: {
    ...mapState(['user'])
  }
}
</script>
