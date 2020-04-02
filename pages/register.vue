<template>
  <section style="background:#2e2e2e;padding-top:25vh;min-height:100vh;">
    <div class="authContainer">
      <a-form id="authInput" @submit.prevent="login">
        <img id="pageLoginLogo" src="@/assets/pictures/layout/logoISPPA.png" />

        <a-form-item>
          <a-input
            class="inputLogin"
            placeholder="username"
            v-model="username"
            type="text"
            v-autofocus
            @keyup.enter.native="register"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            class="inputLogin"
            placeholder="password"
            v-model="password"
            type="password"
            @keyup.enter.native="register"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            class="inputLogin"
            placeholder="repeat password"
            v-model="password2"
            type="password"
            @keyup.enter.native="register"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            class="inputLogin"
            placeholder="ticker"
            v-model="ticker"
            type="text"
            @keyup.enter.native="register"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            class="inputLogin"
            placeholder="e-mail"
            v-model="email"
            type="text"
            @keyup.enter.native="register"
          />
        </a-form-item>

        <a-form-item>
          <a-button id="loginButton" type="primary" block @click="register">Register</a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>

</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "login",
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      ticker: '',
      email: ''
    };
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.password2) {
          this.$notification["error"]({
            message: "Signup Error",
            description: `Passwords don't match}`
          });
        } else if (!this.username || !this.password || !this.ticker || !this.email) {
            this.$notification["error"]({
              message: "Signup Error",
              description: `Please fill all fields`
            });
          } else if (!this.usernameAvailable(this.username)) {
            this.$notification["error"]({
              message: "Signup Error",
              description: `Username already taken!`
            });
          } else {
            // User Credentials
            const user = {
              _id: this.username.toLowerCase(),
              username: this.username.toLowerCase(),
              password: this.password,
              ticker: this.ticker.toUpperCase(),
              role: "User"
            };
            // UserData
            const userData = {
              _id: this.username.toLowerCase(),
              email: this.email,
              profileImage: ''
            };
            // Merge User Informations
            const fullUser = {
              user,
              userData
            };
            await this.$addUser(fullUser);
            this.$store.commit("INIT_USER", false);
            await this.$router.push("/login");
          }
      } catch (e) {
        this.$notification["error"]({
          message: "Registering error",
          description: `${e.message}`
        });
      }
    },
    usernameAvailable(username) {
      let available = true;
      for (let i = 0; i < this.$store.state.user.length; i++) {
        if (this.$store.state.user[i].username === username) {
          available = false;
        }
      }
      return available;
    }
  },
  computed: {
    ...mapState(["authUser"])
  }
};
</script>

<style>
#pageLoginLogo {
  height: 5.25em;
  margin: 0.75em;
  padding-bottom: 2em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.inputLogin {
  background-color: #2e2e2e;
  border-color: #1e1e1e;
  color: white;
  text-align: center;
  min-width: 20em;
}

#para {
  color: white;
  text-align: center;
}

#authInput {
  width: 20em;
  margin: auto;
}
.authContainer {
  background: #1e1e1e;
  width: 25em;
  padding-top: 1em;
  padding-bottom: 1em;
  margin: auto;
}
#loginButton {
  padding-top: 0;
  min-width: 20em;
}
</style>
