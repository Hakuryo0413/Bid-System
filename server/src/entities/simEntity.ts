import { simModel } from "../frameworks/database/mongoDb/models/simModel";
import { simInterface } from "../types/simInterface";

export class simEntity{
    private model: simModel;

    constructor(model: simModel){
        this.model = model;
    }

    public async getSimById(id: string): Promise<simInterface| null>{
        const sim: any = await this.model.findById(id);
        return sim;
    }

    public async getSimByNumber(number: string): Promise<simInterface | null>{
        const sim: any = await this.model.findOne({number: number});
        return sim;
    }

    public async getSimByProvider(provider: string): Promise<simInterface[] | null>{
        const sim: any = await this.model.find({provider: provider});
        return sim;
    }
    public async createSim(sim: simInterface): Promise<simInterface |null>{
        const newSim: any = await this.model.create(sim);
        return newSim;
    }

    public async deleteSim(id: string): Promise<void> {
        const sim = await this.model.findById(id);
        if (!sim) throw new Error("sim not found");
        await this.model.findByIdAndDelete(id);
    }

    public async deleteSimByNumber(number: string): Promise<void> {
        const sim = await this.model.findOne({number: number});
        if (!sim) throw new Error("sim not found");
        let id = sim.number;
        await this.model.findByIdAndDelete(id);
    }

    public async getAllSim(): Promise<simInterface[] | null>{
        const allSim: any = await this.model.find();
        return allSim;
    }

    public async updateSim(
        id: string,
        updates: Partial<simInterface>
      ): Promise<simInterface | null> {
        const currentDetails = await this.model.findById(id);
    
        if (currentDetails) {
          Object.assign(currentDetails, updates);
          const updatedSim: any = await currentDetails.save();
          return updatedSim;
        }
    
        return null;
      }
}