<template>
  <section style="background:#2e2e2e;padding-top:25vh;min-height:100vh;">
    <div class="authContainer">
      <a-form id="authInput" @submit.prevent="login">
        <img id="pageLoginLogo" src="@/assets/pictures/layout/logo.png" />

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
      if (this.password !== this.password2) {
        this.$notification["error"]({
          message: "Signup Error",
          description: `Passwords don't match}`
        });
      }

      if (
        !this.username ||
        !this.password ||
        !this.email
      ) {
        this.$notification["error"]({
          message: "Signup Error",
          description: `Please fill all fields`
        });
      }

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
        displayname: this.vorname, // TODO Translate
        email: this.email,
        phone: "",
        profileImage:
          "http://genratio.de/wp-content/uploads/2019/04/DefaultAvatarZero700px.png",
        kontaktFavoriten: [],
        kontaktListen: []
      };
      // Merge User Informations
      const fullUser = {
        user,
        userData
      };

      try {
        await this.$addUser(fullUser);
        this.$store.commit("INIT_USER", false);
        await this.$router.push("/login");
      } catch (e) {
        this.$notification["error"]({
          message: "Error while logging in",
          description: `${e.message}`
        });
      }
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
