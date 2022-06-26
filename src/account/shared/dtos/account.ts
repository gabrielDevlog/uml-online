import { IsString, IsNotEmpty, IsEmail } from "class-validator";

/**
 * An account public representation
 */
export interface AccountDTO {
  id: string;
  email: string;
}

/**
 * Data needed to create an account (i.e signup)
 */
export class AccountCreateDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * Data needed to login
 */
export class AccountLoginDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
