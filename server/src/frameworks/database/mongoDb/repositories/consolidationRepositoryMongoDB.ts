import { ConsolidationEntity } from "../../../../entities/ConsolidationEntity";
import { ConsolidationModel } from "../models/consolidationModel";
import { consolidationInterface } from "../../../../types/consolidationInterface";

export const consolidationRepositoryMongoDB = (model: ConsolidationModel) => {
    const consolidationEntity = new ConsolidationEntity(model);

    

    // get consolidation by address
    const getConsolidationByAddress = async (address: string) => {
        const consolidation = await consolidationEntity.getConsolidationByAddress(address);
        return consolidation;
    }

    //get consolidation by id
    const getConsolidationByID = async (id: string) => {
        const consolidation = await consolidationEntity.getConsolidationByID(id);
        return consolidation;
    }

    // get all consolidations
    const getAllConsolidations = async () => {
        const consolidations = await consolidationEntity.getAllConsolidations();
        return consolidations;
    }

    const updateConsolidation = async (consolidationID: string, updates: Partial<consolidationInterface>) =>{
        const consolidation = await consolidationEntity.updateConsolidation(consolidationID,updates);
        return consolidation;
    }

    return {
        getConsolidationByAddress,
        getConsolidationByID,
        getAllConsolidations,
        updateConsolidation
    }
}

export type consolidationRepositoryMongoDB = typeof consolidationRepositoryMongoDB;