import {dbConnectionLogic, dbLogicTwo} from '../config/database.mjs'; 

const sendingMessagesController = async(request, response) =>{
    try{
        const {user, message, receiver} = request.body;

        console.log(`Sender: ${user}, Message sent: ${message}, Receiver: ${receiver}`);
        response.status(200).send('Message sent!');

    }catch(error){
        console.error("Error receiving that message: ", error);
        response.status(500).send("Message not sent", error.message);
    }


}

export {sendingMessagesController};