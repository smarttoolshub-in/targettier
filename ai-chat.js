// TargetTire AI Assistant Script with Gemini API Integration
const GEMINI_API_KEY = "AQ.Ab8RN6L4NkIvodo2czpQgD8lZG8cr9EF7grWkaPo-p6LFBAx-Q";

function initAIChatWidget() {
    const chatHTML = `
        <div id="ai-chat-container" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999; font-family: 'Plus Jakarta Sans', sans-serif;">
            <button onclick="toggleAIChatWindow()" style="background: linear-gradient(135deg, #6366f1, #14b8a6); color: white; border: none; padding: 12px 20px; border-radius: 50px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-robot"></i> AI परीक्षा गुरु
            </button>
            <div id="ai-chat-window" class="hidden" style="position: absolute; bottom: 60px; left: 0; width: 320px; height: 420px; background: #131b2e; border: 1px solid #1e293b; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; display: none;">
                <div style="background: #1e293b; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; color: white; font-weight: bold; font-size: 13px;">
                    <span>🤖 TargetTire AI Assistant</span>
                    <button onclick="toggleAIChatWindow()" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div id="ai-chat-messages" style="flex-grow: 1; padding: 12px; overflow-y: auto; font-size: 12px; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: #1e293b; padding: 8px 12px; border-radius: 10px; max-width: 85%;">नमस्ते! मैं आपका AI परीक्षा गुरु हूँ। SSC, Railway, Banking या किसी भी सवाल के बारे में मुझसे पूछें।</div>
                </div>
                <div style="padding: 10px; background: #0b0f19; border-top: 1px solid #1e293b; display: flex; gap: 6px;">
                    <input type="text" id="ai-user-input" placeholder="यहाँ अपना सवाल लिखें..." style="flex-grow: 1; background: #131b2e; border: 1px solid #1e293b; padding: 8px; border-radius: 8px; color: white; font-size: 12px; outline: none;" onkeypress="if(event.key === 'Enter') sendAIQuery()">
                    <button onclick="sendAIQuery()" style="background: #6366f1; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-weight: bold;"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = chatHTML;
    document.body.appendChild(div);
}

function toggleAIChatWindow() {
    const win = document.getElementById('ai-chat-window');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}

async function sendAIQuery() {
    const input = document.getElementById('ai-user-input');
    const msgBox = document.getElementById('ai-chat-messages');
    const query = input.value.trim();
    if (!query) return;

    msgBox.innerHTML += `<div style="background: #6366f1; color: white; padding: 8px 12px; border-radius: 10px; align-self: flex-end; max-width: 85%;">${query}</div>`;
    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    msgBox.innerHTML += `<div id="${loadingId}" style="background: #1e293b; color: #94a3b8; padding: 8px 12px; border-radius: 10px; max-width: 85%;">AI सोच रहा है...</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "You are an expert AI tutor for competitive exam platform TargetTire (SSC, Railway, Banking, UPSC). Answer the student's question accurately in Hindi or English as requested: " + query }] }]
            })
        });

        const data = await response.json();
        document.getElementById(loadingId).remove();

        let reply = "क्षमा करें, अभी उत्तर प्राप्त करने में कुछ समस्या हो रही है।";
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            reply = data.candidates[0].content.parts[0].text;
        }

        msgBox.innerHTML += `<div style="background: #1e293b; color: #cbd5e1; padding: 8px 12px; border-radius: 10px; max-width: 85%; line-height: 1.4;">${reply}</div>`;
        msgBox.scrollTop = msgBox.scrollHeight;
    } catch (error) {
        document.getElementById(loadingId).remove();
        msgBox.innerHTML += `<div style="background: #1e293b; color: #f87171; padding: 8px 12px; border-radius: 10px; max-width: 85%;">कनेक्शन त्रुटि! कृपया अपनी इंटरनेट या API Key जांचें।</div>`;
    }
}

window.addEventListener('DOMContentLoaded', initAIChatWidget);
