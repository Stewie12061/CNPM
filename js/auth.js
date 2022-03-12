
const errFullname = document.getElementById("error-fullname")
const errEmail = document.getElementById("error-email")
const errPassword = document.getElementById("error-password")
const errRePassword = document.getElementById("error-rePassword")


// Builder Pattern
// valiedate
class Validate {
    checkFormRegiser(builder) {
        builder.fullname()
        builder.email()
        builder.password()
        builder.rePassword()
        this.errors = builder.errors
        return builder.errors
    }
    checkFormLogin(builder) {
        builder.email()
        builder.password()
        this.errors = builder.errors
        return builder.errors
    }
    hasErrors() {
        let keys = Object.keys(this.errors)
        if (keys.length > 0) return true
        else return false
    }
}
// valiedate Builder
class ValidateBuilder {

    constructor(user) {
        this.user = user;
        this.errors = {};
    }

    fullname() {
        if (!this.user.fullname) this.errors.fullname = 'Bạn cần điền đầy đủ họ và tên'
    }

    email() {
        if (!this.user.email) this.errors.email = 'Bạn cần điền đầy đủ email'
    }

    password() {
        if (!this.user.password) this.errors.password = 'Bạn cần điền đầy đủ mật khẩu'
    }

    rePassword() {
        if (this.user.password != this.user.rePassword) this.errors.rePassword = 'Mật khẩu nhập lại không chính xác'
    }
}

// End Builder Pattern

