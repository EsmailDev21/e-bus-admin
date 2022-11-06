import { threadId } from "worker_threads";
import { HttpClient } from "./HttpClient";
import User from "./User";

export class CustomerDataServer extends HttpClient<User>{
    constructor() {
        super();
    }  
} 