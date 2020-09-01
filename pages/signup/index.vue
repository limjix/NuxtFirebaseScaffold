<!--
  Purpose: Sign up page to create _user account
  Author: Sam
  Uses: No outside components
  -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6" xs="12" s="12">
        <v-card v-if="!confirmed" class="px-12 py-12">
          <v-btn icon small nuxt to="/" class="mx-0"
          ><v-icon>mdi-keyboard-backspace</v-icon></v-btn
          >
          <div class="display-1 text-center">Create User Account</div>
          <v-form ref="signUpForm" v-model="valid">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmpassword"
              type="password"
              :rules="[password === confirmpassword || 'Password must match']"
              label="Confirm Password"
              required
            ></v-text-field>


            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-4 mr-4"
              @click="signUp"
            >Sign Up</v-btn
            >
            <v-btn color="error" class="mt-4 mr-4" @click="reset"
            >Reset Form</v-btn
            >
            <p class="red--text mt-4" v-if="error">{{ error }}</p>
          </v-form>
        </v-card>
        <v-card v-if="confirmed" class="px-12 py-12">
          <div class="display-1 mx-5 my-5">Sign Up Confirmed</div>
          <v-btn color="primary" @click="back">Back to Home</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { auth, firestoreDB } from "@/firebase/init.js";
  import slugify from "slugify";
  export default {
    layout: "login",
    data() {
      let confirmed = this.$route.query.status;

      return {
        confirmed,
        error: "",
        valid: false,
        name: "",
        nameRules: [(v) => !!v || "Name is required"],

        email: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          //(v) => /@kvmrt-ug.com.my\s*$/.test(v) || "E-mail must be a KVMRT Email",
        ],

        password: "",
        passwordRules: [(v) => !!v || "Password is required"],

        confirmpassword: "",

        role: "",
        roleRules: [(v) => !!v || "Role is required"],

      };
    },

    methods: {
      back() {
        this.$router.push("/");
      },
      signUp() {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@']/,
          lower: true,
        });

        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            console.log("Signup Complete", user.user.uid);

            //write to firestore DB
            firestoreDB
              .collection("Users")
              .doc(user.user.uid)
              .set({
                name: this.name,
                slug: this.slug,
                email: this.email.toLowerCase(), // some user may sign up their email in upper case and the user.js store might not able to recognise due to case sensitive
                id: user.user.uid,
              })
              .catch((e) => {
                this.error = e;
              });
          })
          // .then(() => {
          //   // Send Verification Email
          //   let user = auth.currentUser;
          //   user.sendEmailVerification().catch(function (error) {
          //     this.error = e;
          //   });
          // })
          .then(() => {
            // Add query to the top to confirm
            this.$router.push({ query: { status: "confirmed" } });
          })
          .catch((e) => {
            this.error = e;
          });
      },
      reset() {
        this.$refs.signUpForm.reset();
      },
    },
    watchQuery: ["status"],
  };
</script>

<style scoped></style>
