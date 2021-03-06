import models from '../db/models';
import mailSender from '../helpers/mailer';
import sendError from '../helpers/errorSender';

const { Events, Users } = models;

/**
* @Event, class containing all methods that
* handle centerevent
*/
class Event {
/**
 * Addan event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static addEvent(req, res) {
    const {
      name,
      type,
      date,
      center,
    } = req.body;
    Events
      .findOne({
        where: {
          date: new Date(date).toISOString(),
          center
        }
      })
      .then((event) => {
        if (event) {
          return res.status(409).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
        }
        return Events
          .create({
            name,
            type,
            center,
            date: new Date(date).toISOString(),
            user: req.decoded.userId,
          })
          .then(newEvent => res.status(201).send({ message: 'Event successfully added', newEvent }))
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * modify an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static modifyEvent(req, res) {
    const { center } = req.body;
    Events.findOne({
      where: {
        date: new Date(req.body.date).toISOString(),
        center,
      }
    })
      .then((event) => {
        if (event && event.id !== req.params.eventId) {
          return res.status(409).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
        }
        Events.findById(req.params.eventId)
          .then((modifiedEvent) => {
            if (!modifiedEvent) {
              return res.status(404).send({ error: 'No event found' });
            }
            modifiedEvent.updateAttributes({
              name: req.body.name || modifiedEvent.name,
              type: req.body.type || modifiedEvent.type,
              date: new Date(req.body.date).toISOString() || modifiedEvent.date,
              center: center || modifiedEvent.center,
            });
            return res.status(200).send({ message: 'successfully modified', modifiedEvent });
          })
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * delete an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static deleteEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ error: 'event not found' });
        }
        if (event && event.user !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot delete an event added by another user' });
        }
        event.destroy()
          .then(() => res.status(200).send({ message: 'Event successfully deleted' }))
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * get User Events
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static getUserEvents(req, res) {
    Events.findAll({
      where: {
        user: req.decoded.userId,
      }
    })
      .then((userEvents) => {
        if (userEvents.length === 0) {
          return res.status(404).send({ error: 'No events found for this User' });
        }
        return res.status(200).send({ message: 'Success', userEvents });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * get User Events
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static cancelUserEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        event.updateAttributes({
          center: null,
        });
        Users.findById(event.user)
          .then((user) => {
            const mailOptions = {
              from: 'efosaeventsmanager@evt.com',
              to: user.email,
              subject: 'Notice Of cancellation of event',
              text: 'This Is to Inform You that For some reasons ,Your event has been canceled!',
            };
            return mailSender(mailOptions, res);
          })
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
}

export default Event;
