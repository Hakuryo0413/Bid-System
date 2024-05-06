import configKeys from "./config";
import { all } from 'axios';

const apiConfig = {

    accountRole: `${configKeys.API_URL}account/account-data/role`,
    accountEmail: `${configKeys.API_URL}account/account-data/email`,
    accountId: `${configKeys.API_URL}account/account-data/id`,
    accountById: `${configKeys.API_URL}account/id`,
    allAccounts: `${configKeys.API_URL}account/all-accounts`,
    deleteAccountId: `${configKeys.API_URL}account/delete-account`,
    updateAccount: `${configKeys.API_URL}account/update-account`,

    createAccount: `${configKeys.API_URL}account-auth/create`,
    login: `${configKeys.API_URL}account-auth/login`,

    historyAccount: `${configKeys.API_URL}history/history-data/email`,
    historyId: `${configKeys.API_URL}history/history-data/id`,
    allHistory: `${configKeys.API_URL}history/all-historys`,
    updateHistory: `${configKeys.API_URL}history/update-history`,
    createHistory: `${configKeys.API_URL}history/create`,

    notificationAccount: `${configKeys.API_URL}notification/notification-data/email`,
    updateNotification: `${configKeys.API_URL}notification/update-notification`,
    createNotification: `${configKeys.API_URL}notification/create`,
    deleteNotification: `${configKeys.API_URL}notification/delete`,
    allNotifications: `${configKeys.API_URL}notification/all-notifications`,

    roomAccount: `${configKeys.API_URL}room/room-data/email`,
    roomCode: `${configKeys.API_URL}room/room-data/code`,
    roomProvider: `${configKeys.API_URL}room/room-data/provider`,
    allRooms: `${configKeys.API_URL}room/all-rooms`,
    ongogingRooms: `${configKeys.API_URL}room/ongoging-rooms`,
    updateRoom: `${configKeys.API_URL}room/update-room`,
    createRoom: `${configKeys.API_URL}room/create`,
    deleteRoom: `${configKeys.API_URL}room/delete`,

    simProvider: `${configKeys.API_URL}sim/sim-data/email`,
    simId: `${configKeys.API_URL}sim/sim-data/id`,
    simNumber: `${configKeys.API_URL}sim/sim-data/number`,
    allSims: `${configKeys.API_URL}sim/all-sims`,
    updateSim: `${configKeys.API_URL}sim/update-sim`,
    createSim: `${configKeys.API_URL}sim/create`,
    deleteRoomId: `${configKeys.API_URL}sim/delete/id`,
    deleteRoomNumber: `${configKeys.API_URL}sim/delete/number`,

    getConversations: `${configKeys.API_URL}messenger-conversation`,
    getMessages: `${configKeys.API_URL}messenger-message`,
}

export default apiConfig;