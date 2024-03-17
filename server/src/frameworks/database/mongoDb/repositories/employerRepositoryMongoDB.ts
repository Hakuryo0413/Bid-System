import { type } from "os";
import { EmployerEntity } from "../../../../entities/EmployerEntity";
import { employerInterface } from "../../../../types/employerInterface";
import { EmployerModel } from "../models/employerModel";

export const employerRepositoryMongoDB = (model: EmployerModel) => {
    const employerEntity = new EmployerEntity(model);
    const getEmployerByUsername = async (username: string) => {
        const employer = await employerEntity.getEmployerByUsername(username);
        return employer;
    }

    const getEmployerById = async (id: string) => {
        const employer = await employerEntity.getEmployerById(id);
        return employer;
    }

    const getEmployerByTransationID = async (transactionID: string) => {
        const employers = await employerEntity.getEmployerByTransationID(transactionID);
        return employers;
    }

    const getEmployerByConsolidationID = async (consolidationID: string) => {
        const employers = await employerEntity.getEmployerByConsolidationID(consolidationID);
        return employers;
    }
    const getAllEmployers = async () => {
        const employers = await employerEntity.getAllEmployers();
        return employers;
    }
    const createEmployer = async (employer: employerInterface) => {
        const newEmployer = await employerEntity.createEmployer(employer);
        return newEmployer;
    }

    const deleteEmployer = async (username: string) => {
        await employerEntity.deleteEmployer(username);
    }
    const deleteEmployerById = async (id: string) => {
        await employerEntity.deleteEmployerById(id);
    }

    return {
        getEmployerByUsername,
        getEmployerById,
        getEmployerByTransationID,
        getEmployerByConsolidationID,
        getAllEmployers,
        createEmployer,
        deleteEmployer,
        deleteEmployerById
    }
}

export type employerRepositoryMongoDB = typeof employerRepositoryMongoDB;