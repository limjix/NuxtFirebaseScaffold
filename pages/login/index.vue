<template>
    <div>
      <v-row justify="center">
        <v-col lg="4" md="6" sm="9" xs="12">
          <v-card class="rounded-xl">
            <v-container>
              <v-row align="center" justify="center">
                <v-col>
                  <div class="a"></div>
                  <span class="display-1 font-weight-light grey--text d-flex justify-center">LOGIN</span>
                  <v-divider></v-divider>
                  <v-card-text>
                    <h4 class="black--text subheading"></h4>
                    <v-form v-model="isFormValid">
                      <v-text-field
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
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="password"
                        hint="no hint given"
                        counter
                        @click:append="show1 = !show1"
                        prepend-inner-icon="mdi-lock"
                        clearable
                        outlined
                      ></v-text-field>

                      <div class="text-center">
                      <span class="red--text" v-if="feedback">{{
                        feedback
                      }}</span>
                      </div>

                      <v-btn
                        block
                        rounded
                        color="secondary"
                        @click="login"
                        :disabled="!isFormValid"
                      >Log In</v-btn
                      >
                      <v-btn
                        class="mt-3"
                        block
                        rounded
                        outlined
                        color="grey"
                        @click="signup"

                      >Sign Up</v-btn
                      >
                      <v-btn class="mt-1" text x-small nuxt to="/resetpassword"
                      >Forgot Password?</v-btn
                      >
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
              this.$router.push("/");
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
              this.$router.push("/");
            })
            .catch(err => {
              alert(err.message);
            });
        },
        facebookLogin() {
          this.$store
            .dispatch("user/signInWithFacebook")
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => {
              alert(err.message);
            });
        }
        signup() {
          this.$router.push("signup");
        },
      },
    }
</script>

<style scoped>

</style>
