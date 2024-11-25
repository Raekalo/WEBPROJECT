const friendListContainer = document.querySelector('.friend-list ul');
const messagesContainer = document.querySelector('.messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const friendNameHeader = document.getElementById('friend-name');
const friendProfilePicture = document.getElementById('friend-profile-picture');

const friendData = {
    'Raed Kalo': { messages: ['Hi! How’s it going?'], picture: '../images/friendsimages/Raed.jpg' },
    'Ragheed Hashisho': { messages: ['Hello! What’s new?'], picture: '../images/friendsimages/Ragheed.jpg' },
    'Hussam Hariri': { messages: ['Good morning!'], picture: '../images/friendsimages/Hussam.jpg' }
};

const defaultReply = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
let currentFriend = 'Raed Kalo';

initializeFriends();
updateFriend(currentFriend);

friendListContainer.addEventListener('click', (e) => {
    if (e.target.closest('.friend-profile')) {
        const selectedFriend = e.target.closest('.friend-profile').dataset.name;
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
        const li = document.createElement('li');
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
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type);
    msgElement.textContent = message;
    messagesContainer.appendChild(msgElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
    const blockButtons = document.querySelectorAll('.block-button');
    const blockedUsersContainer = document.getElementById('blocked-users');
    const blockedList = document.getElementById('blocked-list');

  
});
document.getElementById('search-friends').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.friend-profile').forEach(profile => {
        const name = profile.dataset.name.toLowerCase(); 
        if (!name.includes(query)) {
            profile.style.display = 'none'; 
        } else {
            profile.style.display = 'flex'; 
        }
    });
});

const blockedUsersContainer = document.getElementById('blocked-users');
const blockedList = document.getElementById('blocked-list');
const blockButton = document.getElementById('block-button');

blockButton.addEventListener('click', () => {
    blockUser(currentFriend);
});

function blockUser(friendName) {

    const friendItem = document.querySelector(`.friend-profile[data-name="${friendName}"]`);
    if (friendItem) {
        friendItem.remove();
    }


    const li = document.createElement('li');
    li.textContent = friendName;
    blockedList.appendChild(li);

  
    delete friendData[friendName];

   
    blockedUsersContainer.style.display = 'block';

    currentFriend = null;
    friendNameHeader.textContent = 'No Friend Selected';
    friendProfilePicture.src = '';
    messagesContainer.innerHTML = '';
}

