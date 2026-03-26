import prisma from "../prisma/db.js";

class PlayerRepository {
  async create(data) {
    return await prisma.player.create({ data });
  }

  async findAll() {
    return await prisma.player.findMany();
  }

  async findById(id) {
    return await prisma.player.findUnique({ where: { id } });
  }

  async update(id, data) {
    return await prisma.player.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.player.delete({ where: { id } });
  }
}

export default new PlayerRepository(); // Singleton instance