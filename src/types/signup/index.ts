




export interface SignupWithEmailtype {
    email:string | undefined;
    password : string | undefined
}

export interface SignupWithEmailErrorType {
    passwordErr : string | undefined,
    emailErr:string | undefined,

}