const isAuthenticated = (req, res, next) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "You do not have access" });
        }
        next();
    } catch (error) {
        console.error("Authentication check failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    isAuthenticated
};