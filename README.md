MMM-Jarvis-Voice-Control
===

## Description

Voice control module for MagicMirror using OpenJarvis.

!! This module depends on OpenJarvis & Jarvis-MagicMirror Plugin. Before proceding to installing this module please install OpenJarvis and Jarvis-MagicMirror module.

## Install dependencies

1. Install OpenJarvis. 
````
Follow the tutorial at https://www.openjarvis.com/content/installation
````
2. Install Jarvis-MagicMirror Plugin. 
````
Follow the tutorial at https://github.com/merceaemil/jarvis-magicmirror
````


## Setup


### Installation

Navigate into your MagicMirror's modules folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/CFenner/MMM-AirQuality
````

### Configuration

To activate the module, you need to add the following data to config.js.

````javascript
{
	module: 'MMM-Jarvis-Voice-Control',
	position: 'bottom_center'
}
````

## USAGE

You can use this with any module by making the following two changes:

1. To add voice commands to your module you have to add the notificationReceived method (if does not exist already) inside your module main JS file.

````javascript
...
notificationReceived: function(notification, payload){

},
...
````

2. You have to define what voice commands do for your module inside the notificationReceived method:

````javascript
...
notificationReceived: function(notification, payload){
		....
		
		if (notification === "VOICE_COMMAND" && payload=="start music"){
			// Do something here. 
			// For example: this.playMusic();
		}
		
		if (notification === "VOICE_COMMAND" && payload=="end music"){
			// Do something here. 
			// For example: this.endMusic();
		}
		
		....
},
...
````