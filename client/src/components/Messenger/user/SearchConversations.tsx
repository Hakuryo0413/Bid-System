import React, { useEffect, useState } from 'react';
import { ConversationInterface } from '../../../types/messengerInterface';
import { accountData, allAccounts } from '../../../features/axios/api/account/AccountsDetail';
import { userInterface } from '../../../types/UserInterface';
import { get, set } from 'lodash';
import { createConversation } from '../../../features/axios/api/messenger/conversation';



function SearchConversation() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<userInterface[]>([]);
    const [selectedUser, setSelectedUser] = useState<userInterface>({} as userInterface);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const [accountDetails, setAccountDetails] = useState<userInterface>();
    const getAccountDetails = async () => {
        const data = await accountData();
        setAccountDetails(data);
    };
    const getAllAccountList = async () => {
        try {
            getAccountDetails();
            return await allAccounts();

        } catch (error) {
            console.error("Lỗi xảy ra khi lấy danh sách tài khoản:", error);
        }
    }

    const handleSearch = async () => {
        let allAccountList: userInterface[] = await getAllAccountList();
        if (searchTerm) {
            allAccountList = allAccountList.filter((account) => {
                return (
                    account.name?.toLowerCase().includes(searchTerm?.toLowerCase())
                );
            });
        }
        setSearchResults(allAccountList);
        setIsResultsVisible(true);
        console.log(allAccountList);
    }

    const setSelectedUserAccount = (account: userInterface) => {
        setSelectedUser(account);
        setIsResultsVisible(false);
        console.log("Account", account);
        console.log(account._id, "|", accountDetails?._id);
        if (accountDetails?._id && account._id) {
            createConversation(accountDetails?._id, account._id);
        }
        // This effect runs whenever selectedUser or currentUser changes
    }

    return (
        <div className=" items-center justify-between w-full relative">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <input
                        type="text"
                        placeholder="Search for users..."
                        value={searchTerm}
                        className="w-4/5 h-10 p-2 rounded-lg focus:outline-none bg-transparent border-border border rounded-lg font-base text-gray-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="w-1/6 h-10 align-middle select-none font-sans text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-xl font-medium text-sm">
                        Search

                    </button>
                </div>
            </div>
            <div className={`w-4/5 absolute bg-white rounded-lg z-10 ${isResultsVisible ? '' : 'invisible'}`}>                {searchResults.map((account, index) => (
                <div
                    key={index}

                    className='hover:text-green-500 cursor-pointer p-2 text-black'
                    onClick={() => setSelectedUserAccount(account)}
                >
                    <p>{account.name}</p>
                </div>
            ))}
            </div>
        </div>
    );

}
export default SearchConversation;