import Joi from "joi";
import { PDKAPIVeriCodeParam, ParamTypeCustomProperties, PDKVeriCodeRequiredAPI } from "@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI";
import { parseJoiTypeItems } from "@interactiveplus/pdk2021-common/dist/Utilities/JoiCheckFunctions";
import { SystemSettings } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/SystemSetting/SystemSettings";
import { getJoiTypeFromMinMaxRegex } from '@interactiveplus/pdk2021-common/dist/Utilities/JoiTypeUtil';
import { PDKCredentialNotMatchError, PDKRequestParamFormatError, PDKStorageEngineError, PDKUnknownInnerError } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException";

interface VerifyEmailAPIParam extends PDKAPIVeriCodeParam{
    verification_code: string,
    is_vericode_short_code: false
}

export type {VerifyEmailAPIParam};

function parseVerifyEmailAPIParam(param: any, systemSetting: SystemSettings) : {succeed: boolean, parsedParam?: ParamTypeCustomProperties<VerifyEmailAPIParam>, errorParams: (keyof VerifyEmailAPIParam)[]}{
    return {
        succeed:true,
        parsedParam: {
            
        },
        errorParams: []
    };
}

export {parseVerifyEmailAPIParam};

type VerifyEmailAPIReturn = {
    username: string,
    nickname?: string,
    email: string
}

export type {VerifyEmailAPIReturn};

function parseVerifyEmailAPIReturn(returnData: any, systemSetting: SystemSettings) : VerifyEmailAPIReturn | undefined{
    const usernameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.usernameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameRegex);
    const emailType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.emailMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailRegex).email();
    const nicknameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.nicknameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.nicknameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.nicknameRegex);

    
    const returnDataJoiType = Joi.object({
        username: usernameType.required(),
        nickname: nicknameType.optional(),
        email: emailType.required()
    });

    return parseJoiTypeItems<VerifyEmailAPIReturn>(returnData,returnDataJoiType);
}

type VerifyEmailAPIErrorTypes = PDKCredentialNotMatchError<'verification_code'> | PDKStorageEngineError | PDKUnknownInnerError | PDKRequestParamFormatError<keyof VerifyEmailAPIParam>;

export type {VerifyEmailAPIErrorTypes};

const VerifyEmailAPI : PDKVeriCodeRequiredAPI<VerifyEmailAPIParam,VerifyEmailAPIReturn,VerifyEmailAPIErrorTypes> = {
    relativePath: '/verifyEmailResult',
    interactMethod: 'GET',
    parseParams: parseVerifyEmailAPIParam,
    parseReturnData: parseVerifyEmailAPIReturn,
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
        enablesLongCode: true,
        enablesShortCode: false
    }
};

export {VerifyEmailAPI};