import { employerInterface } from "../../../types/employerInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { employerDbInterface } from "../../repositories/employerDbRepository";

export const findEmployerByUsername = async (
    username: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        const result = await employerRepository.getEmployerByUsername(username);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findEmployerById = async (
    id: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        const result = await employerRepository.getEmployerById(id);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findEmployerByTransation = async (
    transaction: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        const result = await employerRepository.getEmployerByTransationID(transaction);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findEmployerByConsolidation = async (
    consolidation: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        const result = await employerRepository.getEmployerByConsolidationID(consolidation);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findAllEmployers = async (
    consolidationRepository: ReturnType<employerDbInterface>
) => {
    try {
        const result = await consolidationRepository.getAllEmployers();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("failed to get employers")
    }
}


export const deleteEmployer = async (
    username: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        await employerRepository.deleteEmployer(username);
    } catch (error) {
        console.log(error)
        throw new Error("failed to delete the employer");
    }
}

export const deleteEmployerById = async (
    id: string,
    employerRepository: ReturnType<employerDbInterface>
) => {
    try {
        await employerRepository.deleteEmployer(id);
    } catch (error) {
        console.log(error)
        throw new Error("failed to delete the employer");
    }
}