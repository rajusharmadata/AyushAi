import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { BotIcon } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 p-6 bg-muted/30">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-chat-ai-message">
            <BotIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Typing animation */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground mb-1">
         AyurvedAI
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
