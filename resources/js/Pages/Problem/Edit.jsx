import PrimaryButton from "@/Components/PrimaryButton";
import PageAspects from "@/Components/tab_pages/problem/PageAspects";
import PageDifferences from "@/Components/tab_pages/problem/PageDifferences";
import PageFinals from "@/Components/tab_pages/problem/PageFinals";
import PageFinalsQualified from "@/Components/tab_pages/problem/PageFinalsQualified";
import PageParticipants from "@/Components/tab_pages/problem/PageParticipants";
import PageParticipantsQualified from "@/Components/tab_pages/problem/PageParticipantsQualified";
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
    const [coreFactor, setCoreFactor] = useState(data.problem.core_factor);
    const [secondaryFactor, setSecondaryFactor] = useState(
        data.problem.secondary_factor
    );
    const [page, setPage] = useState("edit");

    console.log('[INFO]',data.problem_qualified);

    const filterParticipant = data.problem.participants.filter(
        (participant) => {
            return participant.final == null;
        }
    );
    const filterParticipantQualified = data.problem_qualified.participants.filter(
        (participant) => {
            return participant.qualified_status == '1' || participant.qualified_status == '3'; // lolos seleksi berkas
        }
    );
    const filterParticipantQualifiedFinal = data.problem_qualified.participants.filter(
        (participant) => {
            // return participant.qualified_status > 1; // lolos seleksi interview
            return participant.final_qualified != null; // lolos seleksi interview
        }
    );

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
                setTimeout(() => {
                    window.location.href = route("problem.index");
                }, 1000);
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
                autoClose={3000}
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
                                    ? "bg-teal-500 text-white"
                                    : "bg-transparent text-teal-500 border border-teal-500"
                            } py-2 px-4 rounded`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setPage("aspect")}
                            className={`${
                                page === "aspect"
                                    ? "bg-teal-500 text-white"
                                    : "bg-transparent text-teal-500 border border-teal-500"
                            } py-2 px-4 rounded`}
                        >
                            Aspek Nilai
                        </button>
                        <button
                            onClick={() => setPage("selisih")}
                            className={`${
                                page === "selisih"
                                    ? "bg-teal-500 text-white"
                                    : "bg-transparent text-teal-500 border border-teal-500"
                            } py-2 px-4 rounded`}
                        >
                            Selisih Bobot
                        </button>

                        <div>|</div>

                        <button
                            onClick={() => setPage("participant")}
                            className={`${
                                page === "participant"
                                    ? "bg-teal-500 text-white"
                                    : "bg-transparent text-teal-500 border border-teal-500"
                            } py-2 px-4 rounded`}
                        >
                            Seleksi Berkas
                        </button>
                        {filterParticipant.length === 0 && (
                            <button
                                onClick={() => setPage("result")}
                                className={`${
                                    page === "result"
                                        ? "bg-teal-500 text-white"
                                        : "bg-transparent text-teal-500 border border-teal-500"
                                } py-2 px-4 rounded`}
                            >
                                Hasil Seleksi Berkas
                            </button>
                        )}

                        <div>|</div>
                        {filterParticipantQualified.length > 0 && (
                            <button
                                onClick={() => setPage("participant_qualified")}
                                className={`${
                                    page === "participant_qualified"
                                        ? "bg-teal-500 text-white"
                                        : "bg-transparent text-teal-500 border border-teal-500"
                                } py-2 px-4 rounded`}
                            >
                                Seleksi Interview
                            </button>
                        )}
                        {filterParticipantQualifiedFinal.length > 0 && (
                            <button
                                onClick={() => setPage("result_qualified")}
                                className={`${
                                    page === "result_qualified"
                                        ? "bg-teal-500 text-white"
                                        : "bg-transparent text-teal-500 border border-teal-500"
                                } py-2 px-4 rounded`}
                            >
                                Hasil Seleksi Interview
                            </button>
                        )}
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
                                        className="bg-teal-500 px-4 py-2 rounded-lg"
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
                        <PageAspects
                            aspects={data.problem.aspects}
                            problem={data.problem}
                        />
                    )}
                    {page === "selisih" && (
                        <PageDifferences
                            differences={data.problem.differences}
                            problem={data.problem}
                        />
                    )}
                    {page === "participant" && (
                        <PageParticipants
                            participants={data.problem.participants}
                            problem={data.problem}
                        />
                    )}
                    {page === "result" && (
                        <PageFinals
                            participants={data.problem.participants}
                            problem={data.problem}
                        />
                    )}
                    {page === "participant_qualified" && (
                        <PageParticipantsQualified
                            participants={data.problem_qualified.participants.filter(participant=>participant.qualified_status == 1 || participant.qualified_status == 3)}
                            problem={data.problem}
                        />
                    )}
                    {page === "result_qualified" && (
                        <PageFinalsQualified
                        participants={data.problem_qualified.participants.filter(participant=>participant.qualified_status == 1 || participant.qualified_status == 3 && participant.qualified_status != null)}
                        problem={data.problem}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
