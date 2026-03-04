// 在 chat.html 的 fetchAI 函数中拼接
const identity = localStorage.getItem('k_world_identity') || "";
const background = localStorage.getItem('k_world_background') || "";
const speech = localStorage.getItem('k_world_speech') || "";
const memory = localStorage.getItem('k_world_memory') || "";

// 结构化拼接：给 AI 贴好标签，它能理解得更好
const finalPrompt = `
【核心人设】：${identity}
【背景设定】：${background}
【语言风格】：${speech}
【当前关键记忆】：${memory}
`;

// 然后将 finalPrompt 传入 API