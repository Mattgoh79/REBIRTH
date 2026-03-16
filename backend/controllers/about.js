/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
// Create a GET route
const getMyInfo = (req, res) => {
  return res.status(200).json({
    learner_ID: 1000142587,
    firstName: "Matthias",
    lastName: "Goh",
    emailAddress: "mattgoh79@gmail.com",
    Like_About_IT: "I can justify sitting behind a computer all day long",
  });
};

// Export the controller functions. May be used by other modules. For example, the index routes module
export { getMyInfo };
