import playerRepository from "../repositories/player.js";

const createPlayer = async (req, res) => {
  try {
    const { id, firstName, lastName, emailAddress, gender, isInjured, dateOfBirth } = req.body;
    const player = await playerRepository.create({  id, firstName, lastName, emailAddress, gender, isInjured, dateOfBirth
    });
    return res.status(201).json({
      message: "Player successfully created",
      data: player,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await playerRepository.findAll();
    if (players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json({ data: players });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerRepository.findById(id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${id} found`,
      });
    }
    return res.status(200).json({ data: player });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, gender, is_injured, date_of_birth } = req.body;
    const player = await playerRepository.findById(id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${id} found`,
      });
    }
    const updatedPlayer = await playerRepository.update(id, {
 first_name, last_name, email, gender, is_injured, date_of_birth 
    });
    return res.status(200).json({
      message: `Player with the id: ${id} successfully updated`,
      data: updatedPlayer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerRepository.findById(id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${id} found`,
      });
    }
    await playerRepository.delete(id);
    return res.status(200).json({
      message: `Player with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};