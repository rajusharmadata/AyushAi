import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon, MessageSquareIcon, MoreVerticalIcon, XIcon } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onClose,
}) => {
  return (
    <div className='w-full max-w-80 lg:w-80 bg-chat-sidebar border-r border-border flex flex-col h-screen'>
      {/* Header */}
      <div className='p-4 border-b border-chat-sidebar-hover'>
        <div className='flex items-center justify-between mb-4 lg:mb-0 lg:block'>
          <h2 className='text-lg font-semibold text-chat-sidebar-foreground lg:hidden'>
            Conversations
          </h2>
          {onClose && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='h-8 w-8 p-0 lg:hidden'
              aria-label='Close sidebar'
            >
              <XIcon className='h-4 w-4' />
            </Button>
          )}
        </div>
        <Button
          onClick={onNewChat}
          className='w-full bg-chat-sidebar-hover hover:bg-opacity-80 text-chat-sidebar-foreground border border-chat-sidebar-hover hover:border-opacity-60 transition-all duration-200'
          variant='outline'
        >
          <PlusIcon className='w-4 h-4 mr-2' />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className='flex-1 p-2'>
        <div className='space-y-1'>
          {conversations.length === 0 ? (
            <div className='p-4 text-center'>
              <p className='text-sm text-chat-sidebar-foreground opacity-60'>
                No conversations yet
              </p>
            </div>
          ) : (
            conversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group hover:bg-chat-sidebar-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  activeConversationId === conversation.id ? 'bg-chat-sidebar-hover' : ''
                }`}
                role='button'
                tabIndex={0}
                aria-label={`Select conversation: ${conversation.title}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectConversation(conversation.id);
                  }
                }}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex items-center min-w-0 flex-1'>
                    <MessageSquareIcon className='w-4 h-4 mr-3 text-chat-sidebar-foreground opacity-60 flex-shrink-0' />
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-medium text-chat-sidebar-foreground truncate'>
                        {conversation.title}
                      </p>
                      <p className='text-xs text-chat-sidebar-foreground opacity-60 truncate mt-1'>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                  <button
                    className='opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-chat-sidebar-hover rounded focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring'
                    onClick={e => {
                      e.stopPropagation();
                      // Handle menu action here
                    }}
                    aria-label='More options'
                  >
                    <MoreVerticalIcon className='w-3 h-3 text-chat-sidebar-foreground opacity-60' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className='p-4 border-t border-chat-sidebar-hover'>
        <div className='text-xs text-chat-sidebar-foreground opacity-60 text-center'>
          AyurvedAI v1.0
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
