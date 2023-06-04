import {
  ArgumentMetadata,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Schema } from 'yup';

export class YupValidationPipe<T = any> implements PipeTransform {
  constructor(private schema: Schema<T>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== 'body') return value;
      return await this.schema.validate(value);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
