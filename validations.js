import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат электронной почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    // Проверяем на корректность email, длину пароля (минимум 5 символов), длину ника (минимум 3 символа) и опциональная проверка на аватарку (является ли она ссылкой)
];


export const registerValidation = [
    body('email', 'Неверный формат электронной почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
    // Проверяем на корректность email, длину пароля (минимум 5 символов), длину ника (минимум 3 символа) и опциональная проверка на аватарку (является ли она ссылкой)
];

export const postCreateValidation = [
    body('titlel', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
    // Проверяем на корректность email, длину пароля (минимум 5 символов), длину ника (минимум 3 символа) и опциональная проверка на аватарку (является ли она ссылкой)
];