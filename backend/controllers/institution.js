/**
 * @file Manages all operations related to courses
 * @author ATT
 */
import institutionRepository from "../repositories/institution.js";

const createInstitution = async (req, res) => {
  try {
    const { name, region, country, website, emailAddress} = req.body;
    const institution = await institutionRepository.create({name,region,country, website, emailAddress});
    return res.status(201).json({
      message: "Institution successfully created",
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getInstitutions = async (req, res) => {
  try {
    const {
      name,
      region,
      country,
      sortBy = "id",
      sortOrder = "asc",
      page = "1",
      pageSize = "10",
    } = req.query;

    // Build filters from provided query params
    const filters = {};
    if (name) filters.name = name;
    if (region) filters.region = region;
    if (country) filters.country = country;

    // Validate sortOrder - default to "asc" if invalid
    const validSortOrders = ["asc", "desc"];
    const order = validSortOrders.includes(sortOrder.toLowerCase())
      ? sortOrder.toLowerCase()
      : "asc";

    // Validate sortBy field - default to "id" if invalid
    const validSortFields = ["id", "name", "region", "country"];
    const fields = validSortFields.includes(sortBy.toLowerCase())
      ? sortBy.toLowerCase()
      : "id";

    const institutions = await institutionRepository.findAll(
      filters,
      fields,
      order,
      page,
      pageSize,
    );

    if (institutions.data.length === 0) {
      return res.status(404).json({ message: "No institutions found" });
    }

    return res.status(200).json({
      data: institutions.data,
      pagination: institutions.pagination,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await institutionRepository.findById(id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${id} found`,
      });
    }
    return res.status(200).json({ data: institution });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, region, country } = req.body;
    const institution = await institutionRepository.findById(id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${id} found`,
      });
    }
    const updatedInstitution = await institutionRepository.update(id, {
      name,
      region,
      country,
    });
    return res.status(200).json({
      message: `Institution with the id: ${id} successfully updated`,
      data: updatedInstitution,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await institutionRepository.findById(id);
    if (!institution) {
      return res.status(404).json({
        message: `No institution with the id: ${id} found`,
      });
    }
    await institutionRepository.delete(id);
    return res.status(200).json({
      message: `Institution with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
};