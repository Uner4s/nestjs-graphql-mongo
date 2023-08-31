import { Injectable } from '@nestjs/common';
import { CatsModel } from './entities/cats.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { CreateCatArgs } from './dto/createCat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(CatsModel)
    private readonly catsModel: ReturnModelType<typeof CatsModel>,
  ) {}

  async findAll(): Promise<CatsModel[]> {
    return await this.catsModel.find().exec();
  }

  async create(params: CreateCatArgs): Promise<CatsModel> {
    const newCat = await this.catsModel.create({ ...params });

    return newCat.save();
  }
}
