
//requiring ask-sdk-core library
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Welcome, I am here to show you about SSML tags. 
                            To begin with, ask me what are the types of voices I have.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//To demonstrate Amazon Polly voices
const VoiceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VoiceIntent';
    },
    handle(handlerInput) {
        const speakOutput = `I have quite a few voices under English <say-as interpret-as="spell-out">US</say-as>, 
         Let me show you. <break time ="1s"/>`
        
        //Polly voices under English US
        +`<voice name="Kendra">Hi, I am kendra.</voice> <break time="700ms"/>
        <voice name="Ivy">Hey, This is Ivy.</voice> <break time="700ms"/>
        <voice name="Joanna">Hi, I am Joanna.</voice> <break time="700ms"/>
        <voice name="Joey">Hi, This is Joey.</voice> <break time="700ms"/>
        <voice name="Justin">Hey, This is Justin.</voice> <break time="700ms"/>
        <voice name="Kimberly">Hi, I am Kimberly.</voice> <break time="700ms"/>
        <voice name="Matthew">Hi, This is Matthew here.</voice> <break time="700ms"/>
       <voice name="Salli">Hey, I am Salli.</voice> <break time="700ms"/>`
       
        //under the default voice
       + `Apart from these I also have Two australian and Three British Voices. 
        Wanna hear them? <break time="500ms"/>Sure, `
        
        // Voices under English AU
        +`<voice name="Nicole"><lang xml:lang="en-AU"> Hey, This is Nicole.</lang></voice> <break time="700ms"/>
        <voice name="Russell"><lang xml:lang="en-AU"> Hey, This is Russell. </lang></voice> <break time="700ms"/>`
        
        //Voices under English GB
        +`And the british voices are 
        <voice name="Brian"><lang xml:lang="en-GB">Hey, I am Brian. </lang> </voice> <break time="700ms"/>
        <voice name="Amy"> <lang xml:lang="en-GB"> Hey, I am Amy. </lang> </voice> <break time="700ms"/>
        <voice name="Emma"> <lang xml:lang="en-GB"> Hey, This is Emma here. </lang> </voice> <break time="700ms"/>`;
        
        const reprompt="You can ask me to tell you about the domain tags"
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask me what are the different voices I have';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        VoiceIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();