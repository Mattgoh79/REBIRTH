/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
// Create a GET route
const getCourseInfo = (req, res) => {
  return res.status(200).json({
    courses: [
      "Intro to App Dev",
      "Intro to Game Dev",
      "Embedded Systems",
      "Platforms and Devices",
    ],
  });
};

// Export the controller functions. May be used by other modules. For example, the index routes module
export { getCourseInfo };
