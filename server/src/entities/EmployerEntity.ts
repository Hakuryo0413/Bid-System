import { EmployerModel } from "../frameworks/database/mongoDb/models/employerModel";
import { employerInterface } from "../types/employerInterface";

export class EmployerEntity {
    private model: EmployerModel;

    constructor(model: EmployerModel) {
        this.model = model;
    }
    //search
    public async getEmployerByName(name: string):Promise<employerInterface[] |null>{
        const employer = await this.model.find({name: name});
        return employer;
    }

    public async getEmployerByUsername(username: string): Promise<employerInterface | null> {
        const employer = await this.model.findOne({ username: username });
        return employer;
    }

    public async getEmployerById(id: string): Promise<employerInterface | null> {
        const employer: any = await this.model.findById(id);
        return employer;
    }

    public async getEmployerByTransationID(transactionID: string): Promise<employerInterface[] | null> {
        const employers: any = await this.model.find({ transaction: transactionID });
        return employers;
    }

    public async getEmployerByConsolidationID(consolidationID: string): Promise<employerInterface[] | null> {
        const employers: any = await this.model.find({ consolidation: consolidationID });
        return employers;
    }


    //create
    public async createEmployer(employer: employerInterface): Promise<employerInterface> {
        const newEmployer = await this.model.create(employer);
        return newEmployer;
    }

    //delete
    public async deleteEmployer(username: string): Promise<void> {
        const employer = await this.model.findOne({ username: username });
        if (!employer) throw new Error("employer not found");
        await this.model.findOneAndDelete({ username: username });
    }

    public async deleteEmployerById(employerId: string): Promise<void> {
        const employer = await this.model.findById(employerId);
        if (!employer) throw new Error("employer not found");
        await this.model.findByIdAndDelete(employerId);
    }

    public async getAllEmployers(): Promise<employerInterface[]> {
        const allEmployers = await this.model.find();
        return allEmployers;
    }


}