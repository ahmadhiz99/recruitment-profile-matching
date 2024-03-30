import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ auth }) {
    const data = usePage().props;

    const [title, setTitle] = useState(data.problem.title);
    const [description, setDescription] = useState(data.problem.description);
    const [status, setStatus] = useState(data.problem.status);
    const [coreFactor, setCoreFactor] = useState(
        data.problem.factories[0].percent
    );
    const [secondaryFactor, setSecondaryFactor] = useState(
        data.problem.factories[1].percent
    );
    const [page, setPage] = useState("edit");

    const [factor, setFactor] = useState("");
    const [aspectName, setAspectName] = useState("");
    const [editModeAspect, setEditModeAspect] = useState(false);
    const [aspectIdx, setAspectIdx] = useState("");

    const update = (e) => {
        e.preventDefault();
        router.visit(`/problem/update/${data.problem.id}`, {
            method: "put",
            data: {
                title: title,
                description: description,
                status: status,
                created_by: auth.user.name,
                core_factor: coreFactor,
                secondary_factor: secondaryFactor,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah pekerjaan");
                setFactor("");
                setAspectName("");
            },
        });
    };

    const storeAspect = (e) => {
        e.preventDefault();
        router.visit(`/aspect/store`, {
            method: "post",
            data: {
                name: aspectName,
                factory_id: factor,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil tambah aspek");
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
            },
        });
    };

    const aspectEditMode = (aspect, isEdit, idx) => {
        setEditModeAspect(isEdit);
        setAspectName(aspect.name);
        setAspectIdx(idx);
    };

    const putAspect = (e, aspect, factorId) => {
        e.preventDefault();
        router.visit(`/aspect/update/${aspect.id}`, {
            method: "put",
            data: {
                name: factorId ? aspect.name : aspectName,
                factory_id: factorId ? factorId : aspect.factory_id,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil update aspek");
                setFactor("");
                setAspectName("");
                setAspectIdx("");
                setEditModeAspect(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Pekerjaan
                </h2>
            }
        >
            <Head title="Detail Data" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
            />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center gap-2 mb-4">
                        <button
                            onClick={() => setPage("edit")}
                            className={`${
                                page === "edit"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-transparent text-indigo-500 border border-indigo-500"
                            } py-2 px-4 rounded`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setPage("aspect")}
                            className={`${
                                page === "aspect"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-transparent text-indigo-500 border border-indigo-500"
                            } py-2 px-4 rounded`}
                        >
                            Aspek Nilai
                        </button>
                        <button
                            onClick={() => setPage("selisih")}
                            className={`${
                                page === "selisih"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-transparent text-indigo-500 border border-indigo-500"
                            } py-2 px-4 rounded`}
                        >
                            Selisih Bobot
                        </button>
                        <button
                            onClick={() => setPage("participant")}
                            className={`${
                                page === "participant"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-transparent text-indigo-500 border border-indigo-500"
                            } py-2 px-4 rounded`}
                        >
                            Peserta
                        </button>
                        <button
                            onClick={() => setPage("result")}
                            className={`${
                                page === "result"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-transparent text-indigo-500 border border-indigo-500"
                            } py-2 px-4 rounded`}
                        >
                            Hasil Akhir
                        </button>
                    </div>
                    {page === "edit" && (
                        <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
                            <div className="p-6 w-full">
                                <p className="text-xl font-bold mb-3">
                                    Edit Data
                                </p>
                                <hr />
                                <div className="w-1/2 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">Judul</label>
                                        <input
                                            className="rounded-lg border border-gray-300"
                                            type="text"
                                            placeholder="Masukkan judul pekerjaan"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            className="rounded-lg border border-gray-300"
                                            placeholder="Masukkan deskripsi"
                                            cols="30"
                                            rows="10"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-1/2 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Status
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                            value={status}
                                            className="rounded-lg border border-gray-300"
                                        >
                                            <option value={0} disabled>
                                                Pilih status
                                            </option>
                                            <option value={"open"}>Buka</option>
                                            <option value={"pending"}>
                                                Pending
                                            </option>
                                            <option value={"done"}>
                                                Selesai
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-1/2 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Core Factor (%)
                                        </label>
                                        <input
                                            className="rounded-lg border border-gray-300"
                                            type="number"
                                            placeholder="Misal: 60"
                                            value={coreFactor}
                                            onChange={(e) =>
                                                setCoreFactor(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm">
                                            Secondary Factor (%)
                                        </label>
                                        <input
                                            className="rounded-lg border border-gray-300"
                                            type="number"
                                            placeholder="Misal: 40"
                                            value={secondaryFactor}
                                            onChange={(e) =>
                                                setSecondaryFactor(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row mt-5 gap-2">
                                    <button className="bg-slate-200 px-4 py-2 rounded-lg">
                                        <Link
                                            href={route("problem.index")}
                                            className="text-sm"
                                        >
                                            Batal
                                        </Link>
                                    </button>
                                    <button
                                        onClick={(e) => update(e)}
                                        className="bg-indigo-500 px-4 py-2 rounded-lg"
                                    >
                                        <p className="text-white text-sm">
                                            Simpan
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {page === "aspect" && (
                        <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
                            <div className="p-6 w-full">
                                <p className="text-xl font-bold mb-3">
                                    Aspek Penilaian
                                </p>
                                <hr />
                                <div className="flex flex-row items-center gap-2 mt-4 mb-4">
                                    <input
                                        className="rounded-lg border border-gray-300 w-full"
                                        type="text"
                                        placeholder="Masukkan nama aspek"
                                        value={aspectName}
                                        onChange={(e) =>
                                            setAspectName(e.target.value)
                                        }
                                    />
                                    <select
                                        onChange={(e) =>
                                            setFactor(e.target.value)
                                        }
                                        defaultValue={0}
                                        className="rounded-lg border border-gray-300 w-full"
                                    >
                                        <option value={0} disabled>
                                            Pilih tipe factor
                                        </option>
                                        {data.problem.factories.map(
                                            (factor) => {
                                                return (
                                                    <option
                                                        key={factor.id}
                                                        value={factor.id}
                                                    >
                                                        {factor.type}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <PrimaryButton
                                        onClick={(e) => storeAspect(e)}
                                    >
                                        Tambah
                                    </PrimaryButton>
                                </div>
                                <p className="mb-3">Tipe : Core Factor</p>
                                <div className="grid grid-cols-12 gap-2 mb-4">
                                    {data.problem.factories[0].aspects.length >
                                    0
                                        ? data.problem.factories[0].aspects.map(
                                              (aspect, idx) => {
                                                  return (
                                                      <div
                                                          key={aspect.id}
                                                          className="col-span-6 bg-white border border-slate-300 rounded h-fit"
                                                      >
                                                          <div className="flex flex-row justify-between items-center bg-slate-100 p-3">
                                                              {editModeAspect &&
                                                              aspectIdx ===
                                                                  idx ? (
                                                                  <input
                                                                      className="rounded-lg border border-gray-300"
                                                                      type="text"
                                                                      placeholder="Masukkan nama aspek"
                                                                      value={
                                                                          aspectName
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) =>
                                                                          setAspectName(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          )
                                                                      }
                                                                  />
                                                              ) : (
                                                                  <p className="text-lg font-bold">
                                                                      Aspek :{" "}
                                                                      {
                                                                          aspect.name
                                                                      }
                                                                  </p>
                                                              )}
                                                              {editModeAspect &&
                                                              aspectIdx ===
                                                                  idx ? (
                                                                  <div className="flex flex-row items-center gap-2">
                                                                      <PrimaryButton
                                                                          className="bg-rose-500"
                                                                          onClick={() =>
                                                                              setEditModeAspect(
                                                                                  false
                                                                              )
                                                                          }
                                                                      >
                                                                          Batal
                                                                      </PrimaryButton>
                                                                      <PrimaryButton
                                                                          className="bg-indigo-500"
                                                                          onClick={(
                                                                              e
                                                                          ) => {
                                                                              putAspect(
                                                                                  e,
                                                                                  aspect
                                                                              );
                                                                          }}
                                                                      >
                                                                          Simpan
                                                                      </PrimaryButton>
                                                                  </div>
                                                              ) : (
                                                                  <div className="flex flex-row items-center gap-4">
                                                                      {aspect.factory_id ===
                                                                      data
                                                                          .problem
                                                                          .factories[0]
                                                                          .id ? (
                                                                          <p
                                                                              className="text-sm text-blue-900"
                                                                              onClick={(
                                                                                  e
                                                                              ) => {
                                                                                  putAspect(
                                                                                      e,
                                                                                      aspect,
                                                                                      data
                                                                                          .problem
                                                                                          .factories[1]
                                                                                          .id
                                                                                  );
                                                                              }}
                                                                          >
                                                                              Set
                                                                              Secondary
                                                                          </p>
                                                                      ) : (
                                                                          <p
                                                                              className="text-sm text-blue-900"
                                                                              onClick={(
                                                                                  e
                                                                              ) => {
                                                                                  putAspect(
                                                                                      e,
                                                                                      aspect,
                                                                                      data
                                                                                          .problem
                                                                                          .factories[0]
                                                                                          .id
                                                                                  );
                                                                              }}
                                                                          >
                                                                              Set
                                                                              Core
                                                                          </p>
                                                                      )}
                                                                      <p
                                                                          onClick={() => {
                                                                              aspectEditMode(
                                                                                  aspect,
                                                                                  true,
                                                                                  idx
                                                                              );
                                                                          }}
                                                                          className="text-sm text-orange-500"
                                                                      >
                                                                          Edit
                                                                      </p>
                                                                      <p
                                                                          className="text-sm text-rose-500"
                                                                          onClick={(
                                                                              e
                                                                          ) =>
                                                                              deleteAspect(
                                                                                  e,
                                                                                  aspect.id
                                                                              )
                                                                          }
                                                                      >
                                                                          Hapus
                                                                      </p>
                                                                  </div>
                                                              )}
                                                          </div>
                                                          <div className="flex flex-col gap-2 p-3">
                                                              {aspect.criterias
                                                                  .length > 0
                                                                  ? aspect.criterias.map(
                                                                        (
                                                                            criteria
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        criteria.id
                                                                                    }
                                                                                    className="bg-slate-100 p-3 rounded border border-slate-200 flex flex-row justify-between items-center"
                                                                                >
                                                                                    <p className="text-sm">
                                                                                        (
                                                                                        {
                                                                                            criteria.code
                                                                                        }

                                                                                        ){" "}
                                                                                        {
                                                                                            criteria.criteria
                                                                                        }
                                                                                    </p>
                                                                                    <div className="flex flex-row items-center gap-0">
                                                                                        <i className="bx bx-fw bx-edit text-orange-500"></i>
                                                                                        <i className="bx bx-fw bx-x text-rose-500"></i>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )
                                                                  : "Tidak ada kriteria"}
                                                          </div>
                                                      </div>
                                                  );
                                              }
                                          )
                                        : "Tidak ada aspek"}
                                </div>
                                <p className="mb-3">Tipe : Secondary Factor</p>
                                <div className="grid grid-cols-12 items-center gap-2">
                                    {data.problem.factories[1].aspects.length >
                                    0
                                        ? data.problem.factories[1].aspects.map(
                                              (aspect, idx) => {
                                                  return (
                                                      <div
                                                          key={aspect.id}
                                                          className="col-span-6 bg-white border border-slate-300 rounded h-fit"
                                                      >
                                                          <div className="flex flex-row justify-between items-center bg-slate-100 p-3">
                                                              {editModeAspect &&
                                                              aspectIdx ===
                                                                  idx ? (
                                                                  <input
                                                                      className="rounded-lg border border-gray-300"
                                                                      type="text"
                                                                      placeholder="Masukkan nama aspek"
                                                                      value={
                                                                          aspectName
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) =>
                                                                          setAspectName(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          )
                                                                      }
                                                                  />
                                                              ) : (
                                                                  <p className="text-lg font-bold">
                                                                      Aspek :{" "}
                                                                      {
                                                                          aspect.name
                                                                      }
                                                                  </p>
                                                              )}
                                                              {editModeAspect &&
                                                              aspectIdx ===
                                                                  idx ? (
                                                                  <div className="flex flex-row items-center gap-2">
                                                                      <PrimaryButton
                                                                          className="bg-rose-500"
                                                                          onClick={() =>
                                                                              setEditModeAspect(
                                                                                  false
                                                                              )
                                                                          }
                                                                      >
                                                                          Batal
                                                                      </PrimaryButton>
                                                                      <PrimaryButton
                                                                          className="bg-indigo-500"
                                                                          onClick={(
                                                                              e
                                                                          ) => {
                                                                              putAspect(
                                                                                  e,
                                                                                  aspect
                                                                              );
                                                                          }}
                                                                      >
                                                                          Simpan
                                                                      </PrimaryButton>
                                                                  </div>
                                                              ) : (
                                                                  <div className="flex flex-row items-center gap-4">
                                                                      {aspect.factory_id ===
                                                                      data
                                                                          .problem
                                                                          .factories[1]
                                                                          .id ? (
                                                                          <p
                                                                              className="text-sm text-blue-900"
                                                                              onClick={(
                                                                                  e
                                                                              ) => {
                                                                                  putAspect(
                                                                                      e,
                                                                                      aspect,
                                                                                      data
                                                                                          .problem
                                                                                          .factories[0]
                                                                                          .id
                                                                                  );
                                                                              }}
                                                                          >
                                                                              Set
                                                                              Core
                                                                          </p>
                                                                      ) : (
                                                                          <p
                                                                              className="text-sm text-blue-900"
                                                                              onClick={(
                                                                                  e
                                                                              ) => {
                                                                                  putAspect(
                                                                                      e,
                                                                                      aspect,
                                                                                      data
                                                                                          .problem
                                                                                          .factories[1]
                                                                                          .id
                                                                                  );
                                                                              }}
                                                                          >
                                                                              Set
                                                                              Secondary
                                                                          </p>
                                                                      )}
                                                                      <p
                                                                          onClick={() => {
                                                                              aspectEditMode(
                                                                                  aspect,
                                                                                  true,
                                                                                  idx
                                                                              );
                                                                          }}
                                                                          className="text-sm text-orange-500"
                                                                      >
                                                                          Edit
                                                                      </p>
                                                                      <p
                                                                          className="text-sm text-rose-500"
                                                                          onClick={(
                                                                              e
                                                                          ) =>
                                                                              deleteAspect(
                                                                                  e,
                                                                                  aspect.id
                                                                              )
                                                                          }
                                                                      >
                                                                          Hapus
                                                                      </p>
                                                                  </div>
                                                              )}
                                                          </div>
                                                          <div className="flex flex-col gap-2 p-3">
                                                              {aspect.criterias
                                                                  .length > 0
                                                                  ? aspect.criterias.map(
                                                                        (
                                                                            criteria
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        criteria.id
                                                                                    }
                                                                                    className="bg-slate-100 p-3 rounded border border-slate-200 flex flex-row justify-between items-center"
                                                                                >
                                                                                    <p className="text-sm">
                                                                                        (
                                                                                        {
                                                                                            criteria.code
                                                                                        }

                                                                                        ){" "}
                                                                                        {
                                                                                            criteria.criteria
                                                                                        }
                                                                                    </p>
                                                                                    <div className="flex flex-row items-center gap-0">
                                                                                        <i className="bx bx-fw bx-edit text-orange-500"></i>
                                                                                        <i className="bx bx-fw bx-x text-rose-500"></i>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )
                                                                  : "Tidak ada kriteria"}
                                                          </div>
                                                      </div>
                                                  );
                                              }
                                          )
                                        : "Tidak ada aspek"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
