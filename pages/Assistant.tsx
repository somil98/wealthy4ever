import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { GenerateContentResponse, Chat } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Hello. I am the Apex Financial Compass. I can help explain financial concepts, tax strategies, or investment terminologies. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session once
    chatSessionRef.current = createChatSession();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const resultStream = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      
      let fullResponseText = '';
      const modelMsgId = (Date.now() + 1).toString();
      
      // Add placeholder message
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: MessageRole.MODEL,
        text: '',
        timestamp: new Date()
      }]);

      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text || '';
        fullResponseText += text;
        
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullResponseText }
            : msg
        ));
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: MessageRole.MODEL,
        text: "I apologize, but I'm currently unable to process your request. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-primary p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="bg-accent rounded-full p-2">
            <Bot className="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 className="text-white font-serif font-bold text-lg">Apex Financial Compass</h2>
            <p className="text-slate-400 text-xs">AI-Powered Assistant • Informational Only</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === MessageRole.USER ? 'bg-slate-200' : 'bg-primary'}`}>
                  {msg.role === MessageRole.USER ? <User size={16} /> : <Bot size={16} className="text-accent" />}
                </div>
                
                <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                  msg.role === MessageRole.USER 
                    ? 'bg-slate-800 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:text-slate-900 prose-a:text-blue-600">
                    <ReactMarkdown>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about 401k limits, Roth conversions, or market concepts..."
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-full focus:ring-primary focus:border-primary block p-4 pr-12 shadow-inner transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-accent hover:bg-yellow-500 rounded-full text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            AI can make mistakes. Consider checking important information with your advisor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;