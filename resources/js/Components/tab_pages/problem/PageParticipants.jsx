import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PageParticipants({ participants, problem }) {
    const [modalAddValue, setModalAddValue] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [detailParticipant, setDetailParticipant] = useState(null);
    const [editData, setEditData] = useState(null);

    const resetDetail = () => {
        setModalDetail(false);
        setDetailParticipant(null);
    };

    const reset = () => {
        setModalAddValue(false);
        setDetailParticipant(null);
        setEditData(null);
        setInputValues({});
        setEditInputValues({});
    };

    const submitData = (data) => {
        router.visit(route("pm.store.participant.criterias"), {
            method: "post",
            data: {
                data: data,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil tambah nilai");
                reset();
            },
        });
    };

    const updateSubmitData = (data) => {
        router.visit(route("pm.update.participant.criteria"), {
            method: "put",
            data: {
                data: data,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah nilai");
                reset();
            },
        });
    };

    const startProfileMatching = (e) => {
        e.preventDefault();
        router.visit(route("pm.start"), {
            method: "get",
            data: {
                problem_id: problem.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil melakukan analisis!");
                reset();
            },
        });
    };

    const deleteData = (e, id) => {
        e.preventDefault();
        router.visit(`/user/delete/${id}`, {
            method: "delete",
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Sukses menghapus!");
            },
        });
    };

    const [inputValues, setInputValues] = useState({});
    const [editInputValues, setEditInputValues] = useState({});

    const handleInputChange = (criteriaId, value, note) => {
        const updatedInputValues = { ...inputValues };

        updatedInputValues[criteriaId] = {
            value: value,
            criteria_id: criteriaId,
            participant_id: detailParticipant?.id,
            note: note,
        };
        setInputValues(updatedInputValues);
    };

    useEffect(() => {
        if (editData && detailParticipant?.participant_criterias) {
            const initialEditInputValues = {}; // Menggunakan objek
            detailParticipant.participant_criterias.forEach((item) => {
                initialEditInputValues[item.criteria_id] = {
                    id: item.id,
                    value: item.value,
                    note: item.note,
                    criteria_id: item.criteria_id,
                    participant_id: item.participant_id,
                };
            });
            setEditInputValues(initialEditInputValues);
        }
    }, [editData, detailParticipant?.participant_criterias]);

    const criterias = problem.aspects.flatMap((aspect) => aspect.criterias).slice(0,5);

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit w-full">
            <div className="p-6 w-full">
                <div className="flex flex-row justify-between items-center mb-5">
                    <h1 className="font-bold text-xl">
                        Total: {participants.length}
                    </h1>
                    <PrimaryButton onClick={(e) => startProfileMatching(e)}>
                        Analisis
                    </PrimaryButton>
                </div>
                <table className="w-full text-center">
                    <thead className="bg-gray-100 ">
                        <tr>
                            <th className="py-3 px-4 w-4 text-sm">No</th>
                            <th className="py-3 px-4 text-sm">Nama Peserta</th>
                            <th className="py-3 px-4 text-sm">Email</th>
                            {/* <th className="py-3 px-4 text-sm">Kelompok</th> */}
                            <th className="py-3 px-4 text-sm">Berkas</th>
                            <th className="py-3 px-4 text-sm">Status</th>
                            <th className="py-3 px-4 w-10 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.length > 0
                            ? participants.map((participant, idx) => {
                                  return (
                                      <tr key={participant.id}>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {idx + 1}
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {participant.user.name}
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {participant.user.email}
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm flex gap-1">
                                                {
                                                    participant.user.cv != null ?
                                                    (
                                                        <div>
                                                                <PrimaryButton className="bg-teal-500">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        "/user/get/document/cv/" +
                                                                         participant.user.id
                                                                    }
                                                                >
                                                                    CV
                                                            </a>
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <PrimaryButton className="bg-teal-500" disabled={true}>
                                                                    CV
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                }
                                                 {
                                                    participant.user.ijazah != null ?
                                                    (
                                                        <div>
                                                                <PrimaryButton className="bg-teal-500">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        "/user/get/document/ijazah/" +
                                                                         participant.user.id
                                                                    }
                                                                >
                                                                    Ijazah
                                                            </a>
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <PrimaryButton className="bg-teal-500" disabled={true}>
                                                                    Ijazah
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                }
                                                 {
                                                    participant.user.portofolio != null ?
                                                    (
                                                        <div>
                                                                <PrimaryButton className="bg-teal-500">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        "/user/get/document/portofolio/" +
                                                                         participant.user.id
                                                                    }
                                                                >
                                                                    Portofolio
                                                            </a>
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <PrimaryButton className="bg-teal-500" disabled={true}>
                                                                Portofolio
                                                            </PrimaryButton>
                                                        </div>
                                                    )
                                                }
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {participant.participant_criterias
                                                  .length > 0 && (
                                                  <i className="bx bx-fw bx-check-circle text-emerald-500"></i>
                                              )}
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 w-80">
                                              <div className="flex items-center gap-2 w-full">
                                                    <button className="bg-yellow-500 py-2 px-3 rounded text-sm w-fit text-white"
                                                            onClick={()=>{
                                                                setModalDetail(
                                                                    true
                                                                );
                                                                setDetailParticipant(
                                                                    participant
                                                                );
                                                            }}
                                                        >
                                                            Detail
                                                    </button>
                                                  {participant
                                                      .participant_criterias
                                                      .length > 0 ? (
                                                      <button
                                                          className="bg-slate-500 py-2 px-3 rounded text-sm w-fit text-white"
                                                          onClick={() => {
                                                              setDetailParticipant(
                                                                  participant
                                                              );
                                                              setModalAddValue(
                                                                  true
                                                              );
                                                              setEditData(true);
                                                          }}
                                                      >
                                                          Edit Nilai
                                                      </button>
                                                  ) : (
                                                      <button
                                                          className="bg-blue-500 py-2 px-3 rounded text-sm w-fit text-white"
                                                          onClick={() => {
                                                              setDetailParticipant(
                                                                  participant
                                                              );
                                                              setModalAddValue(
                                                                  true
                                                              );
                                                          }}
                                                      >
                                                          Beri Nilai
                                                      </button>
                                                  )}
                                                  <button className="bg-rose-500 py-2 px-3 rounded text-sm w-fit text-white"
                                                    onClick={(
                                                            e
                                                        ) =>
                                                            deleteData(
                                                                e,
                                                                participant.user.id
                                                            )
                                                    }
                                                  >
                                                      Hapus
                                                  </button>
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })
                            : "Tidak ada peserta"}
                    </tbody>
                </table>
            </div>
            
            <Modal show={modalDetail} onClose={() => resetDetail()}>
    <div className="p-12">
        <div style={{ maxHeight: "46rem", overflowY: "auto" }}>
            <p className="text-xl font-bold">Detail - {detailParticipant?.user.name}</p>

            <p><strong>Full Name:</strong></p>
            <p>{detailParticipant?.user.fullname}</p>

            <p><strong>Email:</strong></p>
            <p>{detailParticipant?.user.email}</p>

            <p><strong>Address:</strong></p>
            <p>{detailParticipant?.user.address}</p>

            <p><strong>WhatsApp:</strong></p>
            <p>{detailParticipant?.user.whatsapp}</p>


            {detailParticipant?.user?.cv && (
                <>
                    <p><strong>CV:</strong></p>
                    <p>
                        <a 
                            href={`/user/get/document/cv/${detailParticipant.user.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            View CV
                        </a>
                    </p>
                </>
            )}

            {detailParticipant?.user?.ijazah && (
                <>
                    <p><strong>Ijazah:</strong></p>
                    <p>
                        <a 
                            href={`/user/get/document/ijazah/${detailParticipant.user.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            View Ijazah
                        </a>
                    </p>
                </>
            )}

            {detailParticipant?.user?.portofolio && (
                <>
                    <p><strong>Portofolio:</strong></p>
                    <p>
                        <a 
                            href={`/user/get/document/portofolio/${detailParticipant.user.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            View Portofolio
                        </a>
                    </p>
                </>
            )}

        </div>
    </div>
</Modal>




            <Modal show={modalAddValue} onClose={() => reset()}>
                <div
                    className="p-12 overflow-y-auto"
                    style={{ maxHeight: "46rem" }}
                >
                    <p className="text-xl font-bold">
                        Penilaian - {detailParticipant?.user.name}
                    </p>
                    {criterias?.map((criteria, idx) => {
                        const inputValue = editData
                            ? editInputValues[criteria.id] || {
                                  value: "",
                                  note: "",
                              }
                            : inputValues[criteria.id] || {
                                  value: "",
                                  note: "",
                              };

                        return (
                            <div
                                key={idx}
                                className="bg-slate-100 my-5 p-5 rounded-lg"
                            >
                                <input type="hidden" value={criteria.id} />
                                <p className="mb-3 font-semibold">
                                    {criteria.criteria} ({criteria.code})
                                </p>
                                <div className="flex flex-row items-center gap-2">
                                    <select
                                        className="rounded-lg border border-gray-300"
                                        value={inputValue.value}
                                        onChange={(e) =>
                                            editData
                                                ? setEditInputValues({
                                                      ...editInputValues,
                                                      [criteria.id]: {
                                                          ...editInputValues[
                                                              criteria.id
                                                          ],
                                                          value: e.target.value,
                                                      },
                                                  })
                                                : setInputValues({
                                                      ...inputValues,
                                                      [criteria.id]: {
                                                          ...inputValues[
                                                              criteria.id
                                                          ],
                                                          value: e.target.value,
                                                          criteria_id:
                                                              criteria.id,
                                                          participant_id:
                                                              detailParticipant?.id,
                                                      },
                                                  })
                                        }
                                    >
                                        <option value={0}>
                                            -- Choose --
                                        </option>
                                        <option value={5}>
                                            Sangat Baik - 5
                                        </option>
                                        <option value={4}>Baik - 4</option>
                                        <option value={3}>Cukup - 3</option>
                                        <option value={2}>Kurang - 2</option>
                                        <option value={1}>
                                            Sangat Kurang - 1
                                        </option>
                                    </select>

                                    <input
                                        type="text"
                                        className="rounded-lg border border-gray-300"
                                        value={inputValue.note}
                                        onChange={(e) =>
                                            editData
                                                ? setEditInputValues({
                                                      ...editInputValues,
                                                      [criteria.id]: {
                                                          ...editInputValues[
                                                              criteria.id
                                                          ],
                                                          note: e.target.value,
                                                      },
                                                  })
                                                : setInputValues({
                                                      ...inputValues,
                                                      [criteria.id]: {
                                                          ...inputValues[
                                                              criteria.id
                                                          ],
                                                          note: e.target.value,
                                                          criteria_id:
                                                              criteria.id,
                                                          participant_id:
                                                              detailParticipant?.id,
                                                      },
                                                  })
                                        }
                                        placeholder="Catatan"
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-row items-center gap-3 mt-5">
                        <button
                            className="bg-slate-300 py-2 px-3 rounded"
                            onClick={() => reset()}
                        >
                            <i className="bx bx-fw bx-x"></i> Batal
                        </button>
                        <button
                            className="bg-teal-500 py-2 px-3 text-white rounded"
                            onClick={() =>
                                editData
                                    ? updateSubmitData(editInputValues)
                                    : submitData(inputValues)
                            }
                        >
                            <i className="bx bx-fw bx-save"></i> Submit
                        </button>
                    </div>
                    {/* <form onSubmit={submitData}>
                        {problem.aspects.map((aspect, aspectIdx) =>
                            aspect.criterias.map((criteria, criteriaIdx) => {
                                return (
                                    <div key={criteria.id}>
                                        <p>{criteria.criteria}</p>
                                        <input
                                            type="text"
                                            value={
                                                inputValues[aspect.id]?.[
                                                    criteria.id
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    aspect.id,
                                                    criteria.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })
                        )}
                        <div className="flex flex-row items-center gap-3 mt-5">
                            <button
                                className="bg-slate-300 py-2 px-3 rounded"
                                onClick={() => reset()}
                            >
                                <i className="bx bx-fw bx-x"></i> Batal
                            </button>
                            <button
                                className="bg-teal-500 py-2 px-3 text-white rounded"
                                type="submit"
                            >
                                <i className="bx bx-fw bx-save"></i> Submit
                            </button>
                        </div>
                    </form> */}
                </div>
            </Modal>
        </div>
    );
}
