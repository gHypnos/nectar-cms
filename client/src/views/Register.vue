<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div class="form-group">
        <input id="name" type="text" v-model="name" required autofocus />
      </div>

      <label for="email">E-Mail Address</label>
      <div class="form-group">
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div class="form-group">
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div class="form-group">
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <div class="form-group">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
