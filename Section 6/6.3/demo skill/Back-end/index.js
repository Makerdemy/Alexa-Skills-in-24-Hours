
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, I am here to show you about SSML tags. To begin with say, show me your emotions.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//To demonstrate effects and emotions tag
const EmotionsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EmotionsIntent';
    },
    handle(handlerInput) {
        const speakOutput = 
            
        `Hi, I have effects and emotions tags available. <break time="500ms"/> Let me show you what they will do.
        <break time="500ms"/> using effects I can whisper. <break time="500ms"/> `
    
        //With whispered effect
       + `<amazon:effect name="whispered">Come closer and I will show you. Yes, I can whisper. 
        Thanks to effect tag </amazon:effect><break time="1s"/>`
        
        + ` Available emotions are excited and disappointed. Let me show you how the effect me <break time="600ms"/>`
        
        //Will be spoken in a excited emotion
        + ` <amazon:emotion name="excited" intensity="high">This is Excited emotion. <break time="500ms"/> 
            I am very excited and happy now. This is what excited emotion tags does to me. 
            </amazon:emotion><break time="1s"/>`
        
        //Will be spoken in a disappointed emotion
        + ` <amazon:emotion name="disappointed" intensity="high">I am disappointed now. <break time="500ms"/> 
            This is what disappointed emotion tag does to me </amazon:emotion>`;
        
      const reprompt="Please ask me to say about domain tags"
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

//To demonstrate Domain tags
const DomainIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DomainIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Domain tags Apply different speaking styles to the speech. 
        The styles are curated text-to-speech voices that use different variations of intonation, emphasis, pausing, and 
        other techniques to match the speech to the content<break time="1s"/>`
       
       //conversational style in Matthew's voice
       +`<voice name="Matthew"><amazon:domain name="conversational"> Conversational Styles Amazon Polly voices 
       to sound more conversational and less formal, more like how people sound when they speak to friends and 
       family </amazon:domain></voice><break time="1s"/>`
      
      //news style in Joanna's voice
      + `<voice name="Joanna"><amazon:domain name="news">. The News tag Styles the speech similar to what you hear when 
      listening to the news on the radio or television.</amazon:domain></voice>`;
      
      const reprompt="Please ask me to say about effect and emotion"
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
        const speakOutput = 'You can say show me your emotions';

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
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
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
        EmotionsIntentHandler,
        DomainIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
    
    
    
