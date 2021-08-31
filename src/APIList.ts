import { PDKAPI } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI'
import { RegisterAPI } from './APIs/Frontend/UserSystem/Register';
import { VerifyEmailAPI } from './APIs/Frontend/UserSystem/VerifyEmail';

const allPDKAPIList : PDKAPI<any,any,any>[] = [];

allPDKAPIList.push(RegisterAPI);
export {RegisterAPI};

allPDKAPIList.push(VerifyEmailAPI);
export {VerifyEmailAPI};

export default allPDKAPIList;