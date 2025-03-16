export const signup = (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    

  } catch (err) {
    
  }
};

export const login = (req, res) => {
  res.render("login");
};

export const logout = (req, res) => {
  res.render("logout");
};
