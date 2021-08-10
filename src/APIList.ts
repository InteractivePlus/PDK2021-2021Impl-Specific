import { PDKAPI } from '@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI'
import { RegisterAPI } from './APIs/Register';

const allPDKAPIList : PDKAPI<any,any,any>[] = [];

allPDKAPIList.push(RegisterAPI);
export {RegisterAPI};

export default allPDKAPIList;