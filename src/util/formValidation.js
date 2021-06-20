export default function (validators, user, errors) {
  let formError = [];
  Object.keys(validators).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(user, field)) {
      let error = [];
      Object.keys(validators[field]).forEach((validator) => {
        switch (validator) {
          case "required":
            errors[field][validator].error = !user[field];
            error.push(errors[field][validator].error);
            break;
          case "min":
            errors[field][validator].error =
              user[field].length < validators[field][validator];
            error.push(errors[field][validator].error);
            break;
          case "max":
            errors[field][validator].error =
              user[field].length > validators[field][validator];
            error.push(errors[field][validator].error);
            break;
          case "pattern":
            errors[field][validator].error = !validators[field][validator].test(
              user[field]
            );
            error.push(errors[field][validator].error);
            break;
          default:
            break;
        }
        const errIndex = error.findIndex((i) => i === true);
        errors[field].error = errIndex > -1;
        errors[field].msg =
          errors[field].error &&
          errors[field][Object.keys(errors[field])[errIndex]].msg;
      });
    }
    formError.push(errors[field].error);
  });
  return formError.includes(true);
}
