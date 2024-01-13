export const Role = (requiredRole) => {
    return (req, res, next) => {
        const { Role } = req.user;

        if (Role !== requiredRole) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    };
};
