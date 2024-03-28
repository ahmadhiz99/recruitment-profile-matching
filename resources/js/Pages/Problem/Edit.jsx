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

    const update = (e) => {
        e.preventDefault();
        router.visit(`/problem/update/${data.problem.id}`, {
            method: "put",
            data: {
                title: title,
                description: description,
                status: status,
                created_by: auth.user.name,
            },
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Berhasil ubah pekerjaan");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Pekerjaan
                </h2>
            }
        >
            <Head title="Edit Data" />
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
                    <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
                        <div className="p-6 w-full">
                            <p className="text-xl font-bold mb-3">Edit Data</p>
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
                                    <label className="text-sm">Deskripsi</label>
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
                                    <label className="text-sm">Status</label>
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
                                        <option value={"done"}>Selesai</option>
                                    </select>
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
                                    <p className="text-white text-sm">Simpan</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
