import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserIcon, BotIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`group flex gap-3 lg:gap-4 p-4 lg:p-6 ${isUser ? 'bg-background' : 'bg-muted/30'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
          <AvatarFallback className={isUser ? 'bg-chat-user-message text-chat-user-message-foreground' : 'bg-chat-ai-message'}>
            {isUser ? <UserIcon className="w-3 h-3 lg:w-4 lg:h-4" /> : <BotIcon className="w-3 h-3 lg:w-4 lg:h-4" />}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground mb-1">
              {isUser ? 'You' : 'ChatGPT'}
            </div>
            <div className="text-sm lg:text-base text-foreground leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
          
          {/* Actions */}
          {!isUser && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 lg:ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-7 w-7 lg:h-8 lg:w-8 p-0 hover:bg-muted"
              >
                <CopyIcon className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;