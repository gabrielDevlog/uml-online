import { Injectable } from "@nestjs/common";
import { Resource } from "./resource.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourceVisibility } from "account-shared/dtos/resource-visibility.enum";

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>
  ) {}

  find(where?: Partial<Resource>) {
    return this.resourceRepository.find({ where });
  }

  findOne(where: Partial<Resource>) {
    return this.resourceRepository.findOne({ where });
  }

  create(
    accountId: string,
    resourceURI: string,
    visibility: ResourceVisibility
  ) {
    return this.resourceRepository.save({
      UMLResourceURI: resourceURI,
      UMLAccountId: accountId,
      visibility
    });
  }
}
