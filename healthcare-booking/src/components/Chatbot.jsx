import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeContext';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm HealthBot 🏥 your personal healthcare assistant. I can help you find doctors, answer health questions, or guide you through booking an appointment. How can I help you today?",
};

function Chatbot() {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Sorry, I am having trouble connecting right now. Please try again in a moment.',
      }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    'How do I book an appointment?',
    'What specialists do you have?',
    'What are your fees?',
  ];

  const styles = {
    floatingBtn: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#2563EB',
      color: '#ffffff',
      fontSize: '24px',
      border: 'none',
      cursor: 'pointer',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatWindow: {
      position: 'fixed',
      bottom: '90px',
      right: '24px',
      width: '360px',
      height: '500px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
      borderRadius: '20px',
      border: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9998,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    },
    header: {
      backgroundColor: '#2563EB',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    avatar: {
      width: '36px', height: '36px', borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
    },
    headerName: { color: '#ffffff', fontWeight: '600', fontSize: '15px', margin: 0 },
    headerStatus: { color: '#93C5FD', fontSize: '12px', margin: 0 },
    closeBtn: { background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' },
    messages: {
      flex: 1, overflowY: 'auto', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: '10px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
    },
    messageBubble: {
      maxWidth: '80%', padding: '10px 14px',
      borderRadius: '16px', fontSize: '14px', lineHeight: '1.5',
    },
    botBubble: {
      backgroundColor: darkMode ? '#0F172A' : '#F1F5F9',
      color: darkMode ? '#F1F5F9' : '#1E293B',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: '4px',
    },
    userBubble: {
      backgroundColor: '#2563EB',
      color: '#ffffff',
      alignSelf: 'flex-end',
      borderBottomRightRadius: '4px',
    },
    typing: { color: '#94A3B8', letterSpacing: '2px' },
    quickQuestions: {
      padding: '8px 16px',
      display: 'flex', flexDirection: 'column', gap: '6px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
    },
    quickBtn: {
      padding: '8px 12px',
      backgroundColor: darkMode ? '#0F172A' : '#EFF6FF',
      color: '#2563EB',
      border: `1px solid ${darkMode ? '#334155' : '#BFDBFE'}`,
      borderRadius: '8px', fontSize: '13px',
      cursor: 'pointer', textAlign: 'left', fontWeight: '500',
    },
    inputRow: {
      padding: '12px 16px',
      borderTop: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      display: 'flex', gap: '8px',
      backgroundColor: darkMode ? '#1E293B' : '#ffffff',
    },
    input: {
      flex: 1, padding: '10px 14px',
      border: `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
      borderRadius: '10px', fontSize: '14px', outline: 'none',
      backgroundColor: darkMode ? '#0F172A' : '#ffffff',
      color: darkMode ? '#F1F5F9' : '#1E293B',
    },
    sendBtn: {
      padding: '10px 14px', backgroundColor: '#2563EB',
      color: '#ffffff', border: 'none',
      borderRadius: '10px', fontSize: '16px', cursor: 'pointer',
    },
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.floatingBtn}>
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.avatar}>🏥</div>
              <div>
                <p style={styles.headerName}>HealthBot</p>
                <p style={styles.headerStatus}>● Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                ...styles.messageBubble,
                ...(msg.role === 'user' ? styles.userBubble : styles.botBubble),
              }}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.messageBubble, ...styles.botBubble }}>
                <span style={styles.typing}>● ● ●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div style={styles.quickQuestions}>
              {quickQuestions.map((q) => (
                <button key={q} style={styles.quickBtn} onClick={() => {
                  setInput(q);
                  setTimeout(() => sendMessage(), 100);
                }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ ...styles.sendBtn, opacity: loading || !input.trim() ? 0.5 : 1 }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;