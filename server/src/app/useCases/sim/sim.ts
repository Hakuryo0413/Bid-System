import { simInterface } from "../../../types/simInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { simDbInterface } from "../../repositories/simDbRepository";

export const findSimByNumber = async (
    number: string,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const result = await simRepository.getSimByNumber(number);
        if (!result) {
            throw new AppError("sim not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find sim")
    }
}

export const findSimByProvider = async (
    provider: string,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const results = await simRepository.getSimByProvider(provider);
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find sim")
    }
}

export const findSimById = async (
    id: string,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const result = await simRepository.getSimById(id);
        if (!result) {
            throw new AppError("sim not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get sim")
    }
}

export const findAllSims = async (
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const results = await simRepository.getAllSim();
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get sim")
    }
}

export const createSim = (
    sim: simInterface,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const newSim = simRepository.createSim(sim);
        if (!newSim) {
            throw new AppError('created sim fail', HttpStatus.UNAUTHORIZED)
        }
        return newSim;
    } catch (error: any) {
        throw new Error(`error while create the sim ${error.message}`);
    }
}


export const updatedSim = (
    id: string,
    updates: Partial<simInterface>,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        const sim = simRepository.updateSim(id, updates);
        if (!sim) {
            throw new AppError('No sim updates', HttpStatus.UNAUTHORIZED)
        }
        return sim;
    } catch (error: any) {
        throw new Error(`error while updating the sim ${error.message}`);
    }
}

export const deleteSim = async (
    id: string,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        await simRepository.deleteSim(id);
    } catch (error) {
        throw new Error("failed to delete the sim");
    }
};

export const deleteTheSimByNumber = async (
    number: string,
    simRepository: ReturnType<simDbInterface>
) => {
    try {
        await simRepository.deleteSimByNumber(number);
    } catch (error) {
        throw new Error("failed to delete the sim");
    }
};