
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isUser) {
    return (
      <div className="w-full py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-end">
          <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-blue-500 text-white rounded px-4 py-2">
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="group flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            AI
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                {message.content}
              </div>

              {/* Copy button */}
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded hover:bg-gray-200 transition-colors"
                  title={copied ? 'Copied!' : 'Copy message'}
                >
                  {copied ?
                    <Check className="w-4 h-4 text-green-600" /> :
                    <Copy className="w-4 h-4 text-gray-500" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage
