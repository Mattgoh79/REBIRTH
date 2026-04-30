import sinon from "sinon";
import institutionRepository from "../../repositories/institution.js";

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
  create:   sinon.stub(institutionRepository, "create"),
  findAll:  sinon.stub(institutionRepository, "findAll"),
  findById: sinon.stub(institutionRepository, "findById"),
  update:   sinon.stub(institutionRepository, "update"),
  delete:   sinon.stub(institutionRepository, "delete"),
});