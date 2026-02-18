import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser && "flex flex-col items-end"}`}>
        {message.content && (
          <div className={`rounded-2xl px-4 py-2.5 ${
            isUser 
              ? "bg-cyan-600 text-white" 
              : "bg-slate-800/60 text-slate-200 border border-slate-700/50"
          }`}>
            {isUser ? (
              <p className="text-sm leading-relaxed">{message.content}</p>
            ) : (
              <ReactMarkdown 
                className="text-sm prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ChatBot({ onClose }) {
  const [emailValidated, setEmailValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEmailValidation = async () => {
    if (!email.trim()) {
      setEmailError("Please enter an email");
      return;
    }
    
    if (email.toLowerCase() !== "luckydeburner@gmail.com") {
      setEmailError("Access restricted. Please contact the owner.");
      return;
    }

    setEmailError("");
    setIsLoading(true);
    
    try {
      const newConversation = await base44.agents.createConversation({
        agent_name: "portfolio_assistant",
        metadata: {
          name: "Portfolio Chat",
          description: "Chat with portfolio assistant",
        }
      });
      
      setConversation(newConversation);
      setMessages(newConversation.messages || []);
      setEmailValidated(true);
    } catch {
      setEmailError("Failed to start chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!conversation) return;

    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    try {
      await base44.agents.addMessage(conversation, {
        role: "user",
        content: userMessage
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (emailValidated) {
        handleSendMessage();
      } else {
        handleEmailValidation();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/60 overflow-hidden flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Portfolio Assistant</h3>
            <p className="text-slate-500 text-xs">Ask me anything</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-slate-800/60 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {!emailValidated ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-white font-semibold text-base mb-2">Email Verification</h4>
              <p className="text-slate-400 text-xs">
                Please verify your email to access the chat
              </p>
            </div>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyPress={handleKeyPress}
              className="bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500"
            />
            
            {emailError && (
              <p className="text-red-400 text-xs">{emailError}</p>
            )}

            <Button
              onClick={handleEmailValidation}
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Email
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-8">
                <p>Hi! I'm here to help you learn about Nhlanhla's work and experience.</p>
                <p className="mt-2">Ask me anything!</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center mt-0.5">
                  <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                </div>
                <div className="rounded-2xl px-4 py-2.5 bg-slate-800/60 border border-slate-700/50">
                  <p className="text-slate-400 text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800/60 bg-slate-900/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
