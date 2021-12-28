import Joi from "joi";
import { PDKCredentialNotMatchError, PDKRequestParamFormatError, PDKSenderServiceError, PDKStorageEngineError, PDKUnknownInnerError } from "../../../../../../pdk2021-common/dist/AbstractDataTypes/Error/PDKException";
import { SystemSettings } from "../../../../../../pdk2021-common/dist/AbstractDataTypes/SystemSetting/SystemSettings";
import { ParamTypeCustomProperties, PDKAPI, PDKAPICaptchaParam } from "../../../../../../pdk2021-common/dist/ExchangeDataTypes/PDKAPI";
import { getJoiValidationErrorFirstPaths, parseJoiTypeItems } from "../../../../../../pdk2021-common/dist/Utilities/JoiCheckFunctions";

interface RequestVerifyPhoneResendAPIParam extends PDKAPICaptchaParam{
    Phone: string
};

export type {RequestVerifyPhoneResendAPIParam};

function parseRequestVerifyPhoneResendAPIParam(param: any, systemSetting: SystemSettings) : {succeed: boolean, parsedParam?: ParamTypeCustomProperties<RequestVerifyPhoneResendAPIParam>, errorParams: (keyof RequestVerifyPhoneResendAPIParam)[]}{
    const paramJoiType = Joi.object({
        Phone: Joi.string().required()
    });
    //try parse using joi
    let parsedResult = paramJoiType.validate(param);
    if(parsedResult.error !== undefined){
        return {
            succeed: false,
            errorParams: getJoiValidationErrorFirstPaths(parsedResult.error) as (keyof RequestVerifyPhoneResendAPIParam)[]
        }
    }else{
        return {
            succeed:true,
            parsedParam: parsedResult.value,
            errorParams: []
        };
    }
    
}

export {parseRequestVerifyPhoneResendAPIParam};

type RequestVerifyPhoneResendAPIReturn = {

}

export type {RequestVerifyPhoneResendAPIReturn};

function parseRequestVerifyPhoneResendAPIReturn(returnData: any, systemSetting: SystemSettings) : RequestVerifyPhoneResendAPIReturn | undefined{
    return {};
}

export {parseRequestVerifyPhoneResendAPIReturn};

type VerifyPhoneAPIReturnPossibleErrors = PDKCredentialNotMatchError<'captcha_info'> | PDKStorageEngineError | PDKUnknownInnerError | PDKSenderServiceError | PDKRequestParamFormatError<keyof RequestVerifyPhoneResendAPIParam>;

export type {VerifyPhoneAPIReturnPossibleErrors};

const RequestVerifyPhoneResendAPI : PDKAPI<RequestVerifyPhoneResendAPIParam,RequestVerifyPhoneResendAPIReturn,VerifyPhoneAPIReturnPossibleErrors> = {
    relativePath: '/vericodes/verifyPhoneResend',
    interactMethod: 'POST',
    parseParams: parseRequestVerifyPhoneResendAPIParam,
    parseReturnData: parseRequestVerifyPhoneResendAPIReturn,
    captchaInfo: {
        requiresCaptcha: true,
        requiresCaptchaToMatchClientID: false,
        requiresCaptchaToMatchMaskID: false,
        requiresCaptchaToMatchPDK: true,
        requiresCaptchaToMatchUID: false
    },
    userPermissionInfo: {
        
    },
    appPermissionInfo: {

    },
    oAuthPermissionInfo: {

    },
    authenticationInfo: {
        requireOAuthToken: false,
        requireUserToken: false,
        verifiesClientSecretIfAuthedByBackend: false
    },
    vericodeInfo: {
        requiresVeriCode: false,
        requiresVeriCodeToMatchClientID: false,
        requiresVeriCodeToMatchMaskID: false,
        requiresVeriCodeToMatchPDK: false,
        requiresVeriCodeToMatchUID: false,
        enablesLongCode: false,
        enablesShortCode: false
    }
}

export {RequestVerifyPhoneResendAPI};