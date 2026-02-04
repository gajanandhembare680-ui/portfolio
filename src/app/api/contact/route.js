import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();

        // Mock success in development if no DB is set up
        if (!process.env.MONGODB_URI) {
            console.log('------- CONTACT FORM SUBMISSION (MOCK) -------');
            console.log(body);
            console.log('---------------------------------------------');

            // Artificial delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, message: 'Message sent (Mock Mode)' }, { status: 201 });
        }

        await dbConnect();
        const contact = await Contact.create(body);

        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        // Simple "admin" check - in real app use real auth
        const { searchParams } = new URL(req.url);
        const secret = searchParams.get('secret');

        if (secret !== 'my-secret-admin-pass') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const contacts = await Contact.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: contacts });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
