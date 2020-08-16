
//require the ask-sdk-core
const Alexa = require('ask-sdk-core');

//array containing "person ID's of different user's voice profiles"
const id=[
    'amzn1.ask.person.AEQHACHVBQBWYFN6Y7YFXYSAQIOCR75DRZMLRPBZJZAIFJH7ZK2TI4CT6VPPPDVCHZ5IIR5W77OVX7VU2P3D6HIL27GZKAAPX4IN6KVV',
    'amzn1.ask.person.AEQHACHVBQBWYFN6Y7YFXYSAQIOCR75DRZMLRPBZJZAIFJH7ZK2TJALZIBAIDOJ67D5JNMZL5NE7USXXCPFBS672XGFPQZDCZZJ37VUZ']

//array of key-value pairs containing "zodiac sign" as 'keys' and "horoscope phrases" as 'values'
const zod={
    
'Aries':
['You might encounter some rather disturbing opinions or emotions from a friend, neighbor, or relative',
'This person could be upset over something and not communicating his or her feelings.',
'It isnt appropriate to try to coax this person into sharing with you now. They are not upset with you, but they might be if you push!',
'you have already planned on what you desire and are moving towards it',
'A date of romantic nature may turn out to be interesting or it may lead to a controversy; you have to decide on it.'],

'Taurus':
['Some gossip about a friend could reach you today, Taurus, and it might seem a bit shocking at first.',
'This day is meant for taking some time out from your busy schedule, and seeking some fun and relaxation.',
'It is possible that you will be getting together with your friends and family members for a fun filled evening followed by a great dinner and a late night movie',
'The strong urge to eat hot, spicy and delicious dishes is surely going to get the better of you. So go ahead and gave fun',
'You are articulate and communicative and these qualities have got you where you are today and will definitely take you further'],

'Gemini':
['Today you might find that others are turning to you for advice today and you are honored to be in such a position',
'You face a hectic and demanding day today',
'You will spend your entire day wondering how best to channelise your energy and enthusiasm',
'You may be prone to extreme mood swings',
'There can be a tendency for others to misinterpret what you are saying or for you to misrepresent your feelings'],

'cancer':
['Today you might take up some form of esoteric study, such as astrology, numerology, or alchemy that seems incomprehensible to you at first',
'dont worry if you have to go over something several times. You have the brains to do it. Now just put in the time.',
'You will tend to try new recipes at home. Family members will take advantage and enjoy it',
'Arrival of guests will bring in an air of festivity and happiness',
'You will indulge in pastimes'],

'Leo':
['A friend might be in such a dour mood that you wonder if this is the same person you know and love',
'make sure your friend knows you are there if needed.',
'You will be filled with extra-ordinary self-confidence and will be able to take on huge risks',
'You will square off against any obstacles in your way using your entire might. While it is a good day for you, keep a curb on your speculations',
'Sportspersons will be able to make a lot of progress in their fields'],

'Virgo':
['You are going to have a spectacular day. Dont forget to thank everyone responsible for your heights today',
'your present business views will do you a world of good',
'You will bring up new ideas and better methods of tackling the challenges on hand',
'In all likelihood, you will be eager to grab the monetary challenges that come your way, as they only enhance your desire for success',
'A friend or romantic partner might need your advice, and want to discuss a few things that you dont really understand'],

'Libra':
['Get ready for a roller coaster day Libra!',
'To get mental peace keep yourself occupied with religious or spiritual activity',
'today you will get worried over petty matters and be tense',
'Everyone is different. Dont change your habits for practices that dont feel right',
'Today you might read a book on exercise or nutrition that seems a bit unsettling'],

'scorpio':
['All the good deeds you had done will bare a fruit today',
'you will soon realise that the time once gone, never comes back and so, you make up for the lost time by beginning the new chapter of your life from today itself',
'You may be caught up in a whirlpool of thoughts and nostalgia',
'You may be in a mood to build castles in the air today',
'Memories and emotions welling up from the past might excite your creative impulses today'],

'Saggitarius':
['Its time to guard your reputation. Mind your every step',
'watch your steps, as the initial stages of a relationship may be fragile and need to handled with care',
'There are chances that your heart will find its partner, forcing you to fall in love',
'A day to full of caution',
'A subject you are researching, perhaps for a class or workshop, might prove more difficult than you expected <break time="500ms"/> so done give up'],

'Capricorn':
['You have learnt the art of time management. So, you have properly lined up your priorities and success is waiting for you.',
'You are busy as a beaver. It is extremely difficult for you to think for yourself as you are all tied up by the demands of your work.',
'even though you have help, you will probably end up doing most of the work yourself',
' This person is probably overly burdened with worry and just needs some kind words and a little advice',
'A housemate or family member may offer to help you with some chores around the house'],

'Aquarius':
['Get yourself in the top gear, you will surely succeed. Good luck',
'Dont get disheartened if there are some obstacles on your path; you are fully armed to face the challenges and come out triumphant.',
'You will hit the bulls eye, today. From the smallest to the biggest, all of your plans will turn into reality.',
'After a morning of intense concentration and jumping through bureaucratic hoops that lead to the occasional dead end, reward yourself with something less tedious',
'Filling out forms regarding your finances could be a real drag for you todayAfter a morning of intense concentration and jumping through bureaucratic hoops that lead to the occasional dead end, reward yourself with something less tedious'],

'pisces':
['No conflicts in personal life are indicated. Overall, a progressive and pleasant day awaits',
'Freelancers could find interesting projects falling into their laps. Businesses are likely to see a surge in profits',
'For those looking for a promotion at the work-place, now is the time to ask for it',
'Dont be afraid to ask someone who has a bit more expertise than you to explain what you are trying to do.',
'A contract of some kind might require your careful consideration today']
    
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    var speakOutput;
    const person = handlerInput.requestEnvelope.context.System.person;
    
    //conditional statement to check of 'person object' is present or not
    if(person)
    {
        const personId = handlerInput.requestEnvelope.context.System.person.personId;
        
        //conditional statement to check whose 'person ID' it is
        if(personId===id[0]){
            
            speakOutput = "Welcome back <alexa:name type=\"first\" personId=\"" + personId + "\"/>" +
            ". Your horoscope for today is <break time='1s'/> " + zod['scorpio'][Math.floor((Math.floor(Math.random() * 10))/2)];
            
        }else if(personId===id[1])
        {
            speakOutput = "Welcome back <alexa:name type=\"first\" personId=\"" + personId + "\"/>" +
            ". Your horoscope for today is <break time='1s'/> " + zod['Capricorn'][Math.floor((Math.floor(Math.random() * 10))/2)];
        }
        
    }else{
        //speech text for users who are not "recognized by Alexa"
        speakOutput = 'Hey,<break time="400ms"/> I dont recognize you. Please tell me your zodiac sign'
    }
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
  }
};

//handler for generic users
const HoroscopeIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HoroscopeIntent';
  },
  handle(handlerInput) {
    
      const zodiac = handlerInput.requestEnvelope.request.intent.slots.zodiac.value;
      
      const speakOutput = "Your horoscope for today is <break time='400ms'/>" 
                            + zod[zodiac][Math.floor((Math.floor(Math.random() * 10))/2)];
      
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
        const speakOutput = 'You can say your zodiac sign to me';

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

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HoroscopeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler      //make sure IntentReflector is last
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();