import { Logger, NotFoundException } from '@nestjs/common';
import { Model, QueryFilter, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON();
  }

  async findOne(queryFilter: QueryFilter<TDocument>): Promise<TDocument> {
    // Find a document matching the filter query and return it as a plain object
    const document = await this.model
      .findOne(queryFilter)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(queryFilter)}`,
      );
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    queryFilter: QueryFilter<TDocument>,
    updateData: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(queryFilter, updateData, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(queryFilter)}`,
      );
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async find(queryFilter: QueryFilter<TDocument>): Promise<TDocument[]> {
    return await this.model.find(queryFilter).lean<TDocument[]>(true);
  }

  async findOneAndDelete(queryFilter: QueryFilter<TDocument>): Promise<void> {
    await this.model.findOneAndDelete(queryFilter).lean<TDocument>(true);
  }
}
