import Axios from 'axios';
import loginUserCall from './loginUserCall';

const registerUserCall = async (registerData: any) => {

  let resp = await loginUserCall('demouser', '1234');

  var data = {
    // firstName: "Neetesh",
    // lastName: "Bhardwaj",
    // email: "neetesh.bhardwaj@nagarro.com",
    // phoneNo: "+91-8802773141",
    // specialit: "Ortho",
    // isEmployeeIDVerifiedByEmailOTP: "Y",
    // objectId: "postman-5735",
    // role: "DOCTOR"
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    phoneNo: registerData.phoneNumber,
    speciality: 'Ortho',
    isEmployeeIDVerifiedByEmailOTP: 'N',
    // objectId: 'postman-57363',
    role: 'DOCTOR',
    password: registerData.password
  };
  let regURL = 'https://accelerator-api-management.azure-api.net/user-service/api/v1/users';
  var config = {
    // method: "post",
    url: regURL,
    headers: {
      Authorization: `Bearer ${resp?.data?.data?.access_token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const response = await Axios.post<any>(regURL, data, config)
    .then((response: any) => {
      console.log('register-Response', response);
      return response;
    })
    .catch((error: any) => {
      console.error(error);
    });
  return response;
};
export default registerUserCall;
