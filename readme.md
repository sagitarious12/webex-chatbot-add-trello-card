# Webex Chatbot Trello Add Card

this package was created with the intent of teaching how to make integrations into Cisco Webex Chat system. 

### What does this do?
This specific integration will allow any person to add a card onto a trello board.

## Installation

First thing that you need to do is go to [Botkit studio](https://studio.botkit.ai/login) in order to get an access token to use [BotKit](https://botkit.ai/docs/). After you have finished creating a new bot, make sure that you note the email address that you added for the bot because it will be used later on. Once you get an access token, that needs to be placed in the .env file as the access_token.

Second thing that you need to do is go to [Trello](https://trello.com/app-key) to get a key for your application. Also where it says "you can manually generate a Token" click on the link and get a token for this application. Those two fields need to be saved under the trello_key and the trello_token fields of the .env file.

Third thing that you need to do is install [Heroku](https://devcenter.heroku.com/articles/heroku-cli) on your computer. After installation, go onto your command prompt and navigate to your repository location. Then type "heroku create". It will then generate a public location for your application to be hosted so that Cisco Webex can access it. Place the address that was just created into the public_address field of the .env file.

Fourth thing that you need to do is fill in the remaining field in the .env file. the secret field is any password that you want.

Fifth thing that you need to do is go into your [Heroku Dashboard](https://dashboard.heroku.com/apps) and click on the app that you just created. Go into the settings of the application and click on "Reveal Config Vars" This will be where you need to add each of the fields from the .env file into these locations. Add new fields for each .env line.

Sixth thing that you need to do is go back into the command prompt and type "git push heroku master" this will now upload the app and build it and run it.

Last thing that you need to do is download the Cisco Webex Desktop platform and install and run it. Once it is open, click on the plus button on the top left to the right of the search bar and click on "contact a person". in the search box that appears, you will need to type the email address that you noted down in step one. This will start a new chat with the bot!

## Usage

The only thing that this project is currently capable of doing is creating a new card on trello, in order to start the process of creating a card, you need to just type:

```/taskbot```

This will initiate the process of creating a new card on trello and the chatbot will do the rest of the teaching!

## Pull Requests

If you wish to contribute to this package, please clone the repository and create a pull request. Thank you so much!