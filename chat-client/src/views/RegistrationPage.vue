<template>
  <div class="registration">
    <header class="registration-header">Регистрация</header>
    <form v-on:submit.prevent="submit" class="registration-form">
      <input type="text" v-model="form.username" placeholder="Login">
      <input type="password" v-model="form.password" placeholder="Password">
      <button type="submit">Отправить</button>
    </form>
    <footer class="registration-footer">
      <span class="registration-footer__login">Я <router-link to="login">зарегистрирован</router-link></span>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.logout()
  },
  methods: {
    ...mapActions(['login', 'logout']),
    submit () {
      this.login(Object.freeze(this.form))
    }
  }
}
</script>

<style lang="scss">
.registration {
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgb(0 0 0 / 4%), 0px 6px 10px rgb(0 0 0 / 2%);
    border-radius: 4px;
    padding: 24px;

  &-header {
    margin-bottom: 20px;
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-footer {
    margin-top: 12px;

    &__login {
      font-size: 10px;
      line-height: 13px;
      letter-spacing: -0.02em;
      color: #49485E;
    }
  }
}
</style>
