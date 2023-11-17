import React, { createContext, useState, ReactNode } from 'react';

interface ChatRoomContextType {
  chatroomId: number | null;
  setChatroomId: React.Dispatch<React.SetStateAction<number | null>>;
}

// 기본값에 타입을 지정합니다.
export const ChatRoomContext = createContext<ChatRoomContextType>({
  chatroomId: null,
  setChatroomId: () => {}
});

export const ChatRoomProvider = ({ children }: { children: ReactNode }) => {
  const [chatroomId, setChatroomId] = useState<number | null>(null);

  return (
    <ChatRoomContext.Provider value={{ chatroomId, setChatroomId }}>
      {children}
    </ChatRoomContext.Provider>
  );
};