const fetch = require('node-fetch');

module.exports = {
  onMessage: async (message) => {
    if (!message.content) return '';

    try {
      const res = await fetch('http://127.0.0.1:11434/v1/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen2:7b',
          prompt: message.content,
          max_tokens: 512
        })
      });
      const data = await res.json();
      return data.choices?.[0]?.text || '';
    } catch (err) {
      console.error('Ollama plugin error:', err);
      return '';
    }
  }
};
