import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function PageDifferences({ differences, problem }) {
    const [selisih, setSelisih] = useState("");
    const [weightValue, setWeightValue] = useState("");
    const [description, setDescription] = useState("");
    const [difference, setDifference] = useState();

    const storeDifference = (e) => {
        e.preventDefault();
        router.visit(`/difference/store`, {
            method: "post",
            data: {
                difference: selisih,
                value: weightValue,
                description: description,
                problem_id: problem.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil tambah selisih bobot");
                resetState();
            },
        });
    };

    const putDifference = (e) => {
        e.preventDefault();
        router.visit(`/difference/update/${difference.id}`, {
            method: "put",
            data: {
                difference: selisih,
                value: weightValue,
                description: description,
                problem_id: problem.id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah selisih bobot");
                resetState();
            },
        });
    };

    const deleteDifference = (e, id) => {
        e.preventDefault();
        router.visit(`/difference/delete/${id}`, {
            method: "delete",
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil hapus selisih bobot");
                resetState();
            },
        });
    };

    const resetState = () => {
        setSelisih("");
        setWeightValue("");
        setDescription("");
        setDifference();
    };

    return (
        <div className="flex flex-row gap-2">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit w-full">
                <div className="p-6 w-full">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <h1 className="font-bold text-xl">Total: 5</h1>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="py-3 px-4 w-4 text-sm">No</th>
                                <th className="py-3 px-4 text-sm">Selisih</th>
                                <th className="py-3 px-4 text-sm">Nilai</th>
                                <th className="py-3 px-4 text-sm">Deskripsi</th>
                                <th className="py-3 px-4 w-10 text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {differences.length > 0
                                ? differences.map((dif, idx) => {
                                      return (
                                          <tr key={dif.id}>
                                              <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                  {idx + 1}
                                              </td>
                                              <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                  {dif.difference}
                                              </td>
                                              <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                  {dif.value}
                                              </td>

                                              <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                  {dif.description}
                                              </td>
                                              <td className="py-3 px-4 border-b-2 border-gray-50">
                                                  <div className="flex items-center gap-0">
                                                      <i
                                                          className="bx bx-fw bx-edit text-orange-500"
                                                          onClick={() => {
                                                              setDifference(
                                                                  dif
                                                              );
                                                              setSelisih(
                                                                  dif.difference
                                                              );
                                                              setWeightValue(
                                                                  dif.value
                                                              );
                                                              setDescription(
                                                                  dif.description
                                                              );
                                                          }}
                                                      ></i>
                                                      <i
                                                          className="bx bx-fw bx-trash text-rose-500"
                                                          onClick={(e) =>
                                                              deleteDifference(
                                                                  e,
                                                                  dif.id
                                                              )
                                                          }
                                                      ></i>
                                                  </div>
                                              </td>
                                          </tr>
                                      );
                                  })
                                : "Tidak ada selisih bobot"}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white w-1/2 p-6 h-fit">
                <p className="font-semibold text-lg">Tambah Selisih Bobot</p>
                <div className="mt-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Selisih</label>
                            <input
                                className="rounded-lg border border-gray-300"
                                type="text"
                                value={selisih}
                                onChange={(e) => setSelisih(e.target.value)}
                                placeholder="Contoh: 1 atau -1"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Nilai</label>
                            <input
                                className="rounded-lg border border-gray-300"
                                type="number"
                                value={weightValue}
                                onChange={(e) => setWeightValue(e.target.value)}
                                placeholder="Contoh: 4.5"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Deskripsi</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="rounded-lg border border-gray-300"
                                placeholder="Masukkan deskripsi"
                                cols="30"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="flex flex-row justify-end items-center gap-2">
                            <PrimaryButton onClick={() => resetState()}>
                                Batal
                            </PrimaryButton>
                            <PrimaryButton
                                className="bg-indigo-500"
                                onClick={(e) =>
                                    difference
                                        ? putDifference(e)
                                        : storeDifference(e)
                                }
                            >
                                Simpan
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
