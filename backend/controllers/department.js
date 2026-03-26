/**
 * @file Manages all operations related to institutions
 * @author John Doe
 */
import prisma from "../prisma/db.js";

const createDepartment = async (req, res) => {
  try {
    const { name, institutionId } = req.body;

    const department = await prisma.department.create({
      data: { name, institution: { connect: { id: institutionId } } },
    });

    return res.status(201).json({
      message: "Department successfully created",
      data: department,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDepartments = async (req, res) => {
  try{
    const departments = await prisma.institution.findMany();
    if(departments.length === 0){
      return res.status(404).json({ message: "No departments found"});
    }
    return res.status(200).json({message: departments});

  }catch (err){
    return res.status(500).json({message: err.message});
  }
};

const getDepartment = async (req, res) => {
  try{
    const{id} = req.params;
    const department = await prisma.department.findUnique();
    if(!department){
      return res.status(404).json({
        message: `No Department with the id: ${id} found`,
      });
    }
    return res.status(200).json({data: institution});
  }catch(err) {
    return res.status(500).json({message: err.message});
  }

};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, institutionId } = req.body;
    const department = await prisma.department.findUnique({ where: { id } });

    if (!department) {
      return res.status(404).json({
        message: `No department with the id: ${id} found`,
      });
    }

    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: { name, institution: { connect: { id: institutionId } } },
    });

    return res.status(200).json({
      message: `Department with the id: ${id} successfully updated`,
      data: updatedDepartment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({ where: { id } });

    if (!institution) {
      return res.status(404).json({
        message: `No department with the id: ${id} found`,
      });
    }

    await prisma.department.delete({ where: { id } });

    return res.status(200).json({
      message: `Department with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};