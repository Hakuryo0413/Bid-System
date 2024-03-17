import { type } from "os";
import { employerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import { employerInterface } from "../../types/employerInterface";

export const employerDbRepository = (
    repository: ReturnType<employerRepositoryMongoDB>
) => {
    const getEmployerByUsername = async (username: string) => {
        const employer = await repository.getEmployerByUsername(username);
        return employer;
    }

    const getEmployerById = async (id: string) => {
        const employer = await repository.getEmployerById(id);
        return employer;
    }

    const getEmployerByTransationID = async (transactionID: string) => {
        const employers = await repository.getEmployerByTransationID(transactionID);
        return employers;
    }

    const getEmployerByConsolidationID = async (consolidationID: string) => {
        const employers = await repository.getEmployerByConsolidationID(consolidationID);
        return employers;
    }
    const getAllEmployers = async () => {
        const employers = await repository.getAllEmployers();
        return employers;
    }
    const createEmployer = async (employer: employerInterface) => {
        const newEmployer = await repository.createEmployer(employer);
        return newEmployer;
    }

    const deleteEmployer = async (username: string) => {
        await repository.deleteEmployer(username);
    }
    const deleteEmployerById = async (id: string) => {
        await repository.deleteEmployerById(id);
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

export type employerDbInterface = typeof employerDbRepository;