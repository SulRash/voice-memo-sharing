const recordButton = document.getElementById('recordButton');
let isRecording = false;
let chunks = [];
let mediaRecorder;

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = saveAudio;
    mediaRecorder.start();
  } catch (err) {
    console.error('Error starting recording:', err);
  }
}

function stopRecording() {
  mediaRecorder.stop();
}

function saveAudio() {
  const blob = new Blob(chunks, { type: 'audio/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my_voice_memo.webm';
  a.click();
  URL.revokeObjectURL(url);
  chunks = [];
}

recordButton.addEventListener('click', () => {
    if (isRecording) {
      stopRecording();
      recordButton.textContent = '🎙';
    } else {
      startRecording();
      recordButton.textContent = '⏹';
    }
    isRecording = !isRecording;
  });
  
function shareAudio() {
    if (!navigator.share) {
      alert('Sharing is not supported on this device');
      return;
    }
  
    const title = 'My Voice Memo';
    const text = 'Check out my voice memo!';
    const url = window.location.href;
  
    navigator.share({ title, text, url }).catch((error) => {
      console.error('Error sharing:', error);
    });
  }