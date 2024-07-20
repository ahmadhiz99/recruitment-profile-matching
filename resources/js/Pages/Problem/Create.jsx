import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create({ auth }) {
    const data = usePage().props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("open");
    const [coreFactor, setCoreFactor] = useState("");
    const [secondaryFactor, setSecondaryFactor] = useState("");

    const store = (e) => {
        e.preventDefault();
        router.visit(`/problem/store`, {
            method: "post",
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
                toast.success("Berhasil tambah pekerjaan");
                setTimeout(() => {
                    window.location.href = route("problem.index");
                }, 3000);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Pekerjaan
                </h2>
            }
        >
            <Head title="Tambah Baru" />
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
                            <p className="text-xl font-bold mb-3">
                                Tambah Baru
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
                                            setSecondaryFactor(e.target.value)
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
                                    onClick={(e) => store(e)}
                                    className="bg-teal-500 px-4 py-2 rounded-lg"
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
