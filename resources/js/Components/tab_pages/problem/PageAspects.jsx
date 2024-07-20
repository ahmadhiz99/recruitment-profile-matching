import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function PageAspects({ aspects, problem }) {
    const [aspect, setAspect] = useState({});
    const [aspectName, setAspectName] = useState("");
    const [editModeAspect, setEditModeAspect] = useState(false);
    const [factor, setFactor] = useState("");
    const [index, setIndex] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalAspect, setShowModalAspect] = useState(false);

    const [criteria, setCriteria] = useState();
    const [criteriaName, setCriteriaName] = useState("");
    const [criteriaCode, setCriteriaCode] = useState("");
    const [criteriaValue, setCriteriaValue] = useState("");

    const [editModeCriteria, setEditModeCriteria] = useState(false);

    const storeAspect = (e) => {
        e.preventDefault();
        router.visit(`/aspect/store`, {
            method: "post",
            data: {
                name: aspectName,
                problem_id: problem.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil tambah aspek");
                resetState();
            },
        });
    };

    const putAspect = (e, aspect) => {
        e.preventDefault();
        router.visit(`/aspect/update/${aspect.id}`, {
            method: "put",
            data: {
                name: aspectName,
                problem_id: problem.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah aspek");
                resetEditMode();
                resetState();
            },
        });
    };

    const deleteAspect = (e, id) => {
        e.preventDefault();
        router.visit(`/aspect/delete/${id}`, {
            method: "delete",

            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil hapus aspek");
                resetState();
            },
        });
    };

    const storeCriteria = (e) => {
        e.preventDefault();
        router.visit(`/criteria/store`, {
            method: "post",
            data: {
                criteria: criteriaName,
                code: criteriaCode,
                factor: factor,
                value: criteriaValue,
                aspect_id: aspect.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil tambah kriteria");
                resetState();
            },
        });
    };

    const putCriteria = (e, criteria) => {
        e.preventDefault();
        router.visit(`/criteria/update/${criteria.id}`, {
            method: "put",
            data: {
                criteria: criteriaName,
                code: criteriaCode,
                factor: factor,
                value: criteriaValue,
                aspect_id: aspect.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah kriteria");
                resetState();
            },
        });
    };

    const deleteCriteria = (e, criteria) => {
        e.preventDefault();
        router.visit(`/criteria/delete/${criteria.id}`, {
            method: "delete",
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil hapus kriteria");
                resetState();
            },
        });
    };

    const editMode = (aspect, idx) => {
        setIndex(idx);
        if (index === idx) {
            setEditModeAspect(true);
            setAspectName(aspect.name);
        }
    };

    const resetEditMode = () => {
        setIndex("");
        setEditModeAspect(false);
        setAspectName("");
    };

    const formModal = (setShow, aspect, criteria) => {
        setShowModal(setShow);
        setAspect(aspect);
        if (criteria) {
            setCriteria(criteria);
            setCriteriaName(criteria.criteria);
            setFactor(criteria.factor);
            setCriteriaCode(criteria.code);
            setCriteriaValue(criteria.value);
            setEditModeCriteria(true);
        }
    };

    const resetState = () => {
        resetEditMode();
        setShowModal(false);
        setShowModalAspect(false);
        setAspect({});
        setCriteria();
        setCriteriaName("");
        setCriteriaCode("");
        setCriteriaValue("");
        setEditModeCriteria(false);
    };
    return (
        <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
            <div className="p-6 w-full">
                <div className="flex flex-row justify-between items-center mb-3">
                    <p className="text-xl font-bold mb-3">Aspek Penilaian</p>
                    <PrimaryButton onClick={() => setShowModalAspect(true)}>
                        Tambah Baru
                    </PrimaryButton>
                </div>
                <hr />
                {/* <div className="flex flex-row items-center gap-2 mt-4 mb-4">
                    <input
                        className="rounded-lg border border-gray-300 w-full"
                        type="text"
                        placeholder="Masukkan nama aspek"
                        value={aspectName}
                        onChange={(e) => setAspectName(e.target.value)}
                    />
                    <select
                        onChange={(e) => setFactor(e.target.value)}
                        defaultValue={0}
                        className="rounded-lg border border-gray-300 w-full"
                    >
                        <option value={0} disabled>
                            Pilih tipe factor
                        </option>
                        <option value={"CF"}>Core Factor</option>
                        <option value={"SF"}>Secondary Factor</option>
                    </select>
                    <PrimaryButton onClick={(e) => storeAspect(e)}>
                        Tambah
                    </PrimaryButton>
                </div> */}

                <div className="grid grid-cols-12 gap-2 mb-4 mt-4">
                    {aspects.length > 0
                        ? aspects.map((asp, idx) => {
                              return (
                                  <div
                                      key={asp.id}
                                      className="col-span-6 bg-white border border-slate-300 rounded h-fit"
                                  >
                                      {editModeAspect && index === idx ? (
                                          <div className="flex flex-row justify-between items-center bg-slate-100 p-3">
                                              <input
                                                  className="rounded-lg border border-gray-300"
                                                  type="text"
                                                  placeholder="Masukkan judul pekerjaan"
                                                  value={aspectName}
                                                  onChange={(e) =>
                                                      setAspectName(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                              <div className="flex flex-row items-center gap-2">
                                                  <PrimaryButton
                                                      className="bg-rose-500"
                                                      onClick={() =>
                                                          resetEditMode()
                                                      }
                                                  >
                                                      Batal
                                                  </PrimaryButton>
                                                  <PrimaryButton
                                                      className="bg-teal-500"
                                                      onClick={(e) =>
                                                          putAspect(e, asp)
                                                      }
                                                  >
                                                      Simpan
                                                  </PrimaryButton>
                                              </div>
                                          </div>
                                      ) : (
                                          <div className="flex flex-row justify-between items-center bg-slate-100 p-3">
                                              <p className="text-lg font-bold">
                                                  Aspek : {asp.name}
                                              </p>
                                              <div className="flex flex-row items-center gap-4">
                                                  <p
                                                      className="text-sm text-orange-500"
                                                      onClick={() =>
                                                          editMode(asp, idx)
                                                      }
                                                  >
                                                      Edit
                                                  </p>
                                                  <p
                                                      className="text-sm text-rose-500"
                                                      onClick={(e) =>
                                                          deleteAspect(
                                                              e,
                                                              asp.id
                                                          )
                                                      }
                                                  >
                                                      Hapus
                                                  </p>
                                              </div>
                                          </div>
                                      )}
                                      <div className="flex flex-col gap-2 p-3">
                                          <div className="flex flex-row justify-between items-center">
                                              <p className="font-semibold">
                                                  Jumlah Kriteria:{" "}
                                                  {asp.criterias.length}
                                              </p>
                                              <button
                                                  onClick={() =>
                                                      formModal(true, asp)
                                                  }
                                                  className="p-2 bg-teal-500 text-sm rounded text-white"
                                              >
                                                  <i className="bx bx-fw bx-plus"></i>{" "}
                                                  Kriteria
                                              </button>
                                          </div>
                                          {asp.criterias.length > 0
                                              ? asp.criterias.map((crit) => {
                                                    return (
                                                        <div
                                                            key={crit.id}
                                                            className="bg-slate-100 p-3 rounded border border-slate-200 flex flex-row justify-between items-center"
                                                        >
                                                            <p className="text-sm">
                                                                ({crit.code}){" "}
                                                                {crit.criteria}
                                                            </p>
                                                            <div className="flex flex-row items-center gap-0">
                                                                <i
                                                                    className="bx bx-fw bx-edit text-orange-500"
                                                                    onClick={() =>
                                                                        formModal(
                                                                            true,
                                                                            asp,
                                                                            crit
                                                                        )
                                                                    }
                                                                ></i>
                                                                <i
                                                                    className="bx bx-fw bx-x text-rose-500"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteCriteria(
                                                                            e,
                                                                            crit
                                                                        )
                                                                    }
                                                                ></i>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                              : "Belum ada kriteria"}
                                      </div>
                                  </div>
                              );
                          })
                        : "Belum ada aspek"}
                </div>
            </div>
            <Modal show={showModal} onClose={() => resetState()} maxWidth="md">
                <div className="p-6">
                    <p className="font-semibold text-lg">
                        Tambah Kriteria Baru
                    </p>
                    <div className="mt-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nama Kriteria</label>
                                <input
                                    className="rounded-lg border border-gray-300"
                                    type="text"
                                    placeholder="Contoh: Kreatif"
                                    value={criteriaName}
                                    onChange={(e) =>
                                        setCriteriaName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Kode</label>
                                <input
                                    className="rounded-lg border border-gray-300"
                                    type="text"
                                    placeholder="Contoh: A1"
                                    value={criteriaCode}
                                    onChange={(e) =>
                                        setCriteriaCode(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Tipe Faktor</label>
                                <select
                                    onChange={(e) => setFactor(e.target.value)}
                                    defaultValue={0}
                                    value={factor}
                                    className="rounded-lg border border-gray-300 w-full"
                                >
                                    <option value={0} disabled>
                                        Pilih tipe factor
                                    </option>
                                    <option value={"CF"}>Core Factor</option>
                                    <option value={"SF"}>
                                        Secondary Factor
                                    </option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nilai</label>
                                <input
                                    className="rounded-lg border border-gray-300"
                                    type="number"
                                    placeholder="Nilai dari 1 sampai 5"
                                    value={criteriaValue}
                                    onChange={(e) =>
                                        setCriteriaValue(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-row justify-end items-center gap-2">
                                <PrimaryButton onClick={() => resetState()}>
                                    Batal
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={(e) =>
                                        criteria
                                            ? putCriteria(e, criteria)
                                            : storeCriteria(e)
                                    }
                                    className="bg-teal-500"
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                show={showModalAspect}
                onClose={() => resetState()}
                maxWidth="md"
            >
                <div className="p-6">
                    <p className="font-semibold text-lg">Tambah Aspek Baru</p>
                    <div className="mt-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Nama Aspek</label>
                                <input
                                    className="rounded-lg border border-gray-300 w-full"
                                    type="text"
                                    placeholder="Masukkan nama aspek"
                                    value={aspectName}
                                    onChange={(e) =>
                                        setAspectName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-row justify-end items-center gap-2">
                                <PrimaryButton onClick={() => resetState()}>
                                    Batal
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={(e) => storeAspect(e)}
                                    className="bg-teal-500"
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
