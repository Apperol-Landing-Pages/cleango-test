const patterns = {
  tab: /\s/,
  // regexp is almost the same as RFC 5322. Got from https://emailregex.com/
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export function useValidators() {
  const validateEmail = (inputValue: string) => {
    const value = inputValue ? String(inputValue) : "";
    let errorMessage = "";

    switch (true) {
      case value === "":
        errorMessage = "Please enter your email";
        break;
      case value.search(patterns.tab) >= 0:
        errorMessage = "Your email contains spaces";
        break;
      case !value.match(patterns.email):
        errorMessage = "Your email seems incorrect";
        break;
      default:
        break;
    }
    return { isValid: !errorMessage, filter: "email", message: errorMessage };
  };

  return {
    validateEmail,
  };
}
