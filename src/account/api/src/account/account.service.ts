import { Injectable } from "@nestjs/common";
import { Account } from "./account.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: string) {
    return this.accountRepository.findOne({ where: { id } });
  }

  create(email: string, password: string) {
    return this.accountRepository.save({
      email,
      password,
      deletedAt: null
    });
  }

  findByEmail(email: string) {
    return this.accountRepository.findOne({ where: { email } });
  }
}
