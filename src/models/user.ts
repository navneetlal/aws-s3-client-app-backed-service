class User {
  public email: string
  private password: string

  private passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  public constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public isValidPassword() {
    return this.passwordRegex.test(this.password)
  }

}

export default User;