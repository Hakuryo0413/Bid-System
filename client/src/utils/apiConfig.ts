import configKeys from "./config";

const apiConfig = {
    consolidationAddress: `${configKeys.API_URL}consolidation/consolidation-data`,
    getConsolidation: `${configKeys.API_URL}consolidation/consolidation-data/cons-id`,
    allConsolidations: `${configKeys.API_URL}consolidation/all-consolidations`,
    updateConsolidation: `${configKeys.API_URL}consolidation/update-consolidation`,

    employerUsername: `${configKeys.API_URL}employer/employer-data/username`,
    getEmployer: `${configKeys.API_URL}employer/employer-data/emp-id`,
    employerTrans: `${configKeys.API_URL}employer/employer-data/transaction`,
    employerCons: `${configKeys.API_URL}employer/employer-data/consolidation`,
    allEmployers: `${configKeys.API_URL}employer/all-employers`,
    deleteEmployer: `${configKeys.API_URL}employer/delete-employer`,
    deleteEmployerId: `${configKeys.API_URL}employer/delete-employer/:id`,

    createAccount: `${configKeys.API_URL}employer-auth/create`,
    login: `${configKeys.API_URL}employer-auth/login`,

    createOrder: `${configKeys.API_URL}order/create`,
    deleteOrder: `${configKeys.API_URL}order/delete`,
    orderCode: `${configKeys.API_URL}order/find-order`,
    orderConsId: `${configKeys.API_URL}order/find-order/consolidation-id`,
    orderTransId: `${configKeys.API_URL}order/find-order/transaction-id`,
    orderDeliverPersonId: `${configKeys.API_URL}order/find-order/deliveryPerson-id`,
    allOrders: `${configKeys.API_URL}order/all-orders`,
    filterOrder: `${configKeys.API_URL}order/filter-orders`,
    updaterOrder: `${configKeys.API_URL}order/update-order`,

    transactionAddress: `${configKeys.API_URL}transaction/transaction-data`,
    transactionCons: `${configKeys.API_URL}transaction/transaction-data-cons`,
    getTransaction: `${configKeys.API_URL}transaction/transaction-data/:id`,
    allTransactions: `${configKeys.API_URL}transaction/all-transactions`,
    updateTransaction: `${configKeys.API_URL}transaction/update-transaction`,

}

export default apiConfig;