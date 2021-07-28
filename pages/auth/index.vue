<template>
  <div>
    <v-row justify="center">
      <img class="pt-2 pb-2" src="logo/logo.png" width="200"/>
    </v-row>
    <v-row justify="center">
      <v-col lg="4" md="6" sm="9" xs="12">
        <v-card color="grey lighten-2">
          <v-container>
            <v-row align="center" justify="center">
              <v-col>
                <div class="text-center">
                      <span class="red--text" v-if="feedback">{{ feedback }}</span>
                </div>
                <v-card-text>
                  <v-form v-model="isFormValid">
                    <v-text-field
                      background-color="white"
                      v-model="email"
                      label="E-mail"
                      :rules="[rules.required]"
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
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      @click:append="show1 = !show1"
                      prepend-inner-icon="mdi-lock"
                      clearable
                      outlined
                    ></v-text-field>

                    <v-btn block color="primary" @click="login" :disabled="!isFormValid">Log In</v-btn>
                    <v-btn class="mt-1 d-flex justify-center" text x-small nuxt to="/auth/resetpassword">Forgot Password?</v-btn>
                    <v-btn class="mt-1 d-flex justify-center" text small nuxt to="/auth/signup">Don't have an account? Register Here</v-btn>
                    <v-divider class= "mt-2 mb-3"></v-divider>
                    <div class="text-button d-flex justify-center">OR SIGN IN WITH:</div>
                    <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="googleSignIn"><v-icon class="pr-4">mdi-google</v-icon>Google</v-btn>
                    <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="facebookLogin"><v-icon color="#3b5998" class="pr-4">mdi-facebook</v-icon>Facebook</v-btn>
                    <v-btn class="mt-3 buttoncolor" block outlined color="primary" @click="linkedInLogin"><v-icon color="#0077B5" class="pr-4">mdi-linkedin</v-icon>LinkedIn</v-btn>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>


          </v-container>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "index",
  // middleware: "authentication",
  data() {
    return {
      isFormValid: false,
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
      email: null,
      feedback: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        //(v) => /@kvmrt-ug.com.my\s*$/.test(v) || "E-mail must be a KVMRT Email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required"
      ],
    };
  },
  methods: {
    login() {
      this.feedback = null;
      let credentials = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("user/login", credentials)
        .then(() => {
          // this.$router.push("/");
        })
        .catch((err) => {
          this.feedback = err;
        });
    },
    //Add buttons for google sign in and facebooklogin
    googleSignIn() {
      this.$store
        .dispatch("user/signInWithGoogle")
        .then(() => {
          // this.$router.push("/");
        })
        .catch(err => {
          alert(err.message);
        });
    },
    facebookLogin() {
      this.$store
        .dispatch("user/signInWithFacebook")
        .then(() => {
          // this.$router.push("/");
        })
        .catch(err => {
          alert(err.message);
        });
    },
    linkedInLogin() {
      this.$store
        .dispatch("user/signInWithLinkedIn")
        .then(() => {
          // this.$router.push("/");
        })
        .catch(err => {
          alert(err.message);
        });
    },
    signup() {
      this.$router.push("signup");
    },
  },
}
</script>

<style scoped>
.buttoncolor{
  background-color: white !important;
}
</style>
