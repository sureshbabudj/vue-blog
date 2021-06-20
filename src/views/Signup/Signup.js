import isError from "../../util/formValidation";

const data = {
  user: {
    name: "",
    email: "",
    password: ""
  },
  formSubmitted: false,
  validators: {
    name: {
      required: true,
      min: 3,
      max: 254
    },
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
    name: {
      required: {
        error: false,
        msg: "Please enter your name"
      },
      min: {
        error: false,
        msg: "The name should contain at least 3 characters"
      },
      max: {
        error: false,
        msg: "The name should not contain more than 254 characters"
      },
      error: false
    },
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

async function postUser() {
  this.formSubmitted = true;
  if (this.isError(this.validators, this.user, this.errors)) {
    return;
  }
  try {
    const res = await fetch("http://localhost:3434/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.user)
    });
    const data = await res.json();
    console.log(data);
    this.user = {
      name: "",
      email: "",
      password: ""
    };
    this.$router.replace("/login");
  } catch (error) {
    console.error(error);
  }
}

export default {
  data: () => {
    return data;
  },
  computed: {},
  methods: {
    isError,
    postUser
  }
};
