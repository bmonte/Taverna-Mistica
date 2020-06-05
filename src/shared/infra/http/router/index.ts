import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/router/users.routes';
import sessionRouter from '@modules/users/infra/http/router/session.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
