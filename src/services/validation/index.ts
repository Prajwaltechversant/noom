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

        case 'cvv':
            if (!value) {
                return { error: 'Please enter Cvv', value: false }
            }
            else {
                if (!validator.isLength(value, { min: 3 })) {
                    return { error: 'cvv must be 3', value: false }
                } else {
                    return { error: undefined, value: true }

                }
            }

        case "cardNo":
            if (!value) {
                return { error: 'Please enter debit card number', value: false }
            }
            else {
                if (!validator.isLength(value, { min: 16, max: 16 })) {
                    return { error: 'Please check the debit card number', value: false }
                } else {
                    return { error: undefined, value: true }
                }
            }
        case 'exp':
            if (!value) {
                return { error: 'Please enter debit card exp date', value: false }
            }
            else {
                return { error: undefined, value: true }
            }
    }





}