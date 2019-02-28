const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, { response }) {
        if (error.status && Math.round(error.status / 100) === 4) {
            Logger.warning(error);
        } else {
            Logger.error(error);
        }

        switch (error.name) {
            case 'ValidationException':
                response.status(422).send(error.messages);
                break;
            default:
                response.status(error.status).send(error.message);
        }
    }
}

module.exports = ExceptionHandler;
