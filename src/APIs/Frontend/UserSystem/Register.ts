import Joi from "joi";
import { CommunicationMethod, CommunicationMethods } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Communication/CommunicationMethod";
import { phoneNumberRegexExpr, UserEntityUID, UserEntityUIDJoiType } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/User/UserEntity";
import { PDKCaptchaRequiredAPI } from "@interactiveplus/pdk2021-common/dist/ExchangeDataTypes/PDKAPI";
import { getJoiValidationErrorFirstPaths, parseJoiTypeItems } from "@interactiveplus/pdk2021-common/dist/Utilities/JoiCheckFunctions";
import { SystemSettings } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/SystemSetting/SystemSettings";
import { getJoiTypeFromMinMaxRegex } from '@interactiveplus/pdk2021-common/dist/Utilities/JoiTypeUtil';
import { PDKItemAlreadyExistError, PDKRequestParamFormatError, PDKStorageEngineError, PDKUnknownInnerError } from "@interactiveplus/pdk2021-common/dist/AbstractDataTypes/Error/PDKException";

type RegisterAPIParam = {
    username: string,
    password: string,
    email: string,
    phone?: string,
    captcha_info: any
} | {
    username: string,
    password: string,
    phone: string,
    email?: string,
    captcha_info: any
};

export type {RegisterAPIParam};

function parseRegisterAPIParam(param: any, systemSetting: SystemSettings)   : {succeed: boolean, parsedParam?: RegisterAPIParam, errorParams: (keyof RegisterAPIParam)[]}{
    const usernameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.usernameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameRegex);
    const passwordType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.passwordMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.passwordMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.passwordRegex);
    const emailType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.emailMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailRegex).email();
    const phoneType = Joi.string().regex(phoneNumberRegexExpr);


    const registerParamJoiType = Joi.alternatives(Joi.object({
        username: usernameType.required(),
        password: passwordType.required(),
        email: emailType.required(),
        phone: phoneType.optional(),
        captcha_info: Joi.any().required()
    }),Joi.object({
        username: usernameType.required(),
        password: passwordType.required(),
        email: emailType.optional(),
        phone: phoneType.required(),
        captcha_info: Joi.any().required()
    }));
    let validateResult = registerParamJoiType.validate(param);
    if(validateResult.error !== undefined){
        let errParams = getJoiValidationErrorFirstPaths(validateResult.error);
        return {
            succeed:false,
            parsedParam: undefined,
            errorParams: errParams as (keyof RegisterAPIParam)[]
        };
    }
    return {succeed:true,parsedParam:validateResult.value,errorParams:[]};
}

export {parseRegisterAPIParam};

type RegisterAPIReturn = {
    uid: UserEntityUID,
    username: string,
    email: string,
    phone?: string,
    verification_sent_methods: CommunicationMethod[]
} |  {
    uid: UserEntityUID,
    username: string,
    email?: string,
    phone: string,
    verification_sent_methods: CommunicationMethod[]
}

export type {RegisterAPIReturn};

function parseRegisterAPIReturn(returnData: any, systemSetting: SystemSettings) : RegisterAPIReturn | undefined{
    const usernameType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.usernameMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.usernameRegex);
    const emailType = getJoiTypeFromMinMaxRegex(systemSetting.userSystemSetting.userEntityFormatSetting.emailMinLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailMaxLen,systemSetting.userSystemSetting.userEntityFormatSetting.emailRegex).email();
    const phoneType = Joi.string().regex(phoneNumberRegexExpr);

    
    const returnDataJoiType = Joi.alternatives(Joi.object({
        uid: UserEntityUIDJoiType.required(),
        username: usernameType.required(),
        email: emailType.required(),
        phone: phoneType.optional(),
        verification_sent_methods: Joi.array().valid(...CommunicationMethods).required()
    }),Joi.object({
        uid: UserEntityUIDJoiType.required(),
        username: usernameType.required(),
        email: emailType.optional(),
        phone: phoneType.required(),
        verification_sent_methods: Joi.array().valid(...CommunicationMethods).required()
    }));

    return parseJoiTypeItems<RegisterAPIReturn>(returnData,returnDataJoiType);
}

type RegisterAPIErrorTypes = PDKItemAlreadyExistError<'username' | 'email' | 'phone'> | PDKStorageEngineError | PDKUnknownInnerError | PDKRequestParamFormatError<keyof RegisterAPIParam>;

export type {RegisterAPIErrorTypes};

const RegisterAPI : PDKCaptchaRequiredAPI<RegisterAPIParam,RegisterAPIReturn,RegisterAPIErrorTypes> = {
    relativePath: '/user',
    interactMethod: 'POST',
    parseParams: parseRegisterAPIParam,
    parseReturnData: parseRegisterAPIReturn,
    captchaInfo: {
        requiresCaptcha: true,
        requiresCaptchaToMatchUID: false,
        requiresCaptchaToMatchPDK: true,
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
    }
};

export {RegisterAPI};