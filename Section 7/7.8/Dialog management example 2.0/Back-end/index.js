
//requiring ask-sdk-core library
const Alexa = require('ask-sdk-core');

//movies array with genre and list of movies in that genre. 
const movie = {
    
    'thriller':['catch me if you can','bird box','inception',
                'the conjuring','the mummy returns'],
                
    'drama' : ['a star is born','knives out','the perks of being a wallflower',
                'three idiots','night crawler'],
                
    'action' : ['matrix','mission impossible',
                'knight and day','gladiator','john wick'],
                
    'adventure':['rim of the world','journey to the center of the earth',
                'rampage','aquaman','ender\'s game'],
                
    'sci-fi' : ["Back to the future",'start trek',
                'star wars','her','ready player one'],
                
    'comedy' : ["Scary movie","hungover games",
                "game night","horrible bosses","the hangover"],
                
    "fantasy" : ["harry potter","lord of the rings",
                "the hobbit","Maleficient","Alladin"],
                
    "documentary":["Michael jackson's this is it","The game changers",
                    "Bohemian Raphsody","Inside job",'untouchable'],
                    
    'romance': ["The notebook","Seventeen again",
                "Titanic","The kissing booth","The perfect date"]
}

//songs array with genre and list of songs in that genre
const songs = {
    
    'pop' : ["Baby one more time by britney spears",
            "Billie jean by Michael jackson",
            "Thriller by michael jackson",
            "like a prayer by Madonna",
            "It's gonna be me by N sync"],
            
    'rap' : ["Party girl","whats poppin","eighties",
            "the bigger picture","savage remix"],
            
    "trance" : ["The tribe by vini vici","hilit tribe by vini vici",
                "Rock the house by afro jack","Animals by Martin garrix",
                "Deep jungle tribe"],
                
    'jazz' : ['Fly me to the moon by Frank Sinatra','Take five by Dave',
            'What a wonderful world by Louis','Summertime by louis',
            'Giant steps by john coltrane'],
            
    'rock' : ["Rock You Like a Hurricane by Scorpions",
            "Don't Bring Me Down by Electric Light Orchestra", 
            "Can't Find My Way Home by Blind Faith", 
            "We're an American Band by Grand Funk Railroad", 
            "Black Betty by Ram Jam"],
            
    "romance" : ["Dont let me down","Baby oh","A thousand years from twilight",
                "All we need is love","Everything I need by skylar gray"]
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Alexa recommendor. I can suggest you movies and songs.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask me to suggest')
            .getResponse();
    }
};

const CategoryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CategoryIntent';
    },
    
    handle(handlerInput){
        
        var speakOutput = ""
        
        //to get the status code for the category slot
        const category_status = handlerInput.requestEnvelope.request.intent.slots.category.resolutions.
                                resolutionsPerAuthority[0].status.code;
        
        //to get the status code for the genre slot
        const genre_status = handlerInput.requestEnvelope.request.intent.slots.genre.resolutions.
                             resolutionsPerAuthority[0].status.code;
              
        //conditiondal statement to check if the status code is ER_SUCCESS_MATCH or NOT!              
        if (category_status === "ER_SUCCESS_MATCH"){
        
        //to capture the user provided value for the category slot
        const category = handlerInput.requestEnvelope.request.intent.slots.category.value;
        
        //to capture the canonical value of the category slot
        const category_res = handlerInput.requestEnvelope.request.intent.slots.category.resolutions.
                             resolutionsPerAuthority[0].values[0].value.name;
                       
            //conditiondal statement to check if the canonical value is movie or songs                        
            if (category_res === "movie"){
                
                //conditiondal statement to check if the status code is ER_SUCCESS_MATCH or NOT for the genre slot              
                if (genre_status === "ER_SUCCESS_MATCH"){
                    
                    //to capture the user provided value for the genre slot
                    const genre = handlerInput.requestEnvelope.request.intent.slots.genre.value;
                    
                    //to capture the canonical value of the genre slot
                    const genre_res = handlerInput.requestEnvelope.request.intent.slots.genre.resolutions.
                                      resolutionsPerAuthority[0].values[0].value.name;
                       
                     speakOutput = "Since you asked for " + genre + " " +  category + " I would reccomend you to watch " + 
                                    movie[genre_res][Math.floor((Math.floor(Math.random() * 10))/2)] 
                                    + ". So tell me, what do you study?";
                     
                } else {
                    //speech text if the user said a 'genre' that is not in the list of give array
                     speakOutput = "I don't know that genre. Please try another. "
                }
                
            } else if (category_res === "songs"){
                
                //conditiondal statement to check if the status code is ER_SUCCESS_MATCH or NOT for the genre slot              
                if (genre_status === "ER_SUCCESS_MATCH"){
                
                    //to capture the user provided value for the genre slot
                    const genre = handlerInput.requestEnvelope.request.intent.slots.genre.value;
                    
                    //to capture the canonical value of the genre slot
                    const genre_res = handlerInput.requestEnvelope.request.intent.slots.genre.resolutions.
                                      resolutionsPerAuthority[0].values[0].value.name;
                       
                        speakOutput = "I love " + genre + " songs too. I think we have the same taste. <break time = '700ms'/>" 
                                      + "Try listening to " + songs[genre_res][Math.floor((Math.floor(Math.random() * 10))/2)] 
                                      + ". So tell me, what do you study?";
                
                }else {
                    //speech text if the user said a 'genre' that is not in the list of give array
                     speakOutput = "I don't know songs in that genre. Please try another. "
                }
        } 
        
    } else {
            //speech text if the user asked for a suggestion other than a movie or a song
             speakOutput = "Ask me to reccomend movie or songs"
        }      
    return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }        
};

//intent to initiate dialog delegation
const ConfirmStudyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED'; //to confirm that the dialog state is 'not' COMPLETED
    },
    handle(handlerInput) {
        let intent = handlerInput.requestEnvelope.intent;
        return handlerInput.responseBuilder
            .addDelegateDirective(intent)
            .getResponse();
    }        
};

//handler when only the university slot is filled
const OnlyUniversityGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && !handlerInput.requestEnvelope.request.intent.slots.degree.value
            && !handlerInput.requestEnvelope.request.intent.slots.education.value
            && handlerInput.requestEnvelope.request.intent.slots.university.value;
            
    },handle(handlerInput){
        
        //to capture the user-provided value for the university slot
        const university = handlerInput.requestEnvelope.request.intent.slots.university.value;
    
    return handlerInput.responseBuilder
            .speak(`What degree are you studying for at ${university}`)
            .reprompt('for what degree?')
            .addElicitSlotDirective('degree') //to elicit 'degree' slot
            .getResponse();
    }        
};

//handler when only the degree slot is filled
const OnlyDegreeGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.intent.slots.degree.value
            && !handlerInput.requestEnvelope.request.intent.slots.education.value
            && !handlerInput.requestEnvelope.request.intent.slots.university.value;
    },
    handle(handlerInput){
    
        //to capture the user-provided value for the degree slot
        const degree = handlerInput.requestEnvelope.request.intent.slots.university.value;
    
    return handlerInput.responseBuilder
            .speak(`What are you specializing in?`)
            .reprompt(degree + ' specialzing in?')
            .addElicitSlotDirective('education') //to elicit education slot
            .getResponse();
    }        
};

//handler when only the education slot is filled
const OnlyEducationGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && !handlerInput.requestEnvelope.request.intent.slots.degree.value
            && handlerInput.requestEnvelope.request.intent.slots.education.value
            && !handlerInput.requestEnvelope.request.intent.slots.university.value;
    },
    handle(handlerInput){
    
         //to capture the user-provided value for the degree slot
        const education = handlerInput.requestEnvelope.request.intent.slots.education.value;
    
    return handlerInput.responseBuilder
            .speak(`At which university?`)
            .reprompt('At which university?')
            .addElicitSlotDirective('university') //to elicit university slot
            .getResponse();
    }        
};

//handler when only the university & degree slot is filled
const UniversityDegreeGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.intent.slots.degree.value
            && !handlerInput.requestEnvelope.request.intent.slots.education.value
            && handlerInput.requestEnvelope.request.intent.slots.university.value;
    },
    handle(handlerInput){
        
    return handlerInput.responseBuilder
            .speak(`What are you specializing in?`)
            .reprompt('What are you specializing in?')
            .addElicitSlotDirective('education') //to elicit education slot
            .getResponse();
    }        
};

//handler when only the education & degree slot is filled
const DegreeEducationGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.intent.slots.degree.value
            && handlerInput.requestEnvelope.request.intent.slots.education.value
            && !handlerInput.requestEnvelope.request.intent.slots.university.value;
    },
    handle(handlerInput){
        
    return handlerInput.responseBuilder
            .speak(`At which university?`)
            .reprompt('At which university?')
            .addElicitSlotDirective('university') //to elicit university slot
            .getResponse();
    }        
};

//handler when only the university & education slot is filled
const EducationUniversityGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && !handlerInput.requestEnvelope.request.intent.slots.degree.value
            && handlerInput.requestEnvelope.request.intent.slots.education.value
            && handlerInput.requestEnvelope.request.intent.slots.university.value;
    },handle(handlerInput){
        
    return handlerInput.responseBuilder
            .speak(`Nice. For what degree?`)
            .reprompt('Nice. For what degree?')
            .addElicitSlotDirective('degree') //to elicit university slot
            .getResponse();
    }        
};

//handler when ALL the SLOTS are filled 'and' we need to "confirm" the UNIVERSITY slot
const AllGivenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.intent.slots.degree.value
            && handlerInput.requestEnvelope.request.intent.slots.education.value
            && handlerInput.requestEnvelope.request.intent.slots.university.value
            && handlerInput.requestEnvelope.request.intent.slots.university.confirmationStatus === "NONE"; //to confirm that the confirmation status of university slot is NONE
    },
    handle(handlerInput){
        
            //to capture the user-provided value for the degree, education and university slot
             const degree = handlerInput.requestEnvelope.request.intent.slots.degree.value
             const education = handlerInput.requestEnvelope.request.intent.slots.education.value
             const university = handlerInput.requestEnvelope.request.intent.slots.university.value
             
             //speech text to confirm the university SLOT!
             const speakOutput = `So you are studying ${education} for ${degree} at ${university} huh?`;
             
    return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addConfirmSlotDirective('university') //to confirm the university slot value
            .getResponse();
    }        
};

//The final handler to give the study intent's response, when ALL the slot values are filled and dialogState is COMPELTED
const StudyIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StudyIntent'
            && handlerInput.requestEnvelope.request.dialogState === 'COMPLETED';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("I am so glad that you are working so hard towards your career! Keep it up! All the very best for your future!")
            .getResponse();
    }        
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'I can suggest you movies and songs';

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

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CategoryIntentHandler,
        ConfirmStudyIntentHandler,
        OnlyUniversityGivenIntentHandler,
        OnlyDegreeGivenIntentHandler,
        OnlyEducationGivenIntentHandler,
        UniversityDegreeGivenIntentHandler,
        DegreeEducationGivenIntentHandler,
        EducationUniversityGivenIntentHandler,
        AllGivenIntentHandler,
        StudyIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, 
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();


