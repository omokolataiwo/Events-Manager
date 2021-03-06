import eventController from '../controllers/events';
import auth from '../middlewares/auth';
import errorChecker from '../middlewares/errors';
import checkUserIsAdmin from '../helpers/adminCheck';

export default (app) => {
  app.post('/api/v1/events/', auth, errorChecker.checkNullInputAddEvent, eventController.addEvent);
  app.put('/api/v1/events/:eventId', auth, errorChecker.checkNullInputModifyEvent, eventController.modifyEvent);
  app.delete('/api/v1/events/:eventId', auth, eventController.deleteEvent);
  app.get('/api/v1/events/user', auth, eventController.getUserEvents);
  app.post('/api/v1/events/:eventId', auth, checkUserIsAdmin, eventController.cancelUserEvent);
};
