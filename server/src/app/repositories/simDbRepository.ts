import { type } from "os";
import { simRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/simRepositoryMongoDB";
import { simInterface } from "../../types/simInterface";

export const simDbRepository = (
    repository: ReturnType<simRepositoryMongoDB>
) => {
    const getSimById = async (id: string) =>{
        const sim = await repository.getSimById(id);
        return sim;
    }

    const getSimByNumber = async (number: string) =>{
        const sim = await repository.getSimByNumber(number);
        return sim;
    }

    const getSimByProvider = async (provider: string) =>{
        const sim = await repository.getSimByProvider(provider);
        return sim;
    }

    const createSim = async (sim : simInterface) =>{
        const newSim = await repository.createSim(sim);
        return newSim;
    }

    const deleteSim = async (id: string)=>{
        await repository.deleteSim(id);
    }

    const deleteSimByNumber = async (number: string)=>{
        await repository.deleteSimByNumber(number);
    }

    const getAllSim = async() =>{
        const allSims = await repository.getAllSim();
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

export type simDbInterface = typeof simDbRepository;