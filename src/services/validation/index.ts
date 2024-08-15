import { Inputs } from "../../types/validation";

import validator from 'validator';

export const pwdRegx = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')

export const validation = (type: Inputs, value: any) => {

    switch (type) {
        case 'email':
            if (!value) {
                return { error: 'Please enter email', value: false }
            } else {
                if (validator.isEmail(value)) {
                    return { error: undefined, value: true }
                }
                else {
                    return { error: 'invalid email', value: false }
                }
            }

        case 'textInput':
            if (value) {
                return { error: undefined, value: true }
            }
            else {
                return 'Please Enter the value'
            }

        case 'password':
            if (!value) {
                return { error: 'Please enter password', value: false }
            }
            else {
                if (pwdRegx.test(value)) {
                    return { error: undefined, value: true }
                }
                else {
                    return { error: 'Password must be at least 6 characters long \n &  include at least one letter and one number.', value: false }
                }
            }
    }





}