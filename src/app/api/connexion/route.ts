import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { login, password } = await request.json();

  if (!login || !password) {
    return NextResponse.json({ error: 'Missing login or password' }, { status: 400 });
  }

  try {
    const user = await prisma.utilisateur.findUnique({
      where: { login },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid login or password' }, { status: 401 });
    }

    console.log('Stored password hash:', user.password);
    console.log('Provided password:', password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid login or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', role: user.role, id: user.id, name: user.name, lastname: user.lastname });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}