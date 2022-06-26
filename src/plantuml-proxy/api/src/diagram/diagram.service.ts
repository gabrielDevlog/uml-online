import { Injectable } from "@nestjs/common";
import { Diagram } from "./diagram.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DiagramService {
  constructor(
    @InjectRepository(Diagram)
    private readonly diagramRepository: Repository<Diagram>
  ) {}

  find(accountId: string) {
    return this.diagramRepository.find({ where: { UMLAccountId: accountId } });
  }

  findOne(id: string) {
    return this.diagramRepository.findOne({ where: { id } });
  }

  create(accountId: string, title: string, data: string) {
    return this.diagramRepository.save({
      title,
      data,
      UMLAccountId: accountId
    });
  }

  async updateOne(diagram: Diagram) {
    return this.diagramRepository.save(diagram);
  }
}
