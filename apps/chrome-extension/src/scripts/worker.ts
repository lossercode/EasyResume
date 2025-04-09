chrome.runtime.onMessage.addListener((message) => {
    switch(message.action){
        case "getPageHtml":{
            console.log(message)
        } 
    }
    return true
})