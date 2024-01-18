const chat = document.querySelector('.chat');
const inpClient = document.getElementById('chat-input');
const messages = document.querySelector('.chat-messages');



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
        'Хотите я вам расскажу анектод?'

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
const SendAnswerBot = function () {
    let message = document.createElement('div');
    let message_text = document.createElement('div');
    let massages_time = document.createElement('div');
    message.className = 'massages';
    message_text.className = 'massages_text';
    message_text.textContent = `${GetAnswerRandom()}`;
    massages_time.className = 'massages_time';
    massages_time.textContent = `${GetCurrentTime()}`;
    message.append(message_text, massages_time);
    messages.append(message)

    if (auto) {
        scrollToBottom();
    }

}

const SendMessageClient = function (event) {
    if (event.code === 'Enter' && event.target.value.trim() !== '') {
        let message = document.createElement('div');
        let message_text = document.createElement('div');
        let massages_time = document.createElement('div');
        message.className = 'massages massages__client';
        message_text.className = 'massages_text';
        message_text.textContent = `${event.target.value}`;
        massages_time.className = 'massages_time';
        massages_time.textContent = `${GetCurrentTime()}`;
        message.append(message_text, massages_time);
        messages.append(message)
        console.log(message);

       
        event.target.value = '';

        SendAnswerBot();
        if (auto) {
            scrollToBottom();
        }

    }
}



messages.addEventListener('scroll', autoScroll)
chat.addEventListener('click', ActiveChat);
inpClient.addEventListener('keyup', SendMessageClient)