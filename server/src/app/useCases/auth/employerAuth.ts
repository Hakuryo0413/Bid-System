import { employerInterface } from "../../../types/employerInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { employerDbInterface } from "../../repositories/employerDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

export const createAccount = async (
    employer: employerInterface,
    employerRepository: ReturnType<employerDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    if (!employer || employer.username === undefined) {
        throw new AppError("Invalid employer object", HttpStatus.BAD_REQUEST);
    }
    employer.username = employer.username.toLowerCase();
    const isExistingEmail = await employerRepository.getEmployerByUsername(employer.username);
    if (isExistingEmail) {
        throw new AppError("username already exists", HttpStatus.CONFLICT);
    }
    employer.password = await authService.encryptPassword(employer.password ?? "");
    const result = await employerRepository.createEmployer(employer);
    return result;
}

export const loginAction = async (
    usename: string,
    password: string,
    employerRepository: ReturnType<employerDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const employer = await employerRepository.getEmployerByUsername(usename);
    if (!employer) {
        throw new AppError("this account does not exist", HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(
        password,
        employer.password ?? ""
    );
    if (!isPasswordCorrect) {
        throw new AppError("Sorry, incorrect password", HttpStatus.UNAUTHORIZED);
    }
    const payload = employer._id ? employer._id.toString() : '';
    const token = authService.generateToken(payload, 'employer');
    return token;
}