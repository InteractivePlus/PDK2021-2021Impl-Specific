import Joi from "joi";
import { PDKAPIVeriCodeParam, ParamTypeCustomProperties, PDKVeriCodeRequiredAPI } from "@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI";
import { parseJoiTypeItems } from "@interactiveplus/pdk2021-common/dist/Utilities/JoiCheckFunctions";
import { SystemSettings } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/SystemSetting/SystemSettings";
import { getJoiTypeFromMinMaxRegex } from '@interactiveplus/pdk2021-common/dist/Utilities/JoiTypeUtil';
import { PDKCredentialNotMatchError, PDKRequestParamFormatError, PDKStorageEngineError, PDKUnknownInnerError } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException";

interface VerifyPhoneAPIParam extends PDKAPIVeriCodeParam{
    verification_code: string,
    is_vericode_short_code: true
}

export type {VerifyPhoneAPIParam};

function parseVerifyPhoneAPIParam(param: any, systemSetting: SystemSettings) : {succeed: boolean, parsedParam?: ParamTypeCustomProperties<VerifyPhoneAPIParam>, errorParams: (keyof VerifyPhoneAPIParam)[]}{
    return {
        succeed:true,
        parsedParam: {
            
        },
        errorParams: []
    };
}

export {parseVerifyPhoneAPIParam};

type VerifyPhoneAPIReturn = {
    username: string,
    nickname?: string,
    phone: string
}

export type {VerifyPhoneAPIReturn};

function parseVerifyPhoneAPIReturn(returnData: any, systemSetting: SystemSettings) : VerifyPhoneAPIReturn | undefined{
    const usernameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.usernameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameRegex);
    const PhoneType = Joi.string();
    const nicknameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.nicknameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.nicknameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.nicknameRegex);

    const returnDataJoiType = Joi.object({
        username: usernameType.required(),
        nickname: nicknameType.optional(),
        phone: PhoneType.required()
    });

    return parseJoiTypeItems<VerifyPhoneAPIReturn>(returnData,returnDataJoiType);
}

type VerifyPhoneAPIErrorTypes = PDKCredentialNotMatchError<'verification_code'> | PDKStorageEngineError | PDKUnknownInnerError | PDKRequestParamFormatError<keyof VerifyPhoneAPIParam>;

export type {VerifyPhoneAPIErrorTypes};

const VerifyPhoneAPI : PDKVeriCodeRequiredAPI<VerifyPhoneAPIParam,VerifyPhoneAPIReturn,VerifyPhoneAPIErrorTypes> = {
    relativePath: '/verifyPhoneResult',
    interactMethod: 'GET',
    parseParams: parseVerifyPhoneAPIParam,
    parseReturnData: parseVerifyPhoneAPIReturn,
    captchaInfo: {
        requiresCaptcha: false,
        requiresCaptchaToMatchUID: false,
        requiresCaptchaToMatchPDK: false,
        requiresCaptchaToMatchClientID: false,
        requiresCaptchaToMatchMaskID: false
    },
    userPermissionInfo:{
        
    },
    appPermissionInfo: {

    },
    oAuthPermissionInfo:{

    },
    authenticationInfo:{
        requireOAuthToken: false,
        requireUserToken: false,
        verifiesClientSecretIfAuthedByBackend: false
    },
    vericodeInfo:{
        requiresVeriCode: true,
        requiresVeriCodeToMatchClientID: false,
        requiresVeriCodeToMatchMaskID: false,
        requiresVeriCodeToMatchPDK: false,
        requiresVeriCodeToMatchUID: false,
        enablesLongCode: false,
        enablesShortCode: true
    }
};

export {VerifyPhoneAPI};