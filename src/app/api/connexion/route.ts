import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'Missing login or password' });
  }

  try {
    const user = await prisma.utilisateur.findUnique({
      where: { login },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }

    return res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}