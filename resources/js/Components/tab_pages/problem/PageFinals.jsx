import React from "react";

export default function PageFinals({ participants, problem }) {
    const sortParticipants = participants.sort((a, b) => b.final - a.final);
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit w-full">
            <div className="p-6 w-full">
                <div className="flex flex-row justify-between items-center mb-5">
                    <h1 className="font-bold text-xl">Ranking Peserta</h1>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-3 px-4 text-sm">Nama Peserta</th>
                            <th className="py-3 px-4 text-sm">Email</th>
                            <th className="py-3 px-4 text-sm">Nilai</th>
                            <th className="py-3 px-4 text-sm">Ranking</th>
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
                                        {participant.final}
                                    </td>
                                    <td className="py-3 px-4 border-b-2 border-gray-50 text-sm">
                                        {idx + 1}
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
