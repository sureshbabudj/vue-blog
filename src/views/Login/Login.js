import isError from "../../util/formValidation";
import store from "../../store.js";

const data = {
  loginError: false,
  user: {
    email: "",
    password: ""
  },
  formSubmitted: false,
  validators: {
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/
    },
    password: {
      required: true,
      min: 8,
      max: 16,
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    }
  },
  errors: {
    email: {
      required: {
        error: false,
        msg: "Please enter a valid email address"
      },
      pattern: {
        error: false,
        msg: "The entered email address is not correct"
      },
      error: false
    },
    password: {
      required: {
        error: false,
        msg: "Please enter a strong password"
      },
      min: {
        error: false,
        msg: "The password should contain at least 8 characters"
      },
      max: {
        error: false,
        msg: "The password should not contain more than 16 characters"
      },
      pattern: {
        error: false,
        msg: "The password should contain at least a number and a special character"
      },
      error: false
    }
  }
};

async function login() {
  this.formSubmitted = true;
  if (this.isError(this.validators, this.user, this.errors)) {
    return;
  }
  try {
    const res = await fetch(
      `http://localhost:3434/users?email=${this.user.email}&password=${this.user.password}`
    );
    const data = await res.json();
    console.log(data);
    if (!data.length) {
      this.loginError = true;
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(data[0]));
    store.dispatch("login", data[0]);
    this.user = {
      email: "",
      password: ""
    };
    this.$router.replace("/");
  } catch (error) {
    this.loginError = true;
    console.error(`error: ${error}`);
  }
}

export default {
  data() {
    return data;
  },
  methods: {
    isError,
    login
  }
};
