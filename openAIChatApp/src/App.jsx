import { useState, useEffect, useRef } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'
import OpenAI from 'openai'

//created an OpenAI client 
const client  = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});
function App() {
  const [loader,setLoader] = useState(false);
  const [error,setError] = useState("");
  const [prompt,setPrompt] = useState("");
  const [chatHistory,setChatHistory] = useState([]);
  const textareaRef = useRef(null);
  
  //useEffect hook for keeping the user view at the bottom of chat history
  useEffect(()=>{
    const chat = document.getElementById("chat");
    if(chat){
      chat.scrollTop = chat.scrollHeight;
    }
  },[chatHistory]);


  const handleSendQuery = async ()=>{
    if(!prompt.trim()) return;
    console.log(prompt)
    //create an user prompt object - include role and content
    const userPrompt = {role:"user",content:prompt};
    //Append the userprompt in chatHistory array
    const newChatHistory = [...chatHistory,userPrompt];
    setChatHistory(newChatHistory);
    console.log(chatHistory);
    setPrompt("");
    setLoader(true);
    //call openAI API to generate the response 
    try{
      const response = await client.chat.completions.create({
        model:"gpt-4o-mini",
        messages:newChatHistory, // send entire chat history for better response 
      });
      console.log(response);
      const aiText = response.choices[0]?.message?.content ?? "No Content";
      const aiResponse = {role:"assistant",content:aiText};
      console.log(aiResponse);
      setChatHistory((prev)=>[...prev,aiResponse]);

    }
    catch(err){
      setError(err);
      console.log(err);
    }
    finally{
      setLoader(false);
    }
  
  }
  //handleing the enter key event
  const handleEnterDown = (e)=>{
    if(e.key=="Enter"){
      if(e.shiftKey){
        return;
      }
      else{
        e.preventDefault();
        handleSendQuery();
      }
    }
  }
  //handle auto resize of text area
  const autoResize = ()=>{
    const t = textareaRef.current;
    if(!t) return;
    t.style.height = "auto";
    t.style.height = t.scrollHeight + 'px';
  }
  //handle clear button 
  const handleClearChat = ()=>{
    setChatHistory([]);
    setPrompt("");
  }
  return (
    <div className='w-full flex flex-col text-white items-center relative'>
      {chatHistory.some((msg)=>msg.role==='assistant') &&(
        <div className='top-4 right-4 z-50 w-full flex justify-between items-center bg-gray-800'>
          <h1 className='text-bold mt-4 mb-4 mx-4 text-4xl'>AskMe</h1>
        <button className='px-4 py-1 justify-end rounded-full shadow-md bg-blue-600 hover:bg-blue-700 transition-all duration-200' onClick={handleClearChat}>
          <img src="../public/delete.png" alt="delete" className='w-8 h-8' />
        </button>
      </div>)}
        {chatHistory.length===0 && (
        <>
        <h1 className="text-3xl text-bold text-center">AI chatAPP</h1>
        <h3 className="mt-3 text-2xl text-center">Ask me any question!! I will answer anything</h3>
        </>
      )}
      
      <div id = "chat" className="w-full max-w-[75%] mt-3 mb-3 flex flex-col rounded-xl overflow-y-auto shadow-xl">
        {chatHistory.map((msg,index)=>(
          <div key={index} className={`w-full flex mt-3 ${msg.role==="user"?"justify-end":"justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl leading-relaxed ${msg.role==="user"?"bg-blue-700 text-white":"bg-gray-800 text-gray-300 text-left animate-fadeIn"}`}>
              {msg.role==="assistant"?(<ReactMarkDown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkDown>):msg.content}
            </div>
          </div>
        )
        )}
      </div>
      {loader && (
        <div className="w-full mt-4 flex justify-start">
          <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-gray-700 text-lg text-gray-300 animate-pulse">
              AI is thinking.....
          </div>
        </div>
      )}
      <div className='w-full max-w-4xl flex mx-4 mt-4 rounded-xl border border-gray-600 bg-gray-800 items-center p-3 gap-4'>
        <textarea ref={textareaRef} name="prompt" id="prompt" rows={1} onInput={autoResize} onKeyDown={handleEnterDown} className="flex-grow bg-transparent bg-gray-800 focus:outline-none resize-none max-h-40 overflow-y-auto" value={prompt} placeholder="Type Your Question..." onChange={(e)=>setPrompt(e.target.value)} required></textarea>
        {prompt.trim() && loader===false && (
          <button className="w-8 h-8 inline-flex rounded-full shadow-md justify-end cursor-pointer transition-all duration-200 hover:scale-110" onClick={handleSendQuery}>
            <img src="../public/send.png" alt="Send" className='w-8 h-8'/>
          </button>
        )}
        {loader && (
          <button className="w-8 h-8 inline-flex rounded-full shadow-md justify-end cursor-pointer transition-all duration-200 hover:scale-110">
            <img src="../public/pause.png" alt="Send" className='w-8 h-8'/>
          </button>
        )
        }
      </div>


    </div>
    
  )
}

export default App
