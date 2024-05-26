import axios from "axios";


export const sendRequest=async(message,history) => {

try {
    
    const data = await axios.post("http://localhost:3000/sendMsg",{
        message: message,
        history: history,
    });
    const text = data.data;

    return text;
} catch (error) {
    console.log(error);
}


    
};


