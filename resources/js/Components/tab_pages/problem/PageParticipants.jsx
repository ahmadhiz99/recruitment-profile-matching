import React from "react";

export default function PageParticipants({ participants, problem }) {
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
                            <th className="py-3 px-4 text-sm">Kelompok</th>
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
                                              {participant.problem.title}
                                          </td>

                                          <td className="py-3 px-4 border-b-2 border-gray-50">
                                              <div className="flex items-center gap-0">
                                                  <i className="bx bx-fw bx-edit text-orange-500"></i>
                                                  <i className="bx bx-fw bx-trash text-rose-500"></i>
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })
                            : "Tidak ada peserta"}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
