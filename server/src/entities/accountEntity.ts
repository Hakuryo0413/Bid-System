import { accountModel } from "../frameworks/database/mongoDb/models/accountModel";
import { accountInterface } from "../types/accountInterface";

export class accountEntity{
    private model: accountModel;

    constructor(model: accountModel){
        this.model = model;
    }

    public async getAccountById(id: string): Promise<accountInterface | null>{
        const account = await this.model.findById(id);
        return account;
    }

    public async getAccountByEmail(email: string): Promise<accountInterface | null>{
        const account = await this.model.findOne({email: email});
        return account;
    }

    public async getAccountByRole(role: string): Promise<accountInterface[] | null>{
        const accounts = await this.model.find({role: role});
        return accounts;
    }

    public async createAccount(account: accountInterface): Promise<accountInterface>{
        const newAccount = this.model.create(account);
        return newAccount;
    }

    public async updateAccount(
        id: string,
        updates: Partial<accountInterface>
      ): Promise<accountInterface | null> {
        const currentDetails = await this.model.findById(id);
        
        if (currentDetails) {
          Object.assign(currentDetails, updates);
          const updatedAccount = await currentDetails.save();
          return updatedAccount;
        }
    
        return null; 
    }

    public async deleteAccount(id: string): Promise<void>{
        const account = await this.model.findById(id);
        if (!account) throw new Error("account not found");
        await this.model.findByIdAndDelete(id);
    }
    
    public async getAllAccount():Promise<accountInterface[] | null>{
        const allAccount = this.model.find();
        return allAccount;
    }
}