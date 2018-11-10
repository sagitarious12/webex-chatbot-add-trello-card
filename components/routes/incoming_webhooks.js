var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {
    webserver.post('/ciscospark/receive', function(req, res) {
        res.status(200);
        res.send('ok');
        var bot = controller.spawn({});
        controller.handleWebhookPayload(req, res, bot);
    });
}
