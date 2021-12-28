import { PDKAPI } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI'
import { RegisterAPI } from './APIs/Frontend/UserSystem/Registration/Register';
import { RequestVerifyEmailResendAPI } from './APIs/Frontend/UserSystem/Registration/RequestVerifyEmailResend';
import { VerifyEmailAPI } from './APIs/Frontend/UserSystem/Registration/VerifyEmail';
import { VerifyPhoneAPI } from './APIs/Frontend/UserSystem/Registration/VerifyPhone';

const allPDKAPIList : PDKAPI<any,any,any>[] = [];

allPDKAPIList.push(RegisterAPI);
export {RegisterAPI};

allPDKAPIList.push(VerifyEmailAPI);
export {VerifyEmailAPI};

allPDKAPIList.push(VerifyPhoneAPI);
export {VerifyPhoneAPI};

allPDKAPIList.push(RequestVerifyEmailResendAPI);
export {RequestVerifyEmailResendAPI};

export default allPDKAPIList;