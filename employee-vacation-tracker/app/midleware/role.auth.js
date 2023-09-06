
const roleAuth = async (req, res, next) => {
    try {
      const role = "admin" 
      req.role = role; 
      next();
    } catch (err) {
      myHelper.sendResponse(res, 500, false, err, err.message);
    }
  };
  module.exports = roleAuth;