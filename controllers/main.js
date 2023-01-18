// defining the homepage controller function
homeController = (req, res) => {
    res.json({ status: true, message: 'The API is fully functional' });
};
  
  
module.exports = { homeController};