import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Expected an array of user credentials' }, { status: 400 });
  }

  const results = [];

  try {
    for (const { login, password } of body) {
      if (!login || !password) {
        results.push({ login, error: 'Missing login or password' });
        continue;
      }

      const user = await prisma.utilisateur.findUnique({
        where: { login },
      });

      if (!user) {
        results.push({ login, error: 'Invalid login or password' });
        continue;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        results.push({ login, error: 'Invalid login or password' });
        continue;
      }

      // If login is successful, you can return user data or a token
      results.push({ login, message: 'Login successful', role: user.role, id: user.id, name: user.name, lastname: user.lastname });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}