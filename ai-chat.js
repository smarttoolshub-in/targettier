// TargetTire Smart Local AI Assistant (No API Key Required - Zero Error)
function initAIChatWidget() {
    const chatHTML = `
        <div id="ai-chat-container" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999; font-family: 'Plus Jakarta Sans', sans-serif;">
            <button onclick="toggleAIChatWindow()" style="background: linear-gradient(135deg, #6366f1, #14b8a6); color: white; border: none; padding: 12px 20px; border-radius: 50px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-robot"></i> AI परीक्षा गुरु
            </button>
            <div id="ai-chat-window" style="position: absolute; bottom: 60px; left: 0; width: 320px; height: 420px; background: #131b2e; border: 1px solid #1e293b; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: none; flex-direction: column; overflow: hidden;">
                <div style="background: #1e293b; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; color: white; font-weight: bold; font-size: 13px;">
                    <span>🤖 TargetTire AI Assistant</span>
                    <button onclick="toggleAIChatWindow()" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div id="ai-chat-messages" style="flex-grow: 1; padding: 12px; overflow-y: auto; font-size: 12px; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: #1e293b; padding: 8px 12px; border-radius: 10px; max-width: 85%;">नमस्ते! मैं आपका TargetTire AI परीक्षा गुरु हूँ। SSC, Railway, Banking, UPSC या किसी भी पढ़ाई से जुड़े सवाल के बारे में मुझसे पूछें!</div>
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

function sendAIQuery() {
    const input = document.getElementById('ai-user-input');
    const msgBox = document.getElementById('ai-chat-messages');
    const query = input.value.trim();
    if (!query) return;

    // यूजर का सवाल दिखाना
    msgBox.innerHTML += `<div style="background: #6366f1; color: white; padding: 8px 12px; border-radius: 10px; align-self: flex-end; max-width: 85%;">${query}</div>`;
    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;

    // टाइपिंग लोडिंग इफेक्ट
    const loadingId = 'loading-' + Date.now();
    msgBox.innerHTML += `<div id="${loadingId}" style="background: #1e293b; color: #94a3b8; padding: 8px 12px; border-radius: 10px; max-width: 85%;">AI सोच रहा है...</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;

    setTimeout(() => {
        document.getElementById(loadingId).remove();
        let reply = "TargetTire प्लेटफॉर्म पर आपका स्वागत है! अपनी परीक्षा की तैयारी जारी रखने के लिए Practice Hub या Mock Vault का उपयोग करें।";
        
        const qLower = query.toLowerCase();
        if (qLower.includes('cgl') || qLower.includes('ssc')) {
            reply = "📚 **SSC CGL परीक्षा जानकारी:**\nइसमें Tier-I और Tier-II परीक्षाएं होती हैं। Quantitative Aptitude, English Language, Reasoning और General Awareness इसके मुख्य विषय हैं। TargetTire पर इसके पूर्ण मॉक टेस्ट और PYQ उपलब्ध हैं।";
        } else if (qLower.includes('railway') || qLower.includes('rrb') || qLower.includes('ntpc')) {
            reply = "🚂 **Railway (RRB NTPC / Group D):**\nरेलवे परीक्षाओं में Mathematics, General Intelligence & Reasoning, और General Science सबसे महत्वपूर्ण हैं। गति (Speed) और सटीकता बढ़ाने के लिए हमारे Mock Vault से प्रैक्टिस करें।";
        } else if (qLower.includes('banking') || qLower.includes('ibps') || qLower.includes('sbi')) {
            reply = "🏦 **Banking Exams (IBPS / SBI):**\nबैंकिंग परीक्षाओं के लिए उच्च स्तर की Data Interpretation (DI), सिंपलीफिकेशन और Reasoning पजल्स का अभ्यास आवश्यक है।";
        } else if (qLower.includes('math') || qLower.includes('गणित')) {
            reply = "📐 गणित में महारत हासिल करने के लिए प्रतिदिन फॉर्मूला रिवीजन और मिक्स्ड क्वेश्चन सेट (जैसे 50 प्रश्नों के प्रैक्टिस सेट) को हल करना सबसे बेहतरीन तरीका है।";
        } else if (qLower.includes('hello') || qLower.includes('hi') || qLower.includes('नमस्ते')) {
            reply = "नमस्ते! बताइए आज मैं आपकी किस परीक्षा की तैयारी में मदद करूँ?";
        }

        msgBox.innerHTML += `<div style="background: #1e293b; color: #cbd5e1; padding: 8px 12px; border-radius: 10px; max-width: 85%; line-height: 1.4; white-space: pre-line;">${reply}</div>`;
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 500);
}

window.addEventListener('DOMContentLoaded', initAIChatWidget);
