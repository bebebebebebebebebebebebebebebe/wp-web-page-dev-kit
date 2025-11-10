export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDetails() {
    return `Name: ${this.name}, Email: ${this.email}`;
  }
}
