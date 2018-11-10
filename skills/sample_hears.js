let trello = require('./../components/trello/trello')(process.env.trello_key, process.env.trello_token);

module.exports = function(controller) {

    controller.hears(['^/taskbot'], 'direct_message,direct_mention', function(bot, message){
        console.log("In the taskbot section");
        bot.startConversation(message, function(err, convo){
            
            let listID;
            let userID;
            let boardID;

            convo.addQuestion({text: "Lets create a card! Please enter a trello username."}, function(res, convo){
                convo.gotoThread('board-select');
            }, {key: "name"}, 'default');

            convo.addMessage("That person could not be found in trello", 'person-error');
            convo.addMessage("That board could not be found in trello", 'board-error');
            convo.addMessage("That list could not be found in trello", 'list-error');
            convo.addMessage("Congrats you have created a card on trello!", 'completed');

            convo.beforeThread('board-select', function(convo, next){
                let name = convo.extractResponse('name');
                let getUserId = trello.makeRequest('get', '/1/members/'+name);
                getUserId.then((user) => {
                    if(user){
                        convo.setVar('userID', user.id);
                        userID = user.id;
                        let boards = trello.getBoards(user.id);
                        boards.then((boards) => {
                            let boardString = "";
                            for(let i = 0; i < boards.length; i++){
                                if(!boards[i].closed){
                                    boardString += (i + 1) + ". " + boards[i].name + "\n";
                                }
                            }
                            convo.setVar('boards', boardString);
                            next();
                        });
                    }else{
                        convo.gotoThread('person-error');
                        next("Error");
                    }
                })
                let boards = trello.getM
            });

            convo.addQuestion({text: "Please copy the name of the board and enter it in here. \n{{vars.boards}}"}, function(res, convo){
                convo.gotoThread('list-select');
            }, {key: "board"}, 'board-select');

            convo.beforeThread('list-select', function(convo, next){
                let boardName = convo.extractResponse("board");
                let boards = trello.getBoards(userID);
                boards.then((boards) => {
                    let found = false;
                    for(let i = 0; i < boards.length; i++){
                        if(boards[i].name == boardName){
                            found = true;
                            convo.setVar('boardID', boards[i].id);
                            boardID = boards[i].id;
                        }
                    }
                    if(!found){
                        convo.gotoThread('board-error');
                        next('Error');
                    }else{
                        let lists = trello.getListsOnBoard(boardID);
                        lists.then((list) => {
                            let listsString = "";
                            for(let i = 0; i < list.length; i++){
                                listsString += (i + 1) + ". " + list[i].name + "\n";
                            }
                            convo.setVar('listString', listsString);
                            next();
                        });
                    }
                });
            });

            convo.addQuestion({text: "Please copy the name of the board and enter it here. If there are no lists please add a new list on your board. \n{{vars.listString}}"}, function(res, convo){
                convo.gotoThread('card-name');
            }, {key: 'list'}, 'list-select');

            convo.beforeThread('card-name', function(convo, next){
                let listName = convo.extractResponse('list');
                let lists = trello.getListsOnBoard(boardID);
                lists.then((list) => {
                    let found = false;
                    for(let i = 0; i < list.length; i++){
                        if(list[i].name == listName){
                            found = true;
                            convo.setVar("listID", list[i].id);
                            listID = list[i].id;
                        }                        
                    }
                    if(found){
                        next();
                    }else{
                        convo.gotoThread('list-error');
                        next("Error");
                    }
                });
            });

            convo.addQuestion({text: "Please enter in a name for the new card"}, function(res, convo){
                convo.gotoThread('card-description');
            }, {key: 'card-name'}, 'card-name');

            convo.addQuestion({text: "Please enter in a description for the new card"}, function(res, convo){
                convo.gotoThread('completed');
            }, {key: 'card-description'}, 'card-description');

            convo.beforeThread('completed', function(convo, next){
                let name = convo.extractResponse('card-name');
                let description = convo.extractResponse('card-description');
                let list = listID;
                let create = trello.addCard(name, description, list);
                create.then((res) => {
                    next();
                });
            });

        });
    });

};
//5b8f448cadad0929131abb61