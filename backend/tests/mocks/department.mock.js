import sinon from "sinon";
import institutionRepository from "../../repositories/department.js";

export const mockReq = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query,
});

export const mockRes = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

export const stubInstitutionRepo = () => ({
  create:   sinon.stub(departmentRepository, "create"),
  findAll:  sinon.stub(departmentRepository, "findAll"),
  findById: sinon.stub(departmentRepository, "findById"),
  update:   sinon.stub(departmentRepository, "update"),
  delete:   sinon.stub(departmentRepository, "delete"),
});