import { NestFactory, Reflector } from '@nestjs/core'

import { ResponseInterceptor } from './shared/interceptor/response.interceptor'
import { AllExceptionsFilter } from './shared/utils/all-exceptions.filter'
import { ZodValidationPipe } from './shared/pipes/zod-validation.pipe'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)))
  app.useGlobalPipes(new ZodValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
