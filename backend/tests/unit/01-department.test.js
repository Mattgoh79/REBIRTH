//so far, replaced all institution/s with department/s . department need institutions so add that and make the tests work matt.
// i mean you couldddd ai it but like doing this will actually make you understand teh code so. pls do that
import { expect } from "chai";
import sinon from "sinon";

import * as departmentController from "../../controllers/department.js";
import departmentRepository from "../../repositories/department.js";
import { mockReq, mockRes } from "../mocks/department.mock.js";

describe("Department Controller", () => {
  // Reset all stubs after each test so they don't affect the next one
  afterEach(() => sinon.restore());

  // Create

  describe("createDepartment", () => {
    it("should return 201 and the created department", async () => {
      const created = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(departmentRepository, "create").resolves(created);

      const req = mockReq({
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      });
      const res = mockRes();

      await departmentController.createDepartment(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.name).to.equal("Otago Polytechnic");
    });

    it("should return 500 when the repository throws", async () => {
      sinon
        .stub(departmentRepository, "create")
        .rejects(new Error("DB error"));

      const req = mockReq({
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      });
      const res = mockRes();

      await departmentController.createDepartment(req, res);

      expect(res.status.calledWith(500)).to.be.true;
    });
  });

  // Read all

  describe("getDepartments", () => {
    it("should return 200 and all departments", async () => {
      const departments = [
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

      sinon.stub(departmentRepository, "findAll").resolves({
        data: departments,
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

      await departmentController.getDepartments(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data).to.have.length(2);
    });

    it("should return 404 when no departments exist", async () => {
      sinon.stub(departmentRepository, "findAll").resolves({
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

      await departmentController.getDepartments(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it("should return 500 when the repository throws", async () => {
      sinon
        .stub(departmentRepository, "findAll")
        .rejects(new Error("DB error"));

      const req = mockReq({}, {}, {});
      const res = mockRes();

      await departmentController.getDepartments(req, res);

      expect(res.status.calledWith(500)).to.be.true;
    });
  });

  // Read one

  describe("getDepartment", () => {
    it("should return 200 and the matching department", async () => {
      const department = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(departmentRepository, "findById").resolves(department);

      const req = mockReq({}, { id: "abc-123" });
      const res = mockRes();

      await departmentController.getDepartment(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.id).to.equal("abc-123");
    });

    it("should return 404 when the department does not exist", async () => {
      sinon.stub(departmentRepository, "findById").resolves(null);

      const req = mockReq({}, { id: "does-not-exist" });
      const res = mockRes();

      await departmentController.getDepartment(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  // Update

  describe("updateDepartment", () => {
    it("should return 200 and the updated department", async () => {
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

      sinon.stub(departmentRepository, "findById").resolves(existing);
      sinon.stub(departmentRepository, "update").resolves(updated);

      const req = mockReq(
        { name: "Otago Polytechnic Te Kura Matatini ki Otago" },
        { id: "abc-123" },
      );
      const res = mockRes();

      await departmentController.updateDepartment(req, res);

      expect(res.status.calledWith(200)).to.be.true;

      const body = res.json.firstCall.args[0];
      expect(body.data.name).to.equal(
        "Otago Polytechnic Te Kura Matatini ki Otago",
      );
    });

    it("should return 404 when the department does not exist", async () => {
      sinon.stub(departmentRepository, "findById").resolves(null);

      const req = mockReq({ name: "Updated" }, { id: "does-not-exist" });
      const res = mockRes();

      await departmentController.updateDepartment(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  // Delete

  describe("deleteDepartment", () => {
    it("should return 200 and a success message", async () => {
      const existing = {
        id: "abc-123",
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      };

      sinon.stub(departmentRepository, "findById").resolves(existing);
      sinon.stub(departmentRepository, "delete").resolves();

      const req = mockReq({}, { id: "abc-123" });
      const res = mockRes();

      await departmentController.deleteDepartment(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return 404 when the department does not exist", async () => {
      sinon.stub(departmentRepository, "findById").resolves(null);

      const req = mockReq({}, { id: "does-not-exist" });
      const res = mockRes();

      await departmentController.deleteDepartment(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });
});