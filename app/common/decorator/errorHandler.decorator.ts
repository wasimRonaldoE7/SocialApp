import { Response } from "express";
import { HttpStatusCode } from "../../types/enums";
import { ErrorMessage } from "../../types/enums";

/**
 * This function is a decorator which can have it on all controllers to readability
 * @returns
 */
export function ErrorHandlerDecorator() {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value as unknown as Function;
        descriptor.value = async function (...args: any[]) {
            try {
                return await original.apply(this, args);
            } catch (e: any) {
                handleErrorResponse(e, args[1]);
            }
        };
        return descriptor;
    };
}

function handleErrorResponse(e: any, res: Response): void {
   console.log(e)
        let code = e.status;
        let statusCode: HttpStatusCode;
        let message: string;

        switch (code) {
            case HttpStatusCode.NOT_FOUND:
                statusCode = HttpStatusCode.SUCCESS;
                message = ErrorMessage.DATA_NOT_FOUND;
                break;

            case HttpStatusCode.BAD_GATEWAY:
            case HttpStatusCode.INTERNAL_SERVER_ERROR:
                statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
                message = ErrorMessage.INTERNAL_SERVER_ERROR;
                break;
            default:
                statusCode = HttpStatusCode.BAD_REQUEST;
                message = ErrorMessage.BAD_REQUEST;
        }
        res.status(statusCode).send({ status: statusCode, result: message })
};
