// 11 passing none failling
// 
//1. Why do we call sinon.restore() in afterEach rather than after?
//      Because if we used after, the results of the first test could affect the second, third and subsequent tests, by using
//      afterEach, it ensures that all tests are unaffected by each other 
//2. What would happen if two tests both stubbed institutionRepository.findAll but restore() was never called between them?
//      Then the first stub would stay there and affect the second test result
//3. The mockRes function's status stub returns res itself. Why is that necessary?
//      it is necessary to prevent real methods and logic to be activated?

import { expect } from "chai";
import sinon from "sinon";

import * as institutionController from "../../controllers/institution.js";
import institutionRepository from "../../repositories/institution.js";
import { mockReq, mockRes } from "../mocks/institution.mock.js";

describe("Institution Controller", () => {
  // Reset all stubs after each test so they don't affect the next one
  afterEach(() => sinon.restore());

  // Create

  describe("createInstitution", () => {
    it("should return 201 and the created institution", async () => {
      const created = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(institutionRepository, "create").resolves(created);

      const req = mockReq({
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      });
      const res = mockRes();

      await institutionController.createInstitution(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.name).to.equal("Otago Polytechnic");
    });

    it("should return 500 when the repository throws", async () => {
      sinon
        .stub(institutionRepository, "create")
        .rejects(new Error("DB error"));

      const req = mockReq({
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      });
      const res = mockRes();

      await institutionController.createInstitution(req, res);

      expect(res.status.calledWith(500)).to.be.true;
    });
  });

  // Read all

  describe("getInstitutions", () => {
    it("should return 200 and all institutions", async () => {
      const institutions = [
        {
          id: "abc-123",
          name: "Otago Polytechnic",
          region: "Otago",
          country: "New Zealand",
        },
        {
          id: "def-456",
          name: "Southern Institute of Technology",
          region: "Southland",
          country: "New Zealand",
        },
      ];

      sinon.stub(institutionRepository, "findAll").resolves({
        data: institutions,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 2,
          totalPages: 1,
          nextPage: null,
          prevPage: null,
        },
      });

      const req = mockReq({}, {}, {});
      const res = mockRes();

      await institutionController.getInstitutions(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data).to.have.length(2);
    });

    it("should return 404 when no institutions exist", async () => {
      sinon.stub(institutionRepository, "findAll").resolves({
        data: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 0,
          totalPages: 0,
          nextPage: null,
          prevPage: null,
        },
      });

      const req = mockReq({}, {}, {});
      const res = mockRes();

      await institutionController.getInstitutions(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it("should return 500 when the repository throws", async () => {
      sinon
        .stub(institutionRepository, "findAll")
        .rejects(new Error("DB error"));

      const req = mockReq({}, {}, {});
      const res = mockRes();

      await institutionController.getInstitutions(req, res);

      expect(res.status.calledWith(500)).to.be.true;
    });
  });

  // Read one

  describe("getInstitution", () => {
    it("should return 200 and the matching institution", async () => {
      const institution = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(institutionRepository, "findById").resolves(institution);

      const req = mockReq({}, { id: "abc-123" });
      const res = mockRes();

      await institutionController.getInstitution(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.id).to.equal("abc-123");
    });

    it("should return 404 when the institution does not exist", async () => {
      sinon.stub(institutionRepository, "findById").resolves(null);

      const req = mockReq({}, { id: "does-not-exist" });
      const res = mockRes();

      await institutionController.getInstitution(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  // Update

  describe("updateInstitution", () => {
    it("should return 200 and the updated institution", async () => {
      const existing = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };
      const updated = {
        ...existing,
        name: "Otago Polytechnic Te Kura Matatini ki Otago",
      };

      sinon.stub(institutionRepository, "findById").resolves(existing);
      sinon.stub(institutionRepository, "update").resolves(updated);

      const req = mockReq(
        { name: "Otago Polytechnic Te Kura Matatini ki Otago" },
        { id: "abc-123" },
      );
      const res = mockRes();

      await institutionController.updateInstitution(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.name).to.equal(
        "Otago Polytechnic Te Kura Matatini ki Otago",
      );
    });

    it("should return 404 when the institution does not exist", async () => {
      sinon.stub(institutionRepository, "findById").resolves(null);

      const req = mockReq({ name: "Updated" }, { id: "does-not-exist" });
      const res = mockRes();

      await institutionController.updateInstitution(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  // Delete

  describe("deleteInstitution", () => {
    it("should return 200 and a success message", async () => {
      const existing = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(institutionRepository, "findById").resolves(existing);
      sinon.stub(institutionRepository, "delete").resolves();

      const req = mockReq({}, { id: "abc-123" });
      const res = mockRes();

      await institutionController.deleteInstitution(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return 404 when the institution does not exist", async () => {
      sinon.stub(institutionRepository, "findById").resolves(null);

      const req = mockReq({}, { id: "does-not-exist" });
      const res = mockRes();

      await institutionController.deleteInstitution(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});