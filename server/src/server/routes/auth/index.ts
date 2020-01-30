import { Router } from 'express';
import Check from './check';
import Login from './login';
import Register from './register';

export default class Auth {
    router;
    constructor() {
        this.router = Router();

        this.router.post('/login', Login.index);
        this.router.get('/check', Check.index);
        this.router.post('/register', Register.index);

        return this.router;
    }
}