import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Guestbook from '@/models/Guestbook';

// In-memory fallback if DB is not connected
let MOCK_ENTRIES = [
    { _id: '1', name: 'Alice', message: 'Love the portfolio design! 🚀', createdAt: new Date() },
    { _id: '2', name: 'Bob', message: 'The terminal app is so cool.', createdAt: new Date(Date.now() - 86400000) },
    { _id: '3', name: 'Charlie', message: 'Found the easter egg! 😎', createdAt: new Date(Date.now() - 172800000) },
];

export async function GET() {
    try {
        if (!process.env.MONGODB_URI) {
            return NextResponse.json({ success: true, data: MOCK_ENTRIES, isMock: true });
        }

        await dbConnect();
        const entries = await Guestbook.find({}).sort({ createdAt: -1 }).limit(50);
        return NextResponse.json({ success: true, data: entries });
    } catch (error) {
        console.error('Guestbook Fetch Error:', error);
        // Fallback to mock on error too, to keep UI working
        return NextResponse.json({ success: true, data: MOCK_ENTRIES, isMock: true, error: error.message });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, message } = body;

        // Basic Validation
        if (!name || !message) {
            return NextResponse.json({ success: false, error: 'Name and message are required' }, { status: 400 });
        }

        if (!process.env.MONGODB_URI) {
            // Mock save
            const newEntry = { _id: Date.now().toString(), name, message, createdAt: new Date() };
            MOCK_ENTRIES = [newEntry, ...MOCK_ENTRIES];
            console.log('Mock Guestbook Entry Saved:', newEntry);
            return NextResponse.json({ success: true, data: newEntry, isMock: true }, { status: 201 });
        }

        await dbConnect();
        const entry = await Guestbook.create({ name, message });
        return NextResponse.json({ success: true, data: entry }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
