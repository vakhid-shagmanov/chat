<template>
  <div class="login">
    <header class="login-header">Авторизация</header>
    <form v-on:submit.prevent class="login-form">
      <input type="text" v-model="form.name" placeholder="Login">
      <input type="password" v-model="form.password" placeholder="Password">
      <button type="submit">Отправить</button>
    </form>
    <footer class="login-footer">
      <span class="login-footer__registaration">Я не <router-link to="registration">зарегистрирован</router-link></span>
    </footer>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss">
.login {
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

    &__registaration {
      font-size: 10px;
      line-height: 13px;
      letter-spacing: -0.02em;
      color: #49485E;
    }
  }
}
</style>
