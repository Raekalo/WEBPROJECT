let friendListContainer = document.querySelector('.friend-list ul');
let messagesContainer = document.querySelector('.messages-container');
let messageInput = document.getElementById('message-input');
let sendButton = document.getElementById('send-button');
let friendNameHeader = document.getElementById('friend-name');
let friendProfilePicture = document.getElementById('friend-profile-picture');

const friendData = {
    'Raed Kalo': { messages: ['Hi! How\'s it going?'], picture: 'images/friendsimages/Raed.jpg' },
    'Ragheed Hashisho': { messages: ['Hello! What\'s new?'], picture: 'images/friendsimages/Ragheed.jpg' },
    'Hussam Hariri': { messages: ['Good morning!'], picture: 'images/friendsimages/Hussam.jpg' }
};


let defaultReply = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
let currentFriend = 'Raed Kalo';

initializeFriends();
updateFriend(currentFriend);

friendListContainer.addEventListener('click', (e) => {
    if (e.target.closest('.friend-profile')) {
        let selectedFriend = e.target.closest('.friend-profile').dataset.name;
        if (currentFriend !== selectedFriend) {
            document.querySelector('.friend-profile.active').classList.remove('active');
            e.target.closest('.friend-profile').classList.add('active');
            currentFriend = selectedFriend;
            updateFriend(currentFriend);
        }
    }
});

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage();
});

function initializeFriends() {
    friendListContainer.innerHTML = '';
    Object.keys(friendData).forEach((friend, index) => {
        let li = document.createElement('li');
        li.classList.add('friend-profile');
        li.dataset.name = friend;
        if (index === 0) li.classList.add('active');
        li.innerHTML = `
            <img src="${friendData[friend].picture}" alt="Profile Picture">
            <span>${friend}</span>
            <div class="icon-buttons">
                <button>📞</button>
                <button>🎥</button>
            </div>
        `;
        friendListContainer.appendChild(li);
    });
}

function updateFriend(friendName) {
    friendNameHeader.textContent = friendName;
    friendProfilePicture.src = friendData[friendName].picture;
    messagesContainer.innerHTML = '';
    friendData[friendName].messages.forEach(msg => addMessage(msg, 'received'));
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    addMessage(text, 'sent');
    messageInput.value = '';
    friendData[currentFriend].messages.push(text);
    setTimeout(() => {
        const reply = defaultReply;
        addMessage(reply, 'received');
        friendData[currentFriend].messages.push(reply);
    }, 1000);
}

function addMessage(message, type) {
    let msgElement = document.createElement('div');
    msgElement.classList.add('message', type);
    msgElement.textContent = message;
    messagesContainer.appendChild(msgElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
    let blockButtons = document.querySelectorAll('.block-button');
    let blockedUsersContainer = document.getElementById('blocked-users');
    let blockedList = document.getElementById('blocked-list');

  
});
document.getElementById('search-friends').addEventListener('input', function () {
    let query = this.value.toLowerCase();
    document.querySelectorAll('.friend-profile').forEach(profile => {
        const name = profile.dataset.name.toLowerCase(); 
        if (!name.includes(query)) {
            profile.style.display = 'none'; 
        } else {
            profile.style.display = 'flex'; 
        }
    });
});

let blockedUsersContainer = document.getElementById('blocked-users');
let blockedList = document.getElementById('blocked-list');
let blockButton = document.getElementById('block-button');

blockButton.addEventListener('click', () => {
    blockUser(currentFriend);
});

function blockUser(friendName) {
    let friendItem = document.querySelector(`.friend-profile[data-name="${friendName}"]`);
    if (friendItem) {
        friendItem.remove();
    }
    let li = document.createElement('li');
    li.textContent = friendName;
    blockedList.appendChild(li);
    delete friendData[friendName];
    let remainingFriends = Object.keys(friendData);
    if (remainingFriends.length > 0) {
        currentFriend = remainingFriends[0];
        document.querySelectorAll('.friend-profile').forEach(profile => {
            profile.classList.remove('active');
        });
        document.querySelector(`.friend-profile[data-name="${currentFriend}"]`).classList.add('active');
        updateFriend(currentFriend);
    } else {
        currentFriend = null;
        friendNameHeader.textContent = 'No Friend Selected';
        friendProfilePicture.src = '';
        messagesContainer.innerHTML = '';
    }
    blockedUsersContainer.style.display = 'block';
}

$(document).ready(function (){
    if ($(window).width() < 700){

    }
})