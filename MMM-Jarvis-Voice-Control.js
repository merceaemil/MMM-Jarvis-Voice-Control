/* global Module */

/* Magic Mirror
 * Module: MMM-Jarvis-Voice-Control
 *
 * By EoF https://forum.magicmirror.builders/user/eof
 * MIT Licensed.
 */

Module.register('MMM-Jarvis-Voice-Control',{

	// Default module config.
	voiceResponseDiv: null,
	voiceListeningDiv: null,
	voiceListening: false,
	getStyles: function() {
		return ["styleJarvis.css"];
	},
	start: function() {
		Log.info('Starting module: ' + this.name);
	},
	// Override dom generator.
	getDom: function() {
	    var self = this;
		
		self.sendSocketNotification('INIT');
		
		var wrapper = document.createElement('div');
		
		self.voiceListeningDiv = document.createElement('div');
	    self.voiceListeningDiv.className = "voiceListening";
	    self.voiceListeningDiv.style.display = "none";
	    self.voiceListeningDiv.innerHTML = `<span class="voiceListeningFirstCircle"></span>
	                                        <span class="voiceListeningSecondCircle"></span>
	                                        <span class="voiceListeningThirdCircle"></span>`;
		wrapper.appendChild(this.voiceListeningDiv);
		
	    self.voiceResponseDiv = document.createElement('span');
	    self.voiceResponseDiv.className = "thin voiceResponse";
		wrapper.appendChild(this.voiceResponseDiv);

		return wrapper;
	}, 
    socketNotificationReceived: function(notification, payload) {
        // Triggered when Jarvis application has started.
        if (notification === 'JARVIS_STARTED'){
            // Do whatever you want here.
        }
        
        // Triggered when Jarvis application has been terminated.
        if (notification === 'JARVIS_ENDED'){
            // Do whatever you want here.
        }
        
        // Triggered when received command from Jarvis.
        if (notification === 'JARVIS_COMMAND'){
            this.sendNotification('VOICE_COMMAND', payload);
        }
        
        //Triggered when Jarvis is saying something. 
        // Payload contains what Jarvis is speaking.
        if(notification === 'JARVIS_RESPONSE_STARTED'){
            this.voiceResponseDiv.innerHTML = payload;
            if(this.voiceListening)
                this.voiceListeningDiv.style.display = "none";
        }
        
        //Triggered when Jarvis finished speaking.
        if(notification === 'JARVIS_RESPONSE_ENDED'){
            this.voiceResponseDiv.innerHTML = "";
            if(this.voiceListening){
                this.voiceListeningDiv.style.display = "block";
                this.voiceListeningDiv.className = "voiceListening";
            }
        }
        
        //Triggered when you say Wake words (When conversation started). 
        //This will trigger only once per conversation session.
        if(notification === 'JARVIS_CONVERSATION_STARTED'){
            this.voiceListening = true;
            this.voiceListeningDiv.style.display = "block";
            this.voiceListeningDiv.className = "voiceListening";
        }
        
        //Triggered when the conversation has ended. 
        //If Jarvis did not received any command for a period of time or some error occured.
        if(notification === 'JARVIS_CONVERSATION_ENDED'){
            this.voiceListening = false;
            this.voiceListeningDiv.style.display = "none";
            this.voiceListeningDiv.className = "voiceListening";
        }
        
        //This is triggered everytime Jarvis listens for your command. After each voice response. 
        //This is triggered multiple times per conversation
        if(notification === 'JARVIS_LISTEN_STARTED'){
            // Do whatever you want here.
        }
        
        //This is triggered everytime Jarvis stops listening for your command. Everythime he speaks or on timeout or conversation end. 
        //This is triggered multiple times per conversation
        if(notification === 'JARVIS_LISTEN_ENDED'){
            // Do whatever you want here. 
        }
        
        //Triggered right before conversation ended. 
        //This announces you that the conversation has ended because of not saying anything for a long period.
        if(notification === 'JARVIS_LISTEN_TIMEOUT'){
            if(this.voiceListening){
                this.voiceListeningDiv.className = "voiceListening timeout";
            }
        }
        
        //Triggered if Jarvis could not understand you or something went wrong while parsing your command.
        if(notification === 'JARVIS_LISTEN_ERROR'){
            if(this.voiceListening){
                this.voiceListeningDiv.className = "voiceListening error";
                setTimeout(function(self){
                    self.voiceListeningDiv.className = "voiceListening";
                },1000,this);
            }
        }
    }

});
