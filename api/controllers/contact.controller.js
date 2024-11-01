import prisma from "../lib/prisma.js";

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send message!" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get contacts!" });
  }
};

export const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update contact status!" });
  }
};
