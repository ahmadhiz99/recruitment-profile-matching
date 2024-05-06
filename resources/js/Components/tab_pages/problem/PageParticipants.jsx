import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PageParticipants({ participants, problem }) {
    const [modalAddValue, setModalAddValue] = useState(false);
    const [detailParticipant, setDetailParticipant] = useState(null);
    const [editData, setEditData] = useState(null);

    const { register, handleSubmit, setValue, getValues } = useForm();

    const onSubmit = (data) => {
        router.visit(route("pm.gap"), {
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

    const reset = () => {
        setModalAddValue(false);
        setDetailParticipant(null);
        setEditData(null);
    };

    if (editData) {
        problem.aspects.forEach((aspect, aspectIdx) => {
            detailParticipant?.participant_criterias.forEach(
                (criteria, criteriaIdx) => {
                    setValue(
                        `aspects[${aspectIdx}].criterias[${criteriaIdx}].value`,
                        criteria.value
                    );
                    setValue(
                        `aspects[${aspectIdx}].criterias[${criteriaIdx}].note`,
                        criteria.note
                    );
                    setValue(
                        `aspects[${aspectIdx}].criterias[${criteriaIdx}].criteria_id`,
                        criteria.criteria_id
                    );
                    setValue(
                        `aspects[${aspectIdx}].criterias[${criteriaIdx}].participant_id`,
                        detailParticipant?.id
                    );
                }
            );
        });
    }

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
                                          {/* <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                              {participant.problem.title}
                                          </td> */}
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
                                                      <button className="bg-slate-500 py-2 px-3 rounded text-sm w-fit text-white">
                                                          Edit Nilai
                                                      </button>
                                                  ) : (
                                                      <button
                                                          className="bg-blue-500 py-2 px-3 rounded text-sm w-fit text-white"
                                                          onClick={() => {
                                                              setEditData(true);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {problem.aspects.map((aspect, aspectIdx) =>
                            aspect.criterias.map((criteria, criteriaIdx) => (
                                <div
                                    key={`${aspectIdx}-${criteriaIdx}`}
                                    className="flex flex-col gap-3 mt-8 p-8 bg-slate-100 rounded-lg"
                                >
                                    <p className="text-lg font-semibold">
                                        {criteria.criteria} ({criteria.code})
                                    </p>
                                    <div className="flex flex-row gap-3">
                                        <input
                                            className="rounded-lg border border-gray-300"
                                            type="hidden"
                                            value={criteria.id}
                                            {...register(
                                                `aspects[${aspectIdx}].criterias[${criteriaIdx}].criteria_id`
                                            )}
                                        />
                                        <input
                                            className="rounded-lg border border-gray-300"
                                            type="hidden"
                                            value={detailParticipant?.id}
                                            {...register(
                                                `aspects[${aspectIdx}].criterias[${criteriaIdx}].participant_id`
                                            )}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm">
                                                Nilai
                                            </label>
                                            <select
                                                className="rounded-lg border border-gray-300"
                                                {...register(
                                                    `aspects[${aspectIdx}].criterias[${criteriaIdx}].value`
                                                )}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                            {/* <input
                                                className="rounded-lg border border-gray-300"
                                                type="text"
                                                placeholder="Contoh: 5"
                                                {...register(
                                                    `aspects[${aspectIdx}].criterias[${criteriaIdx}].value`
                                                )}
                                            /> */}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <label className="text-sm">
                                                Catatan
                                            </label>
                                            <input
                                                className="rounded-lg border border-gray-300"
                                                type="text"
                                                placeholder="Contoh: cukup baik"
                                                {...register(
                                                    `aspects[${aspectIdx}].criterias[${criteriaIdx}].note`
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
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
                    </form>
                </div>
            </Modal>
        </div>
    );
}
