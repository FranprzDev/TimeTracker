import mongoose, { Schema, Document } from 'mongoose';

interface IEntry extends Document {
    date: Date;
    network: string;
    person: string;
    time: number;
}

const entrySchema: Schema = new Schema(
    {
        date: {
            type: Date,
            required: [true, "Completa el campo"],
            default: Date.now,
        },
        network: {
            type: String,
            required: [true, "Completa el campo"],
        },
        person: {
            type: String,
            required: [true, "Completa el campo"],
        },
        time: {
            type: Number,
            required: [true, "Completa el campo"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.models.Entry || mongoose.model<IEntry>('Entry', entrySchema);