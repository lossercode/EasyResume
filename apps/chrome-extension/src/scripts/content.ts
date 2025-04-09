chrome.runtime.sendMessage({
    action: 'getPageHtml',
    url: window.location.href,
    html: document.body.outerHTML,
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "injectScript") {
        // 动态创建 script 标签注入页面
        const script = document.createElement("script");
        script.textContent = message.scriptContent;
        document.body.appendChild(script);
        script.remove(); // 执行后移除脚本
    }
    return true; // 确保消息被处理，避免 Chrome 警告未处理的消息
});