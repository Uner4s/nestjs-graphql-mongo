declare const module: any

import { NestFactory } from '@nestjs/core'

import { AppExceptionFilter } from './app.exceptions'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  })

  // Add Express and NestJS options here
  app.enableCors({ origin: '*' })

  app.useGlobalFilters(new AppExceptionFilter())

  await app.listen(process.env.PORT || 3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
