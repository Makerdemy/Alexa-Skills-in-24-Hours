
//requiring ask-sdk-core library
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hey, how was your day?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DayIntent';
    },
    handle(handlerInput) {
      
      var speakOutput = '';
        
        //JSON address to get the ER status code
        const status = handlerInput.requestEnvelope.request.intent.slots.experience.resolutions.
        resolutionsPerAuthority[0].status.code;
              
        if (status === "ER_SUCCESS_MATCH"){
          
          //JSON address to get the resolved value of the 'experience slot-value'
          const day_res = handlerInput.requestEnvelope.request.intent.slots.experience.resolutions.
                       resolutionsPerAuthority[0].values[0].value.name;
          
                //conditional statement to check if the resolved value is good or bad
                if (day_res === "good"){    
                  speakOutput = `That sounds great! I had a good day too. Hey, I wanna watch a 
                                 superhero movie. Who is your favorite superhero?`;
                    
                }else if (day_res === "bad"){
                  speakOutput = `Aww. That's okay. We all have a day like that once in a while.<break time = '400ms'/> 
                                 Cheer up! Ok so tell me, who is your favorite superhero?`;
                }
                
        }else {
            //speech text if the user said value does not match with good/bad
          speakOutput = 'How was your day? Good or bad?';
        }
                               
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SuperheroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SuperheroIntent';
    },
    handle(handlerInput) {
      
        var speakOutput = '' ;
        
        //JSON address to get the user-provided value for superhero slot
        const superhero = handlerInput.requestEnvelope.request.intent.slots.superhero.value;
        
        //to capture the status code for the superhero slot
        const superhero_status = handlerInput.requestEnvelope.request.intent.slots.superhero.resolutions.
        resolutionsPerAuthority[0].status.code;
        
        //conditional statement to check if the status code is ER_SUCCESS_MATCH or not
        if (superhero_status === "ER_SUCCESS_MATCH"){
          
          //to capture the resolved value for the superhero slot
          const superhero_res = handlerInput.requestEnvelope.request.intent.slots.superhero.resolutions.
                       resolutionsPerAuthority[0].values[0].value.name;
                       
            //conditional statement to check if the resolved value is marvel
          if (superhero_res === "marvel"){
                
                //conditional statement to check if the user-provided value is spiderman
            if (superhero === "spiderman" || superhero === "spider man"){
                
                speakOutput = "Oh, you're a fan of " + superhero + " uh? So I guess you must also be " + 
                               superhero_res + "'s fan. My favorite marvel character is Spider Man too";        
                               
            } else {
                speakOutput = "Oh, you're a fan of " + superhero + " uh? So I guess you must also be " + 
                               superhero_res +"'s fan. My favorite marvel character is Spider Man";        
            }
          
            //conditional statement to check if the resolved value is DC
          } else if (superhero_res === "dc"){ 
              
              //conditional statement to check if the user-provided value is batman
              if(superhero === "batman" || superhero === "bat man"){
              
              speakOutput = "Oh, you're a fan of " + superhero + " uh? So I guess you must also be " + 
                             superhero_res + "'s fan. Guess what, I'm a batman fan too";
                             
              } else {
                speakOutput = "Oh, you're a fan of " + superhero + " uh? So I guess you must also be " + 
                               superhero_res + "'s fan. My favorite DC character is Batman";      
              } 
          }     
          
        } else {
            //speech text if the user is a fan of a superhero who doesn't belong to marvel or DC
          speakOutput = "Hmm. I never knew about " + superhero + "<break time = '600ms'/>." +
                        " Now I am going to check out about " + superhero + " for sure.";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say if you had a good or bad day';

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
        DayIntentHandler,
        SuperheroIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();



