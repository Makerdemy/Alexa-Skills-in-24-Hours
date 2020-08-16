
//requiring the ask-sdk-core package
const Alexa = require('ask-sdk-core');

//animal names array
const animal = ['dog', 'cat', 'horse', 'hyena', 'wolf','elephant', 'lion', 'tiger', 'leopard',
                
                'sheep', 'goat', 'cuckoo', 'cow', 'chimpanzee', 'monkey', 'crow'];

//animal sounds array (in the same order as animal array)
const audio = ['https://animal-sound-quiz.s3.amazonaws.com/dog.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/cat.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/horse.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/hyena.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/wolf.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/Elephant.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/lion.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/Tiger.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/leopard.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/sheep.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/goat.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/cuckoo.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/cow.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/chimpanzee.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/monkey.mp3',
                'https://animal-sound-quiz.s3.amazonaws.com/Crow.mp3'];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        //calling the sessionAttributes
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // assigning the score and question number to 0
        sessionAttributes.score = 0;
        sessionAttributes.quesNum = 0;
        
        //saving the sessionAttributes values
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `<audio src = "soundbank://soundlibrary/animals/amzn_sfx_bird_forest_02"/>
                                                Welcome to animal sound quiz! What is your name?`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NameIntent';
    },
    handle(handlerInput) {
        
        const name = handlerInput.requestEnvelope.request.intent.slots.name.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        //assigning "name" slot value in the sessionAttributes
        sessionAttributes.name = name;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = "Hello " + sessionAttributes.name + ". I will be playing some animal sounds"
        + " and you have to guess them. To begin, ask me to start the quiz";
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const QuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuestionIntent';
    },
    handle(handlerInput) {
        
        
        var speakOutput = '';
        
        // calling the sessionAttributes
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        //conditional statement
        if (sessionAttributes.quesNum<16){
            speakOutput = "Guess the animal <audio src= '"+ audio[sessionAttributes.quesNum] + "'/>";
        
            
        } else{
            speakOutput = "You have answered all the questions and scored " + sessionAttributes.score + 
                            " points. Please come back tomorrow to play again. Bye" 
            
            // resetting the score and quesNum value back to 0
            sessionAttributes.score = 0;
            sessionAttributes.quesNum = 0;
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        
        const answer = handlerInput.requestEnvelope.request.intent.slots.animal.value;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        var speakOutput = '';
        
            //conditional statement
            if (answer === animal[sessionAttributes.quesNum]){
            
            //for every right answer, incrementing the score and quesNum by 1
            sessionAttributes.score++
            sessionAttributes.quesNum++
            speakOutput = "That's correct! Your score is "+ sessionAttributes.score + 
                            ". Would you like to go to the next question?";   
            } else {
            speakOutput = "Oops that's Wrong! The correct answer is " + animal[sessionAttributes.quesNum] + 
                            ". Would you like to go to the next question?";   
            
            // for every wrong answer, incrementing the quesNum alone 
            sessionAttributes.quesNum++
            }    
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        
        
        var speakOutput = '';
        
        // calling the sessionAttributes
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // conditional statement to check if the question number is less than 16 or not
        if (sessionAttributes.quesNum<16){
            
            speakOutput = "Guess the animal <audio src= '"+ audio[sessionAttributes.quesNum] + "'/>";
            
        } else{
            
            speakOutput = "You have answered all the questions and scored " + sessionAttributes.score + 
                            " points. Please come back tomorrow to play again. Bye" 
            
            // resetting the score and quesNum value back to 0
            sessionAttributes.score = 0;
            sessionAttributes.quesNum = 0;
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        var speakOutput = '';
         const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         
         
         // conditional statement to check if the score is equal to 1 or not
         if (sessionAttributes.score=== 1){
        
        speakOutput = "You scored " + sessionAttributes.score + " point. Thank you for playing. Come back again";     
         }else{
             
        speakOutput = "You scored " + sessionAttributes.score + " points. Thank you for playing. Come back again";     
        
         }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask me to start the quiz';

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
        var speakOutput = '';
         const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         
         
         //giving out the total score obtained when the user stops the session
         
         // conditional statement to check if the score is equal to 1 or not
         if (sessionAttributes.score=== 1){
             
        speakOutput = "You scored " + sessionAttributes.score + " point. Thank you for playing. Come back again";     
         
             
         }else{
             
        speakOutput = "You scored " + sessionAttributes.score + " points. Thank you for playing. Come back again";     
             
         }
        
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
        NameIntentHandler,
        QuestionIntentHandler,
        AnswerIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
    
    
    
