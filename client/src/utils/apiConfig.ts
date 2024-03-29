import configKeys from "./config";

const apiConfig = {

    accountRole: `${configKeys.API_URL}account/account-data/:email`,
    accountEmail: `${configKeys.API_URL}account/account-data/:username`,
    accountId: `${configKeys.API_URL}account/account-data/:id`,
    allAccounts: `${configKeys.API_URL}account/all-accounts`,
    deleteAccountId: `${configKeys.API_URL}account/delete-account/:id`,
    updateAccount: `${configKeys.API_URL}account/update-account/:id`,

    createAccount: `${configKeys.API_URL}account-auth/create`,
    login: `${configKeys.API_URL}account-auth/login`,

}

export default apiConfig;