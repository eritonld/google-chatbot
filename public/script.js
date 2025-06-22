const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Tampilkan loading sementara
  const loadingMsg = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    
    // Hapus pesan loading dan ganti dengan jawaban dari API
    chatBox.removeChild(loadingMsg);
    appendMessage('bot', data.reply);
  } catch (error) {
    console.error(error);
    chatBox.removeChild(loadingMsg);
    appendMessage('bot', 'Failed to fetch response from Gemini.');
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // return element jika perlu dihapus nanti
}