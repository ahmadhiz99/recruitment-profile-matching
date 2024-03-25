import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users({ auth }) {
    const data = usePage().props;
    const nextPage = (e) => {
        e.preventDefault();
        router.visit(`${data.users.next_page_url}`, {
            method: "get",
            preserveState: true,
            preserveScroll: true,
        });
    };
    const prevPage = (e) => {
        e.preventDefault();
        router.visit(`${data.users.prev_page_url}`, {
            method: "get",
            preserveState: true,
            preserveScroll: true,
        });
    };
    const firstPage = (e) => {
        e.preventDefault();
        router.visit(`${data.users.first_page_url}`, {
            method: "get",
            preserveState: true,
            preserveScroll: true,
        });
    };
    const lastPage = (e) => {
        e.preventDefault();
        router.visit(`${data.users.last_page_url}`, {
            method: "get",
            preserveState: true,
            preserveScroll: true,
        });
    };
    const deleteData = (e, id) => {
        e.preventDefault();
        router.visit(`user/delete/${id}`, {
            method: "delete",
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Sukses menghapus!");
            },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengguna
                </h2>
            }
        >
            <Head title="Pengguna" />
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
                        <div className="p-6 w-full">
                            <div className="flex flex-row justify-between items-center mb-5">
                                <h1 className="font-bold text-xl">
                                    Total: {data.users.total}
                                </h1>
                                <PrimaryButton className="bg-indigo-500">
                                    <Link href={route("user.create")}>
                                        Tambah
                                    </Link>
                                </PrimaryButton>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="py-3 px-4 w-4 text-sm">
                                            No
                                        </th>
                                        <th className="py-3 px-4 text-sm">
                                            Nama Pengguna
                                        </th>
                                        <th className="py-3 px-4 text-sm">
                                            Email
                                        </th>

                                        <th className="py-3 px-4 text-sm">
                                            Role
                                        </th>
                                        <th className="py-3 px-4 w-10 text-sm">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.data.length > 0 &&
                                        data.users.data.map((user, idx) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                        {user.name}{" "}
                                                        {user.id ===
                                                        auth.user.id
                                                            ? "(Saya)"
                                                            : ""}
                                                    </td>
                                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                        {user.email}
                                                    </td>
                                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                                        {user.role.name}
                                                    </td>
                                                    <td className="py-3 px-4 border-b-2 border-gray-50">
                                                        <div className="flex items-center gap-0">
                                                            <Link
                                                                href={
                                                                    "user/edit/" +
                                                                    user.id
                                                                }
                                                            >
                                                                <i className="bx bx-fw bx-info-circle text-blue-900"></i>
                                                            </Link>

                                                            {user.id !==
                                                                auth.user
                                                                    .id && (
                                                                <i
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteData(
                                                                            e,
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="bx bx-fw bx-trash text-rose-500"
                                                                ></i>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                            <div className="flex flex-row justify-end items-center mt-4 gap-2">
                                <p className="text-sm mr-5">
                                    Halaman data ke {data.users.current_page}{" "}
                                    dari {data.users.last_page}
                                </p>
                                {data.users.current_page > 1 && (
                                    <button
                                        className="bg-slate-200 rounded p-1"
                                        onClick={(e) => firstPage(e)}
                                    >
                                        <i className="bx bx-fw bx-chevrons-left"></i>
                                    </button>
                                )}
                                {data.users.current_page > 1 && (
                                    <button
                                        className="bg-slate-200 rounded p-1"
                                        onClick={(e) => prevPage(e)}
                                    >
                                        <i className="bx bx-fw bx-chevron-left"></i>
                                    </button>
                                )}

                                {data.users.current_page <
                                    data.users.last_page && (
                                    <button
                                        className="bg-slate-200 rounded p-1"
                                        onClick={(e) => nextPage(e)}
                                    >
                                        <i className="bx bx-fw bx-chevron-right"></i>
                                    </button>
                                )}

                                {data.users.current_page <
                                    data.users.last_page && (
                                    <button
                                        className="bg-slate-200 rounded p-1"
                                        onClick={(e) => lastPage(e)}
                                    >
                                        <i className="bx bx-fw bx-chevrons-right"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
