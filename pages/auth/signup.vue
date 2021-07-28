<!--
  Purpose: Sign up page to create _user account
  Author: Sam
  Uses: No outside components
  -->
<template>
  <div>
    <v-row justify="center">
      <img class="pt-2 pb-2" src="logo/logo.png" width="200"/>
    </v-row>
    <v-row justify="center">
      <v-col lg="4" md="6" sm="9" xs="12">
        <v-card v-if="!confirmed" color="grey lighten-2">
          <v-container>
            <v-row align="center" justify="center">
              <v-col>
                <v-btn icon small nuxt to="/auth" class="mx-0">
                  <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
                <div class="text-h5 text-center mb-5">Create User Account</div>
                <v-card-text>
                  <v-form ref="signUpForm" v-model="valid">
                    <v-text-field
                      background-color="white"
                      v-model="email"
                      label="E-mail"
                      :rules="emailRules"
                      name="email"
                      prepend-inner-icon="mdi-email"
                      type="email"
                      clearable
                      outlined
                    ></v-text-field>

                    <v-text-field
                      background-color="white"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      @click:append="show1 = !show1"
                      prepend-inner-icon="mdi-lock"
                      clearable
                      outlined
                    ></v-text-field>

                    <v-text-field
                      background-color="white"
                      v-model="confirmPassword"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[this.password === this.confirmPassword || 'Password must match']"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirm Password"
                      @click:append="show2 = !show2"
                      prepend-inner-icon="mdi-lock"
                      clearable
                      outlined
                    ></v-text-field>

                    <v-btn
                      block color="primary"  :disabled="!valid"
                      @click="signUp"
                    >Sign Up
                    </v-btn>
                    <p class="red--text mt-4" v-if="error">{{ error }}</p>
                  </v-form>

                  <v-divider class="mt-2 mb-3"></v-divider>
                  <div class="text-button d-flex justify-center">OR SIGN IN WITH:</div>
                  <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="googleSignIn">
                    <v-icon class="pr-4">mdi-google</v-icon>
                    Google
                  </v-btn>
                  <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="facebookLogin">
                    <v-icon color="#3b5998" class="pr-4">mdi-facebook</v-icon>
                    Facebook
                  </v-btn>
                  <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="linkedInLogin">
                    <v-icon color="#0077B5" class="pr-4">mdi-linkedin</v-icon>
                    LinkedIn
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card v-if="confirmed" color="grey lighten-2">
          <v-container>
            <v-col align="center">
              <div class="my-3 text-h5 font-weight-bold">Welcome to the Club!</div>
              <div class="my-3 text-subtitle-1">A verification email was sent to your email.</div>
              <v-btn color="primary" @click="back">Back to Home</v-btn>
            </v-col>

          </v-container>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import {auth, firestoreDB} from "@/firebase/init.js";

export default {
  layout: "login",
  data() {
    return {
      confirmed: false,
      error: "",
      show1: false,
      show2: false,
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        //(v) => /@kvmrt-ug.com.my\s*$/.test(v) || "E-mail must be a KVMRT Email",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      confirmPassword: "",
    };
  },

  methods: {
    back() {
      this.$router.push("/");
    },
    googleSignIn() {
      this.$store
        .dispatch("user/signInWithGoogle")
        .catch(err => {
          alert(err.message);
        });
    },
    facebookLogin() {
      this.$store
        .dispatch("user/signInWithFacebook")
        .catch(err => {
          alert(err.message);
        });
    },
    linkedInLogin() {
      this.$store
        .dispatch("user/signInWithLinkedIn")
        .catch(err => {
          alert(err.message);
        });
    },
    signUp() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log("Signup Complete", user.user.uid);
          this.confirmed = true;
        })
        .catch((e) => {
          this.error = e;
        });
    },
  },
};
</script>

<style scoped>
.buttoncolor{
  background-color: white !important;
}
</style>
