import defaultUser from '../utils/default-user';
import { post } from './axios';
import { api_Login_Route, api_Create_Account } from './apiRoutes';

export async function signIn(email, password) {
  try {
    // Send request
    console.log(email, password);
     
    const loginResponse = await post(api_Login_Route, {EmailAddress:email,Password:password})
  

    

    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    // alert("sending request")

    const data = {
      "userName": email,
      "emailAddress": email,
      "password": password
    }

    const createAccountResponse = await post(api_Create_Account, data)


    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
