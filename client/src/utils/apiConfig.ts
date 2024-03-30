import configKeys from "./config";

const apiConfig = {

    accountRole: `${configKeys.API_URL}account/account-data/role`,
    accountEmail: `${configKeys.API_URL}account/account-data/email`,
    accountId: `${configKeys.API_URL}account/account-data/id`,
    allAccounts: `${configKeys.API_URL}account/all-accounts`,
    deleteAccountId: `${configKeys.API_URL}account/delete-account`,
    updateAccount: `${configKeys.API_URL}account/update-account`,

    createAccount: `${configKeys.API_URL}account-auth/create`,
    login: `${configKeys.API_URL}account-auth/login`,

}

export default apiConfig;