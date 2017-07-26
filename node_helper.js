/* Magic Mirror
 * Node Helper: MMM-Jarvis-Voice-Control
 *
 * By Mercea Emil
 */

const NodeHelper = require('node_helper');
const url = require('url');
    
module.exports = NodeHelper.create({
	init: function() {
		console.log('Initializing MMM-Jarvis-Voice-Control module helper ...');
	},

	start: function() {
	    var self = this;
	    
	    this.expressApp.get('/Jarvis', (req, res) => {
			var query = url.parse(req.url, true).query;
		    var status = query.status;

			if (!status) {
				res.send({'status': 'failed', 'error': 'No status given.'});
			}
			else {
			    if(status == "started"){
				    self.sendSocketNotification("JARVIS_STARTED");
				} else if(status == "ended")   { 
				    self.sendSocketNotification("JARVIS_ENDED");
				}
				res.send({'status': 'success'});
			}
		});
	    
		this.expressApp.get('/VoiceCommand', (req, res) => {
			var query = url.parse(req.url, true).query;
			var command = query.command;

			if (!command) {
				res.send({'status': 'failed', 'error': 'No command given.'});
			}
			else {
				self.sendSocketNotification("JARVIS_COMMAND", command);
				res.send({'status': 'success'});
			}
		});
		
		this.expressApp.get('/VoiceResponse', (req, res) => {
			var query = url.parse(req.url, true).query;
			var response = query.response;
			var status = query.status;

			if (!status) {
				res.send({'status': 'failed', 'error': 'No status given.'});
			}
			else {
			    if(status == "started"){
			        if (!response) {
				        res.send({'status': 'failed', 'error': 'No response given.'});
			        }
				    self.sendSocketNotification("JARVIS_RESPONSE_STARTED", response);
			    }
			    
				if(status == "ended"){
				    self.sendSocketNotification("JARVIS_RESPONSE_ENDED");    
				}
				    
				res.send({'status': 'success'});
			}
		});
		
		this.expressApp.get('/VoiceListen', (req, res) => {
			var query = url.parse(req.url, true).query;
			var status = query.status;

			if(status == "started"){
				self.sendSocketNotification("JARVIS_CONVERSATION_STARTED");
			}else if(status == "ended"){
				self.sendSocketNotification("JARVIS_CONVERSATION_ENDED");
			}else if(status == "listening"){
				self.sendSocketNotification("JARVIS_LISTEN_STARTED");
			}else if(status == "notlistening"){
				self.sendSocketNotification("JARVIS_LISTEN_ENDED");
			}else if(status == "timeout"){
				self.sendSocketNotification("JARVIS_LISTEN_TIMEOUT");
			}else if(status == "error"){
				self.sendSocketNotification("JARVIS_LISTEN_ERROR");
			}else{
			    self.sendSocketNotification("JARVIS_CONVERSATION_ENDED");
			}
			
			res.send({'status': 'success'});
		});
	},
	
	socketNotificationReceived: function(notification, payload) {

	}
});
