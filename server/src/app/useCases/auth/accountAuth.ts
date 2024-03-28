import { AuthService } from "../../../frameworks/services/authService";
import { accountInterface } from "../../../types/accountInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { accountDbInterface } from "../../repositories/accountDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

export const createAccount = async (
    account: accountInterface,
    accountRepository: ReturnType<accountDbInterface>,
    authService: ReturnType<AuthService>
) =>{
    if (!account || account.email === undefined){
        throw new AppError("Invalid account object",HttpStatus.BAD_REQUEST);
    }
    const isExistingEmail = await accountRepository.getAccountByEmail(account.email);
    if(isExistingEmail){
        throw new AppError("email is already used", HttpStatus.CONFLICT);
    }
    account.password = await authService.encryptPassword(account.password ?? "");
    const result = await accountRepository.createAccount(account);
    return result;
}

export const loginAction = async(
    email: string,
    password: string,
    accountRepository: ReturnType<accountDbInterface>,
    authService: ReturnType<AuthServiceInterface>
)=>{
    const account = await accountRepository.getAccountByEmail(email);
    if(!account){
        throw new AppError("this account does not exist", HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(
        password,
        account.password ?? ""
    )
    if(!isPasswordCorrect){
        throw new AppError("Sorry, incorrect password", HttpStatus.UNAUTHORIZED);
    }
    const payload = account._id ? account._id.toString() : '';
    const token = authService.generateToken(payload,'account');
    return token;
}