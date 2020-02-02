import { Router } from 'express';
import Login from './login';
import Register from './register';

export default class Auth {
    router;
    constructor() {
        this.router = Router();

        this.router.post('/login', Login.index);
        this.router.post('/register', Register.index);
        this.router.post('/register/character', Register.character);

        return this.router;
    }
}