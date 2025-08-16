import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let errors: any = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res: any = exception.getResponse()

      if (typeof res === 'string') {
        message = res
      } else {
        message = res.message || message
        errors = res.errors ?? null
      }
    }

    response.status(status).json({
      success: false,
      message,
      errors,
    })
  }
}
