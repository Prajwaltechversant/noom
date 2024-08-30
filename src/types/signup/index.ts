




export interface SignupWithEmailtype {
    email:string | undefined;
    password : string | undefined
}

export interface SignupWithEmailErrorType {
    passwordErr : string | undefined,
    emailErr:string | undefined,

}

export interface DebitCardError {
    number : string | undefined,
    cvv:string | undefined,
    exp:string | undefined,


}