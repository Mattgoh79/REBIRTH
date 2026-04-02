/**
 * @file Manages all operations related to courses
 * @author John Doe
 */
import prisma from "../prisma/db.js";

const createCourse = async (req, res) => {
  try {
    const { name, departmentId } = req.body;

    const course = await prisma.course.create({
      data: { code, name, description,  department: { connect: { id: departmentId } } },
    });

    return res.status(201).json({
      message: "Course successfully created",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCourses = async (req, res) => {
  try{
    const courses = await prisma.department.findMany();
    if(courses.length === 0){
      return res.status(404).json({ message: "No courses found"});
    }
    return res.status(200).json({message: courses});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getCourse = async (req, res) => {
  try{
    const{id} = req.params;
    const course = await prisma.course.findUnique();
    if(!course){
      return res.status(404).json({
        message: `No Course with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: department});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, departmentId } = req.body;
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(404).json({
        message: `No course with the id: ${id} found`,
      });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { code, name, description,  department: { connect: { id: departmentId } } },
    });

    return res.status(200).json({
      message: `Course with the id: ${id} successfully updated`,
      data: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({ where: { id } });

    if (!department) {
      return res.status(404).json({
        message: `No course with the id: ${id} found`,
      });
    }

    await prisma.course.delete({ where: { id } });

    return res.status(200).json({
      message: `Course with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};