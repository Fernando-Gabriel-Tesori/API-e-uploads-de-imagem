import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        const emailOrPasswordIncorrect = () => 
            response
                .status(401)
                .json({ error: 'MAKE SURE YOUR EMAIL OR PASSWORD ARE CORRECT' });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isPasswordValid = await user.checkPassword(password);

        if (!isPasswordValid) {
            return emailOrPasswordIncorrect();
        }

        return response.status(201).json({ 
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
    }
}

export default new SessionController();
