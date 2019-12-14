import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const route = new Router();
const upload = multer(multerConfig);

route.post('/users', UserController.store);
route.post('/session', SessionController.store);

route.use(authMiddleware);

route.put('/users', UserController.update);

route.get('/providers', ProviderController.index);
route.get('/providers/:providerId/available', AvailableController.index);

route.get('/appointments', AppointmentController.index);
route.post('/appointments', AppointmentController.store);
route.delete('/appointments/:id', AppointmentController.delete);

route.get('/schedules', ScheduleController.index);

route.get('/notifications', NotificationController.index);
route.put('/notifications/:id', NotificationController.update);

route.post('/files', upload.single('file'), FileController.store);

export default route;
