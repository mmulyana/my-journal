import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { ZodEffects, ZodObject } from 'zod'

type ZodSchemaType = ZodObject<any> | ZodEffects<ZodObject<any>>

interface ZodSchemaClass {
  schema: ZodSchemaType
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype

    if (this.isZodSchema(metatype)) {
      const schema = (metatype as ZodSchemaClass).schema
      const result = schema.safeParse(value)

      if (!result.success) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: result.error.errors.map((err) => ({
            path: err.path.length > 0 ? err.path.join('.') : '<root>',
            message: err.message,
          })),
        })
      }

      return result.data
    }

    return value
  }

  private isZodSchema(metatype?: unknown): metatype is ZodSchemaClass {
    if (!metatype || typeof metatype !== 'function') return false

    const schema = (metatype as any).schema
    return schema && typeof schema.safeParse === 'function'
  }
}
