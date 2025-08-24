import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const ChatInterface: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Welcome to Ayurved Ai',
      lastMessage: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString(),
      messages: [
        {
          id: '1',
          content: 'Hello! How can I help you today?',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // ✅ Call your backend API
      const { data } = await axios.post('/api/v1/chat', {
        question: userMessage, // send only user message
      });

      // Assume backend returns something like { answer: "..." }
      return data.answer || 'Sorry, I couldn’t understand your question.';

    } catch (err) {
      console.error('Error fetching AI response:', err);
      return 'Oops! Something went wrong while getting a response.';
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Add user message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              lastMessage: content,
              timestamp: new Date().toISOString(),
            }
          : conv
      )
    );

    // Show typing indicator
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      // Add AI message
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiMessage],
                lastMessage: aiResponse,
                timestamp: new Date().toISOString(),
              }
            : conv
        )
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      lastMessage: 'Start a conversation...',
      timestamp: new Date().toISOString(),
      messages: [],
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  return (
    <div className='flex h-screen bg-background relative'>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={id => {
            handleSelectConversation(id);
            setSidebarOpen(false); // Close sidebar on mobile after selection
          }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className='flex-1 flex flex-col min-w-0  '>
        {/* Mobile Header */}
        <div className='lg:hidden flex items-center justify-between p-4 border-b border-border'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setSidebarOpen(true)}
            className='h-8 w-8 p-0'
          >
            <MenuIcon className='h-4 w-4' />
          </Button>
          <h1 className='text-lg font-semibold'>Ayurved Ai</h1>
          <div className='w-8' /> {/* Spacer for centering */}
        </div>

        {/* Messages */}
        <ScrollArea className='flex-1 overflow-auto ' ref={scrollAreaRef}>
          <div className='max-w-4xl mx-auto px-4 lg:px-0'>
            {messages.length === 0 ? (
              <div className='flex items-center justify-center h-full min-h-[60vh]'>
                <div className='text-center px-4'>
                  <h1 className='text-2xl lg:text-3xl font-semibold text-foreground mb-4'>
                    I am AyurvedAI How can I help you today?
                  </h1>
                  <p className='text-muted-foreground text-sm lg:text-base'>
                    Start a conversation by typing a message below.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;
