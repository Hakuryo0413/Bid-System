import { historyModel } from "../frameworks/database/mongoDb/models/historyModel";
import { historyInterface } from "../types/historyInterface";

export class historyEntity{
    private model: historyModel;
    
    constructor(model: historyModel){
        this.model = model;
    }

    public async getHistoryById(id: string):Promise<historyInterface | null>{
        const history: any = this.model.findById(id);
        return history;
    }

    public async getHistoryByEmail(email: string):Promise<historyInterface[] | null>{
        const histories: any = this.model.find({email: email});
        return histories;
    }

    public async createHistory(history: historyInterface):Promise<historyInterface | null>{
        const newHistory: any = this.model.create(history);
        return newHistory;
    }

    public async updateHistory(
        id: string,
        updates: Partial<historyInterface>
      ): Promise<historyInterface | null> {
        const currentDetails = await this.model.findById(id);
        
        if (currentDetails) {
          Object.assign(currentDetails, updates);
          const updatedHistory: any = await currentDetails.save();
          return updatedHistory;
        }
    
        return null; 
    }

    public async getAllHistory():Promise<historyInterface[] | null>{
        const allHistories: any = this.model.find();
        return allHistories;
    }
}