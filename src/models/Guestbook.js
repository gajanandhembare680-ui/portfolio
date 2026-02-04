import mongoose from 'mongoose';

const GuestbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [200, 'Message cannot be more than 200 characters'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Guestbook || mongoose.model('Guestbook', GuestbookSchema);
