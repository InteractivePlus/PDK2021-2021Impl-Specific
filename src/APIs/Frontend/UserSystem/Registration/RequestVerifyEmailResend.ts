import Joi from "joi";
import { PDKCredentialNotMatchError, PDKRequestParamFormatError, PDKSenderServiceError, PDKStorageEngineError, PDKUnknownInnerError } from "../../../../../../pdk2021-common/dist/AbstractDataTypes/Error/PDKException";
import { SystemSettings } from "../../../../../../pdk2021-common/dist/AbstractDataTypes/SystemSetting/SystemSettings";
import { ParamTypeCustomProperties, PDKAPI, PDKAPICaptchaParam } from "../../../../../../pdk2021-common/dist/ExchangeDataTypes/PDKAPI";
import { getJoiValidationErrorFirstPaths, parseJoiTypeItems } from "../../../../../../pdk2021-common/dist/Utilities/JoiCheckFunctions";

interface RequestVerifyEmailResendAPIParam extends PDKAPICaptchaParam{
    email: string
};

export type {RequestVerifyEmailResendAPIParam};

function parseRequestVerifyEmailResendAPIParam(param: any, systemSetting: SystemSettings) : {succeed: boolean, parsedParam?: ParamTypeCustomProperties<RequestVerifyEmailResendAPIParam>, errorParams: (keyof RequestVerifyEmailResendAPIParam)[]}{
    const paramJoiType = Joi.object({
        email: Joi.string().email().required()
    });
    //try parse using joi
    let parsedResult = paramJoiType.validate(param);
    if(parsedResult.error !== undefined){
        return {
            succeed: false,
            errorParams: getJoiValidationErrorFirstPaths(parsedResult.error) as (keyof RequestVerifyEmailResendAPIParam)[]
        }
    }else{
        return {
            succeed:true,
            parsedParam: parsedResult.value,
            errorParams: []
        };
    }
    
}

export {parseRequestVerifyEmailResendAPIParam};

type RequestVerifyEmailResendAPIReturn = {

}

export type {RequestVerifyEmailResendAPIReturn};

function parseRequestVerifyEmailResendAPIReturn(returnData: any, systemSetting: SystemSettings) : RequestVerifyEmailResendAPIReturn | undefined{
    return {};
}

export {parseRequestVerifyEmailResendAPIReturn};

type VerifyEmailAPIReturnPossibleErrors = PDKCredentialNotMatchError<'captcha_info'> | PDKStorageEngineError | PDKUnknownInnerError | PDKSenderServiceError | PDKRequestParamFormatError<keyof RequestVerifyEmailResendAPIParam>;

export type {VerifyEmailAPIReturnPossibleErrors};

const RequestVerifyEmailResendAPI : PDKAPI<RequestVerifyEmailResendAPIParam,RequestVerifyEmailResendAPIReturn,VerifyEmailAPIReturnPossibleErrors> = {
    relativePath: '/vericodes/verifyEmailResend',
    interactMethod: 'POST',
    parseParams: parseRequestVerifyEmailResendAPIParam,
    parseReturnData: parseRequestVerifyEmailResendAPIReturn,
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

export {RequestVerifyEmailResendAPI};