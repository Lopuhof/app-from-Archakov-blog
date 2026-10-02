import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
            // Узазываем тип, обязательность и уникальность
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: String,
        // Просто указываем, что есть аватарка (не обязательно)
    }, 
    {
        timestamps: true, 
        // Автоматически будет фиксировать дату создания пользователя
    },
);

export default mongoose.model('Post', PostSchema);