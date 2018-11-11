# Webex Chatbot Trello Add Card

this package was created with the intent of teaching how to make integrations into Cisco Webex Chat system. 

### What does this do?
This specific integration will allow any person to add a card onto a trello board. This bot works by 'listening' for specific keywords and then starting a conversation based on that keyword. Then it will start a conversation in order to gather the required information to be able to create a card on your trello account. When you have completed the small conversation that you have with this chatbot, you will now have a new card on one of your lists in trello.

## Installation

### First
Go to [Botkit studio](https://studio.botkit.ai/login) in order to get an access token to use [BotKit](https://botkit.ai/docs/). Once you get an access token, that needs to be placed in the .env file as the access_token.

![Building a bot with Botkit][Build-A-Bot-Botkit]
![Get the access token from Botkit][botkit-access-key]

### Second
Download the [Cisco Webex Desktop platform](https://www.webex.com/downloads.html) and install and run it. Once you get to the enter your work email address page just type in any email address and continue with creating a password.

![Login page on Webex Platform][webex-opening-screen]

Next thing that you need to do is go to the [Cisco Webex Developer Page](https://developer.webex.com/docs/bots) and log in with the email address that you just created on their desktop platform to register a new bot. After you have finished creating a new bot, make sure that you note the email address that you added for the bot because it will be used later on.

![Webex add bot button][Cisco-Developer-Create-Bot]
![Cisco Developer Create a Bot Form with the email][cisco-developer-create-bot-form-with-email]

### Third
Go to [Trello](https://trello.com/app-key) and make sure that you are logged in and this link will take you to get a key for your application. Also where it says "you can manually generate a Token" click on the link and get a token for this application. Those two fields need to be saved under the trello_key and the trello_token fields of the .env file.

![Trello Generate API key][trello-developer-api-key-with-token-button]

### Fourth
Install [Heroku](https://devcenter.heroku.com/articles/heroku-cli) on your computer. Heroku is a platform that allows you to upload node.js and Express projects to host them as easily as using Git. After installation, go onto your command prompt and navigate to your repository location. Then type "heroku create". It will then generate a public location for your application to be hosted so that Cisco Webex can access it. Place the address that was just created into the public_address field of the .env file.

### Fifth
Fill in the last field in the .env file. the secret field is any password that you want.

### Sixth
Go into your [Heroku Dashboard](https://dashboard.heroku.com/apps) and click on the app that you just created. Go into the settings of the application and click on "Reveal Config Vars" This will be where you need to add each of the fields from the .env file into these locations. Add new fields for each .env line.

![Heroku Config variables][heroku-config]

### Seventh
Go back into the command prompt and type "git push heroku master" this will now upload the app and build it and run it.

### Eighth and Last
Open up the Cisco Webex Platform again. Once it is open, click on the plus button on the top left to the right of the search bar and click on "contact a person". in the search box that appears, you will need to type the email address that you noted down in step one. This will start a new chat with the bot!

![Webex Plus button add a new chat.][webex-add-button]

## Usage

The only thing that this project is currently capable of doing is creating a new card on trello, in order to start the process of creating a card, you need to just type:

```/taskbot```

This will initiate the process of creating a new card on trello and the chatbot will do the rest of the teaching!

## Example Code

this example shows how we can create a conversation with the bot and when they type `/taskbot`, this will then start with the question 'Please enter in a name for the new card' then it will wait for a response. Once you enter in a response, it will continue into the next 'Thread' or question and ask 'Please enter in a description for the new card' then again it will wait for a response. Then it will tell the conversation to go into the next 'Thread' but this time there is something that gets called before the 'completed' thread gets initialized, it will do a `beforeThread` function, where it will use `npm trello` to add a card onto the list that is provided for the `list` variable.

```javascript
convo.addQuestion({text: "Please enter in a name for the new card"}, function(res, convo){
    convo.gotoThread('card-description');
}, {key: 'card-name'}, 'default');

convo.addQuestion({text: "Please enter in a description for the new card"}, function(res, convo){
    convo.gotoThread('completed');
}, {key: 'card-description'}, 'card-description');

convo.beforeThread('completed', function(convo, next){
    let name = convo.extractResponse('card-name');
    let description = convo.extractResponse('card-description');
    let list = 'ENTER A LIST ID HERE';
    let create = trello.addCard(name, description, list);
    create.then((res) => {
        next();
    });
});

convo.addMessage("Congrats you have created a card on trello!", 'completed');
```

## Pull Requests

If you wish to contribute to this package, please clone the repository and create a pull request. Thank you so much!

[botkit-access-key]: https://worthenwebcom.files.wordpress.com/2018/11/botkit-access-key.png
[Build-A-Bot-Botkit]: https://worthenwebcom.files.wordpress.com/2018/11/build-a-bot-botkit.png
[Cisco-Developer-Create-Bot]: https://worthenwebcom.files.wordpress.com/2018/11/cisco-developer-create-bot.png
[cisco-developer-create-bot-form-with-email]: https://worthenwebcom.files.wordpress.com/2018/11/cisco-developer-create-bot-form-with-email.png
[webex-add-button]: https://worthenwebcom.files.wordpress.com/2018/11/webex-add-button.png
[webex-opening-screen]: https://worthenwebcom.files.wordpress.com/2018/11/webex-opening-screen.png
[heroku-config]: https://worthenwebcom.files.wordpress.com/2018/11/heroku-config-vars.png
[trello-developer-api-key-with-token-button]: https://worthenwebcom.files.wordpress.com/2018/11/trello-developer-api-key-with-token-button.png