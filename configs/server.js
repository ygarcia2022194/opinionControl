'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import usersPath from '../src/users/user.routes.js';
import postingRoutes from '../src/posting/posting.router.js';
import commentRoutes from '../src/comments/comments.router.js';
import authRoutes from '../src/auth/auth.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/opinionControl/v1/users'
        this.postingPath = '/opinionControl/v1/posting'
        this.commentPath = '/opinionControl/v1/comment'
        this.authPath = '/opinionControl/v1/auth'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usersPath, usersPath);
        this.app.use(this.postingPath, postingRoutes);
        this.app.use(this.commentPath, commentRoutes);
        this.app.use(this.authPath, authRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;