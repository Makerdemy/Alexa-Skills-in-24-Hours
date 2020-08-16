
//requiring the ask-sdk-core library    
const Alexa = require('ask-sdk-core');

//creating global variables
var questionNum ;
var username;

//array containing name of animals
const animal = ['lion','tiger','dog','cat','crocodile'];

//array containing image addresses of animals as per the "animal array"
const link = 
['https://images.theconversation.com/files/243439/original/file-20181101-83635-1xcrr39.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
'https://images.theconversation.com/files/242298/original/file-20181025-71032-1hmrk2l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
'https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp',
'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
'https://i.insider.com/5c3e1d8cc3100e043e70ff02?width=1100&format=jpeg&auto=webp'];



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        //assigning 0 to the quesNum global variable
        questionNum = 0;
        
        // calling the session attributes from the attributes manager
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // assigning the object score with session attributes, with a value '0'
        sessionAttributes.score = 0;
        
        //saving the session attributes
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        var title = "Can you guess the Animal's name!";
        
        var cardText = 'Welcome to Animal quiz! How should I call you?';
        
        var image = 'https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/bsirhbigiebbaiif_1588399230.jpeg?tr=w-812,h-464';
        
        const speakOutput = 'Welcome to animal quiz! What is your name?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withStandardCard(title, cardText, image)
            .getResponse();
    }
};

const NameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NameIntent';
    },
    handle(handlerInput) {
        
        username = handlerInput.requestEnvelope.request.intent.slots.name.value;
        
        const speakOutput = "Hello " + username + ". To begin, ask me to start the quiz";
        
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
        var title = "What is this Animal?";
        var cardText = 'Guess the Animal\'s name';
        var image =link[questionNum];
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // conditional statement to check if the question number is less than 5 or not
        if (questionNum<5){
            speakOutput = 'Guess the animal\'s name';
        } else{
            speakOutput = "You have answered all the questions and scored " + sessionAttributes.score + 
                " points. Please come back tomorrow to play again. Bye " + username ;
        }
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withStandardCard(title, cardText, image)
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
       
        var title = "What is this Animal's Name?";
        
        var cardText ;
        var speakOutput = '';
        
        var image =link[questionNum];
        
            if (answer === animal[questionNum]){
            sessionAttributes.score++;
            questionNum++;
            speakOutput = "That's correct! Your score is "+ sessionAttributes.score + 
                          ". Would you like to go to the next question?";   

            cardText = speakOutput;
                
            } else {
            speakOutput = "Oops that's Wrong! The correct answer is " + animal[questionNum] + 
                          ". Would you like to go to the next question?";   
            cardText = speakOutput;
            questionNum++;
            }    
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withStandardCard(title, cardText, image)
            .getResponse();
    }
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput){
        
        var speakOutput = '';
        var title = "What is this Animal's Name?";
        var cardText = 'Guess the Animal\'s name';
        var image =link[questionNum];
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // conditional statement to check if the question number is less than 5 or not
        if (questionNum<5){
            speakOutput = 'Guess the animal\'s name';
        } else{
            speakOutput = "You have answered all the questions and scored " + sessionAttributes.score + 
                " points. Please come back tomorrow to play again. Bye " + username ;
            
        }
    return handlerInput.responseBuilder
    .speak(speakOutput)
            .reprompt(speakOutput)
            .withStandardCard(title, cardText, image)
            .getResponse();
  } 
};

const NoIntentHandler = {
  canHandle(handlerInput) {
    
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput){
    var speakOutput = '';
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        // conditional statement to check if the score is greater than 1 or not
        if (sessionAttributes.score === 1){
        speakOutput = "You scored " + sessionAttributes.score + " point. Thank you for playing. Come back again " ;     
        sessionAttributes.score =0;
        questionNum=0;
        }else{
            speakOutput = "You scored " + sessionAttributes.score + " points. Thank you for playing. Come back again " ;     
            sessionAttributes.score =0;
        questionNum=0;
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
        
        // conditional statement to check if the score is greater than 1 or not
        if (sessionAttributes.score=== 1){
        speakOutput = "You scored " + sessionAttributes.score + " point. Thank you for playing. Come back again " ;     
        sessionAttributes.score =0;
        questionNum=0;
        }else{
            speakOutput = "You scored " + sessionAttributes.score + " points. Thank you for playing. Come back again " ;     
            sessionAttributes.score =0;
        questionNum=0;
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


