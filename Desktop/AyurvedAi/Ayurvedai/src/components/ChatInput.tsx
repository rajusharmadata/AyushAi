import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FaArrowUp } from 'react-icons/fa6';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Message ChatGPT...',
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className='border-t border-border bg-background p-3 lg:p-4'>
      <div className='max-w-4xl mx-auto'>
        <form onSubmit={handleSubmit} className='relative'>
          <div className='flex items-end gap-2 w-full h-full lg:gap-3 bg-chat-input border border-chat-input-border rounded-xl p-2 lg:p-3 shadow-sm'>
            {/* Message input */}
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className='flex-1 min-h-[20px] max-h-40 resize-none border-0 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm lg:text-base'
              rows={1}
            />

            {/* Send button */}
            <Button
              type='submit'
              disabled={!message.trim() || disabled}
              size='sm'
              className='h-8 w-8 p-0 bg-black rounded-full hover:bg-chat-user-message/90 text-chat-user-message-foreground disabled:hidden flex-shrink-0'
            >
              <FaArrowUp className='h-4 w-4' />
            </Button>
          </div>
        </form>

        {/* Disclaimer */}
        <div className='text-xs text-muted-foreground text-center mt-2 px-2'>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
