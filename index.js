const chat = document.querySelector('.chat');
const inpClient = document.getElementById('chat-input');
const messages = document.querySelector('.chat-messages');
const btnSend = document.querySelector('.chat-input_send')

const ActiveChat = function () { 
    this.classList.add('chat_active');

}
const GetCurrentTime = function () {
    let data = new Date();
    let hours = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()
    let minutes = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()
    return hours + ':' + minutes
}

const GetAnswerRandom = function () {
    let answerBot = [
        'Добрый день, мы ещё не проснулись. Позвоните через 10 лет',
        'Кто тут?',
        'Где ваша совесть?',
        'Вы не купили ни одного товара для того, чтобы с нами так раговаривать!',
        'У нас нет настроения с вами разговаривать!',
        'Хотите я вам расскажу анектод?',
        'Возьмите Катю на работу пожалуйста!'

    ]
    return answerBot[Math.floor(Math.random() * (answerBot.length))]

}
function scrollToBottom() {
    let div = document.querySelector('.chat-messages_wrapper');
    div.scrollTop = div.scrollHeight;

}
let auto = true;
const autoScroll = function () {
    let scrollTop = this.scrollTop;
    let scrollHeight = this.scrollHeight;
    let height = this.clientHeight;

    if (auto) {
        if (scrollTop < scrollHeight - height) {
            auto = false;
        }
    } else {
        if (scrollTop + height > scrollHeight) {
            auto = true;
        }
    }
}

const createMessage = function (additionalСlass, text) {
    let message = document.createElement('div');
    let message_text = document.createElement('div');
    let massages_time = document.createElement('div');
    message.className = 'massages';
    if (additionalСlass) { 
        message.classList.add(additionalСlass)
    }
    message_text.className = 'massages_text';
    message_text.textContent = `${text}`;
    massages_time.className = 'massages_time';
    massages_time.textContent = `${GetCurrentTime()}`;
    message.append(message_text, massages_time);
    return message
}


const SendAnswerBot = function () {
    let messageBot = createMessage(null, GetAnswerRandom())
    messages.append(messageBot)
    if (auto) {
        scrollToBottom();
    }
}



const SendMessageClient = function (event) {
    if (event.code === 'Enter' && event.target.value.trim() !== '') {
        let messageClient = createMessage('massages__client', event.target.value)
        messages.append(messageClient)
        event.target.value = '';
        SendAnswerBot();
        if (auto) {
            scrollToBottom();
        }
    }
   
    
}
const SendMessageClientBtn = function () {
    let messageClient = createMessage('massages__client', inpClient.value)
    messages.append(messageClient)
    inpClient.value = '';
    SendAnswerBot();
    if (auto) {
        scrollToBottom();
    }
}



messages.addEventListener('scroll', autoScroll)
chat.addEventListener('click', ActiveChat);
btnSend.addEventListener('click', SendMessageClientBtn )
inpClient.addEventListener('keyup', SendMessageClient)
