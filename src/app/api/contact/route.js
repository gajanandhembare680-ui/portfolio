import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        const contact = await Contact.create(data);

        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
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
