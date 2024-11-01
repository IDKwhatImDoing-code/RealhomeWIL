import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // Fetch receiver information for each chat
    const chatsWithReceivers = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userIDs.find(id => id !== tokenUserId);
        const receiver = await prisma.user.findUnique({
          where: { id: receiverId },
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        });

        return {
          ...chat,
          receiver,
        };
      })
    );

    console.log('Chats fetched successfully:', chatsWithReceivers); // Add logging
    res.status(200).json(chatsWithReceivers);
  } catch (err) {
    console.error('Error fetching chats:', err); // Add detailed error logging
    res.status(500).json({ 
      message: "Failed to get chats!", 
      error: err.message,
      stack: err.stack 
    });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // First, get the current seenBy array
    const currentSeenBy = chat.seenBy || [];
    
    // Only update if the user hasn't seen the chat
    if (!currentSeenBy.includes(tokenUserId)) {
      await prisma.chat.update({
        where: {
          id: req.params.id,
        },
        data: {
          seenBy: {
            set: [...currentSeenBy, tokenUserId], // Use 'set' instead of 'push'
          },
        },
      });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
