import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
export default function PageFinalsQualified({ participants, problem }) {
    const sortParticipants = participants.sort((a, b) => b.final_qualified - a.final_qualified);
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit w-full">
            <div className="p-6 w-full">
                <div className="flex flex-row justify-between items-center mb-5">
                    <h1 className="font-bold text-xl">Ranking Peserta Final</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-3 px-4 text-sm">Nama Peserta</th>
                            <th className="py-3 px-4 text-sm">Email</th>
                            <th className="py-3 px-4 text-sm">Nilai</th>
                            <th className="py-3 px-4 text-sm">Ranking</th>
                            <th className="py-3 px-4 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortParticipants.map((participant, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        {participant.user.name}
                                    </td>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        {participant.user.email}
                                    </td>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        {participant.final_qualified}
                                    </td>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        {idx + 1}
                                    </td>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        <div className="flex items-center gap-0">
                                            
                                            <PrimaryButton disabled={participant.qualified_status == 3 ? true:false} className="bg-teal-500 mx-1" >
                                                <Link
                                                    href={
                                                       "/user/update/qualified_final/" + participant.user.id + "/" + participant.id
                                                    }
                                                >
                                                <p className="font-weight-100">lolos</p>
                                            </Link>
                                            </PrimaryButton>
                                            <PrimaryButton  disabled={ participant.qualified_status == 4 ? true:false} className="bg-red-500 mx-1" >
                                                <Link
                                                    href={
                                                        "/user/update/no_qualified_final/" + participant.user.id + "/" + participant.id
                                                    }
                                                >
                                                <p className="font-weight-100">Tidak Lolos</p>
                                            </Link>
                                            </PrimaryButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
