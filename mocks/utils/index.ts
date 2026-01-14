import { HttpResponse } from 'msw'

export const responseWrapper = (data: any, code = 200, message = 'success') => {
    return HttpResponse.json({
        code,
        message,
        data,
    })
}
