const paths = {
  home() {
    return "/";
  },
  search() {
    return "/search";
  },
  login() {
    return "/login";
  },
  signup() {
    return "/signup";
  },
  public() {
    return [this.home(), this.search()];
  },
  defaultInvalidUserRedirect() {
    return "/login";
  },
  supabaseAuthPrefix() {
    return "/auth";
  },
  auth() {
    return [this.login(), this.signup()];
  },
  oAuthCallback() {
    return "http://localhost:3000/auth/callback";
  },
  liked() {
    return "/liked";
  },
};

export { paths };
