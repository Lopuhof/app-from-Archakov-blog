import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        // Узазываем тип и обязательность
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Узазываем тип, обязательность и уникальность
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    // Просто указываем, что есть аватарка (не обязательно)
}, {
    timestamps: true, 
    // Автоматически будет фиксировать дату создания пользователя
});

export default mongoose.model('User', UserSchema);