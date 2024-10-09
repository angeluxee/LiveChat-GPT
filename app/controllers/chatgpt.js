const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: 'sk-'});

exports.chatgpt = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": message}],
            temperature: 0.7,
            top_p: 0.9,
            presence_penalty: 0.5,
            frequency_penalty: 0.5,
            max_tokens: 150
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error(`Error obteniendo la respuesta de chatGPT: ${error}`);
        return null;
    }
};

