import { HttpStatusCode } from "..";

export class ErrorStatus {
    constructor(public status: HttpStatusCode, public message?: string) {
    }
}