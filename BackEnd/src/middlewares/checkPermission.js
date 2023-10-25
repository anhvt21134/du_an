import jwt from 'jsonwebtoken';
import User from '../model/user';

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                message: 'Bạn chưa đăng nhập',
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        console.log(token) 
        const { id } = jwt.verify(token, 'hahaaa');
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
            console.log(user.role);

            if (user.role != 'admin') {
                console.log(user.role);
                return res.status(403).json({
                    message: 'Bạn không có quyền truy cập tài nguyên, cút!',
                });
            }
            next();
        // });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};
