import { simEntity } from "../../../../entities/simEntity";
import { simModel } from "../models/simModel";
import { simInterface } from "../../../../types/simInterface";

export const simRepositoryMongoDB = (model: simModel) =>{
    const SimEntity = new simEntity(model);
    
    const getSimById = async (id: string) =>{
        const sim = await SimEntity.getSimById(id);
        return sim;
    }

    const getSimByNumber = async (number: string) =>{
        const sim = await SimEntity.getSimByNumber(number);
        return sim;
    }

    const getSimByProvider = async (provider: string) =>{
        const sim = await SimEntity.getSimByProvider(provider);
        return sim;
    }

    const createSim = async (sim : simInterface) =>{
        const newSim = await SimEntity.createSim(sim);
        return newSim;
    }

    const deleteSim = async (id: string)=>{
        await SimEntity.deleteSim(id);
    }

    const deleteSimByNumber = async (number: string)=>{
        await SimEntity.deleteSimByNumber(number);
    }

    const getAllSim = async() =>{
        const allSims = await SimEntity.getAllSim();
        return allSims;
    }

    return{
        getSimById,
        getSimByNumber,
        getSimByProvider,
        createSim,
        deleteSim,
        deleteSimByNumber,
        getAllSim
    }
}

export type simRepositoryMongoDB = typeof simRepositoryMongoDB;