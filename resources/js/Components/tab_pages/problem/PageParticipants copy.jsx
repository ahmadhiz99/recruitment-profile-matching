import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PageParticipants({ participants, problem }) {
    const [modalAddValue, setModalAddValue] = useState(false);
    const [detailParticipant, setDetailParticipant] = useState(null);
    const [editData, setEditData] = useState(null);

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

    // State untuk menyimpan nilai input
    const [inputValues, setInputValues] = useState({});
    const [editInputValues, setEditInputValues] = useState({});

    // Fungsi untuk menangani perubahan nilai input
    const handleInputChange = (aspectId, criteriaId, value, note) => {
        // Buat salinan dari state inputValues
        const updatedInputValues = { ...inputValues };

        // Perbarui nilai input untuk aspek dan kriteria yang sesuai
        if (!updatedInputValues[aspectId]) {
            updatedInputValues[aspectId] = {};
        }
        // Simpan nilai input sebagai objek dengan properti value, id, dan note
        updatedInputValues[aspectId][criteriaId] = {
            value: value,
            criteria_id: criteriaId,
            participant_id: detailParticipant?.id,
            note: note,
        };

        // Perbarui state inputValues
        setInputValues(updatedInputValues);
    };

    useEffect(() => {
        if (editData && detailParticipant?.participant_criterias) {
            const initialInputValues = [];
            detailParticipant.participant_criterias.forEach((item) => {
                initialInputValues.push({
                    id: item.id,
                    value: item.value,
                    note: item.note,
                    criteria_id: item.criteria_id,
                    participant_id: item.participant_id,
                });
            });
            setEditInputValues(initialInputValues);
        }
    }, [editData, detailParticipant?.participant_criterias]);

    console.log(problem.aspects.flatMap((aspect) => aspect.criterias));

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit w-full">
            <div className="p-6 w-full">
                <div className="flex flex-row justify-between items-center mb-5">
                    <h1 className="font-bold text-xl">
                        Total: {participants.length}
                    </h1>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-3 px-4 w-4 text-sm">No</th>
                            <th className="py-3 px-4 text-sm">Nama Peserta</th>
                            <th className="py-3 px-4 text-sm">Email</th>
                            {/* <th className="py-3 px-4 text-sm">Kelompok</th> */}
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
                                          <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {participant.participant_criterias
                                                  .length > 0 && (
                                                  <i className="bx bx-fw bx-check-circle text-emerald-500"></i>
                                              )}
                                          </td>
                                          <td className="py-3 px-4 border-b-2 border-gray-50 w-52">
                                              <div className="flex items-center gap-2 w-full">
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
                                                  <button className="bg-rose-500 py-2 px-3 rounded text-sm w-fit text-white">
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
            <Modal show={modalAddValue} onClose={() => reset()}>
                <div
                    className="p-12 overflow-y-auto"
                    style={{ maxHeight: "46rem" }}
                >
                    <p className="text-xl font-bold">
                        Penilaian - {detailParticipant?.user.name}
                    </p>
                    {problem.aspects.map((aspect, aspectIdx) =>
                        aspect.criterias.map((criteria, criteriaIdx) => {
                            // return console.log(editInputValues);
                            return (
                                <div key={criteria.id}>
                                    <input
                                        type="hidden"
                                        name={`aspects[${aspect.id}][${criteria.id}][criteria_id]`}
                                        value={criteria.id}
                                    />
                                    <p>{criteria.criteria}</p>
                                    <input
                                        type="text"
                                        value={
                                            editData
                                                ? editInputValues[criteriaIdx]
                                                      ?.value
                                                : inputValues[aspect.id]?.[
                                                      criteria.id
                                                  ]?.value || ""
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                aspect.id,
                                                criteria.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type="text"
                                        value={
                                            editData
                                                ? editInputValues[criteriaIdx]
                                                      ?.note
                                                : inputValues[aspect.id]?.[
                                                      criteria.id
                                                  ]?.note || ""
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                aspect.id,
                                                criteria.id,
                                                inputValues[aspect.id]?.[
                                                    criteria.id
                                                ]?.value || "",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Catatan"
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
                            className="bg-indigo-500 py-2 px-3 text-white rounded"
                            onClick={() => submitData(inputValues)}
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
                                className="bg-indigo-500 py-2 px-3 text-white rounded"
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
