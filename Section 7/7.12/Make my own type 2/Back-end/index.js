
//NOTE: requiring 'ask-sdk' library instead of ask-sdk-core
const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    
    async canHandle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    
    //getting the persistent attributes
    const attributes = await attributesManager.getPersistentAttributes() || {};
    
    //to check if the length of 'attributes' is 0 or not. 0 means, no table is created!!! 
        if((Object.keys(attributes).length === 0))
    {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }else {
        let username = attributes.name.toString();
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest' && username; //condition to check if the request type is launch request & presence of username
    }
        
    },
    
        async handle(handlerInput) {
        
    const attributesManager = handlerInput.attributesManager;
    
    //getting the persistent attributes
    const attributes = await attributesManager.getPersistentAttributes() || {};
    
    var speechText = '';
    var repromptText = '';
    
    
        if((Object.keys(attributes).length === 0)){
        
        //speech text if the length of attributes is 0
        speechText = `Welcome to make my own. Here you can customize your own pizza. We offer you different types of size, 
        base, veggies, cheese and main topping to build your pizza. To start customizing, please say your name`;
        
        repromptText = "Please tell your name";
        
        }else{
            
            //using session attributes, to keep count of 'yes' said by the user
        const sessionAttributes = attributesManager.getSessionAttributes();
        sessionAttributes.count = 0;
        attributesManager.setSessionAttributes(sessionAttributes);
            
            //getting persistent attributes
        const attributes = await attributesManager.getPersistentAttributes() || {};
        let username = attributes.name.toString();
        
        speechText = "Welcome back " + username + ". Would you like me to repeat what was your previous order?";
        repromptText = "Would you like me to repeat what was your previous order?";
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const OrderIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OrderIntent';
    },
    async handle(handlerInput) {
        var speakOutput= '';
        
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getPersistentAttributes() || {};
        
    if((Object.keys(attributes).length === 0)){
        
        
        //getting all the user-provided value for the slots in order intent
        const name = handlerInput.requestEnvelope.request.intent.slots.name.value;
        const size = handlerInput.requestEnvelope.request.intent.slots.size.value;
        const base = handlerInput.requestEnvelope.request.intent.slots.base.value;
        const cheese = handlerInput.requestEnvelope.request.intent.slots.cheese.value;
        const maintopping = handlerInput.requestEnvelope.request.intent.slots.maintopping.value;
        const veggies = handlerInput.requestEnvelope.request.intent.slots.veggies.value;
        
        //assigning all the user-provided value inside the persistent attributes
        attributes.name = name;
        attributes.size = size;
        attributes.base = base;
        attributes.cheese = cheese;
        attributes.maintopping = maintopping;
        attributes.veggies = veggies;
        
        //setting it locally and saving it in database level
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes();
        
        if (size === "8\""){
            
            speakOutput = 'Thank you for ordering with us ' + name + '. An ' + size +' '+ base + ' pizza '+ 'with '+ cheese + 
                            ' topped with '+ maintopping + ' and '+ veggies + ' is in the oven already. A steaming hot pizza will be'+ 
                            ' on your way in exactly 20 minutes. Enjoy your meal. See you later.';    
        }else{
            
            speakOutput = 'Thank you for ordering with us ' + name + '. A ' + size +' '+ base + ' pizza '+ 'with '+ cheese + 
                            ' topped with '+ maintopping + ' and '+ veggies + ' is in the oven already. A steaming hot pizza will be'+ 
                            ' on your way in exactly 20 minutes. Enjoy your meal. See you later.';   
        }
        
        //condition if object length of attributes is not 0 
    } else { 
        
        const name = attributes.name; //retrieving the name of user from the database and assigning it to a name constant
        
        const size = handlerInput.requestEnvelope.request.intent.slots.size.value;
        
        const base = handlerInput.requestEnvelope.request.intent.slots.base.value;
        
        const cheese = handlerInput.requestEnvelope.request.intent.slots.cheese.value;
        
        const maintopping = handlerInput.requestEnvelope.request.intent.slots.maintopping.value;
        
        const veggies = handlerInput.requestEnvelope.request.intent.slots.veggies.value;
        
        //assigning all the user-provided value of slots in the order intent except for 'name' slot
        attributes.size = size;
        attributes.base = base;
        attributes.cheese = cheese;
        attributes.maintopping = maintopping;
        attributes.veggies = veggies;
        
        
        attributesManager.setPersistentAttributes(attributes);
        await attributesManager.savePersistentAttributes(); //saving

        if (size === "8\""){
            
            speakOutput = 'Thank you for ordering with us ' + name + '. An ' + size +' '+ base + ' pizza '+ 'with '+ cheese + 
                            ' cheese topped with '+ maintopping + ' and '+ veggies + ' is in the oven already. A steaming hot pizza'+
                            ' will be on your way in exactly 20 minutes. Enjoy your meal. See you later.';    
        }else{
            
            speakOutput = 'Thank you for ordering with us ' + name + '. A ' + size +' '+ base + ' pizza '+ 'with '+ cheese + 
                            ' cheese topped with '+ maintopping + ' and '+ veggies + ' is in the oven already. A steaming hot pizza'+
                            ' will be on your way in exactly 20 minutes. Enjoy your meal. See you later.';   
        }
    }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

//handler when the user says 'yes'
const YesIntentHandler = {
    canHandle(handlerInput) {
    
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    async handle(handlerInput){
        
        var speakOutput = '';
        var repromptText = '';
    
    const attributesManager = handlerInput.attributesManager;
        
        const attributes = await attributesManager.getPersistentAttributes() || {};
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        //condition when the user says yes for the 'first time' (i.e, user says 'yes' when alexa asks if she can repeat the previous order)
        if (sessionAttributes.count === 0){
            
        sessionAttributes.count++; //incrementing count value
            
            //previous order summary
            speakOutput = "Your previous order was a " + attributes.size + " " + attributes.base + 
            " pizza with " + attributes.cheese + " cheese topped with " + attributes.maintopping + " and " + attributes.veggies +
            ". Would you like to repeat this order?";     
            
            repromptText = " Would you like to repeat this order?";
        
        } 
        //condition when the user says yes for the 'second time' (i.e, user says 'yes' when alexa asks if you want to place the same order again)
        else if (sessionAttributes.count === 1){
        
            if (attributes.size === '8\"'){
                
                speakOutput = "An " + attributes.size + " " + attributes.base + 
            " pizza with " + attributes.cheese + " cheese topped with " + attributes.maintopping + " and " + attributes.veggies +
            " is in the oven already. The pizza will be at your doorstep in twenty minutes";    
        
            }else{
                
            speakOutput = "A " + attributes.size + " " + attributes.base + 
            " pizza with " + attributes.cheese + " cheese topped with " + attributes.maintopping + " and " + attributes.veggies +
            " is in the oven already. The pizza will be at your doorstep in twenty minutes";    
        
            }
        
        }
        
        return handlerInput.responseBuilder
        
    .speak(speakOutput)
    .reprompt(repromptText)
    .getResponse();
    } 
};

//when the user says 'no', we have to start customizing the pizza from scratch.
const NoIntentHandler = {
    canHandle(handlerInput) {
    
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput){
    const speakOutput = "Okay. We have eight inches, twelve inches, sixteen inches, twenty two inches pizzas available. Choose one.";
    
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
        const speakOutput = 'I can help you order pizza. Please say your name';

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

exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
        LaunchRequestHandler,
        OrderIntentHandler,
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
    .withTableName('make-my-own-type-two') //The name of the database table
    .withAutoCreateTable(true) //Automatically creates the table
    .lambda();
