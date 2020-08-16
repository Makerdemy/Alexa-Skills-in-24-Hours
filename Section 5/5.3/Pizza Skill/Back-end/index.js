
//requiring the ask-sdk-core library
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        const speakOutput = `Welcome to make my own. We allow you to customize your own pizza. 
        We offer you different types of size, base, topping, cheese, veggies and main toppings. To begin, say your name`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// to capture the name and ask the user to pick a "SIZE"
const NameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NameIntent';
    },
    handle(handlerInput) {
        
        const name = handlerInput.requestEnvelope.request.intent.slots.name.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.name = name;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `Hi ${name}. We have eight inches, twelve inches, sixteen inches, 
        and twenty two inches pizza. Which one would you like?`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(`We have eight inches, twelve inches, sixteen inches, 
                       and twenty two inches pizza. Which one would you like?`)
            .getResponse();
    }
};

//to capture the size the user wants and to give info on "BASE"
const SizeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SizeIntent';
    },
    handle(handlerInput) {
       
        const size = handlerInput.requestEnvelope.request.intent.slots.size.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.size = size;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `We got thin crust, flat bread, pan base, cheese stuffed and normal base available. 
                             Which one would you want?`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//to capture the base the user wants and to provide info about cheese
const BaseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BaseIntent';
    },
    handle(handlerInput) {
        
        const base = handlerInput.requestEnvelope.request.intent.slots.base.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.base = base;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `We have mozarella, parmesan, chipotle, cheddar and mexican cheese. Pick one?`;
       
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//to capture the cheese the user wants and to provide info about veggies
const CheeseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheeseIntent';
    },
    handle(handlerInput) {
        
        const cheese = handlerInput.requestEnvelope.request.intent.slots.cheese.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.cheese = cheese;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = sessionAttributes.base + " with " + sessionAttributes.cheese + 
        " is a good choice. We have black olives, green pepper, chilli flakes, bell pepper," + 
        " red chillies, jalapeno, onion and tomato. Choose one";
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


//to capture the veggies the user wants and to provide info about main toppings
const VeggiesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VeggiesIntent';
    },
    handle(handlerInput) {
        
        const veggies = handlerInput.requestEnvelope.request.intent.slots.veggies.value;
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.veggies = veggies;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `Alright for main toppings we got Chicken sausage, chicken tikka, 
                             pepperoni, paneer, mushroom, chicken ham and bacon. Choose one`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//to capture the maintopping the user wants and to give the order summary
const OrderIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MaintoppingsIntent';
    },
    handle(handlerInput) {
        
        const maintopping = handlerInput.requestEnvelope.request.intent.slots.maintoppings.value;
        var speakOutput = "";
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
       // IMPORTANT: no need to save "maintoppings" in the sessionAttributes because, it was accquired in this very same intent! 
       
       // A conditional statement to check if the size of pizza is "eight inch" or not. 
        if (sessionAttributes.size === "8\""){
        
        // If it is 8 inches, then the speech text is "An" eight inches..
        speakOutput = "Thank you for ordering with us " + sessionAttributes.name + ". An " + sessionAttributes.size + " "
        + sessionAttributes.base+ " pizza with " + sessionAttributes.cheese + " topped with " + maintopping + " and " + 
        sessionAttributes.veggies + " is in the oven already. Your pizza will be at your door step within twenty minutes."
        + " Happy to be of service. ";    
        
        } else {
            
            // If it is not eight inches, then the speech text beging with "A" <size> pizza....     
            speakOutput = "Thank you for ordering with us " + sessionAttributes.name + ". A " + sessionAttributes.size + " "
        + sessionAttributes.base+ " pizza with " + sessionAttributes.cheese + " topped with " + maintopping + " and " + 
        sessionAttributes.veggies + " is in the oven already. Your pizza will be at your door step within twenty minutes."
        + " Happy to be of service. ";    
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
        const speakOutput = 'You can say your name to begin customize your pizza';

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
        SizeIntentHandler,
        BaseIntentHandler,
        CheeseIntentHandler,
        VeggiesIntentHandler,
        OrderIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();



