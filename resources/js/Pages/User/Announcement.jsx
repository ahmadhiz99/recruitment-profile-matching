import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, Link } from "@inertiajs/react";
export default function Announcement({ auth }) {
    const data = usePage().props.auth.user;
    const dataPage = usePage().props;

    console.log(dataPage);
  
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Announcement</h2>}
        >
            <Head title="Announcement" />

            {dataPage.auth.user.role_id != 3 ? 
            (
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2 flex ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.userCount}</p>
                            <p className='text-sm font-thin'>Data Pelamar</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.problemCount}</p>
                            <p className='text-sm font-thin'>Lowongan</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.aspectCount}</p>
                            <p className='text-sm font-thin'>Data Aspect</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.criteriaCount}</p>
                            <p className='text-sm font-thin'>Data Criteria</p>
                        </div>
                    </div>
                   
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
            )
            :
            (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {data.cv != null && data.qualified == 0 ? 
                            (<div>
                                <div class="mx-auto ">
                                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 bg-center p-4 rounded-lg text-center">
                                        <p class="me-2 inline-block text-white font-bold text-2xl py-10">
                                            Lamaran mu masih Dalam Proses Review
                                        </p>
                                    </div>
                                </div>
                            </div>)
                            :
                                data.cv == null ?
                                (<div>
                                    <div class="mx-auto ">
                                        <div class="bg-gradient-to-r from-sky-500 to-indigo-500  bg-center p-4 rounded-lg text-center">
                                            <p class="me-2 inline-block text-white font-bold text-2xl py-10">
                                                Silahkan Upload Data CV
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                                :
                                data.qualified == 1 ?
                                 (<div>
                                    <div class="mx-auto ">
                                        <div class="bg-gradient-to-r from-green-500 to-indigo-500 bg-center p-4 rounded-lg text-center">
                                            <p class="me-2 inline-block text-white font-bold text-2xl py-10">
                                            Selamat Kamu Berhasil Lolos Ke Tahap Interview
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                                :
                                 data.qualified == 3 ?
                                (<div>
                                    <div class="mx-auto ">
                                        <div class="bg-gradient-to-r from-sky-500 to-green-500 bg-center p-4 rounded-lg text-center">
                                            <p class="me-2 inline-block text-white font-bold text-2xl py-10">
                                            Selamat Kamu Berhasil Lolos Ke Tahap Selanjutnya
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                                :
                                (<div>
                                    <div class="mx-auto ">
                                        <div class="bg-gradient-to-r from-purple-500 to-red-500 bg-center p-4 rounded-lg text-center">
                                            <p class="me-2 inline-block text-white font-bold text-2xl py-10">
                                            Maaf Kamu Gagal Ke Tahap Selanjutnya
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                        }
                        {/* {data.qualified == 0} */}
                        <div>

                    </div>

                    </div>
                </div>
            </div>
            )}


            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2">
                    <h1 className='text-lg font-bold'>Lowongan lainnya</h1>
                </div>
            {dataPage.problem?.map((problem, idx)=>{
                return(
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full mx-2">
                            <div className="px-5 py-5 text-gray-900 font-bold">
                                <span class="mr-2 inline-flex items-center rounded-xl bg-gray-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-gray-500/10">{problem.status}</span>
                                {problem.title}
                            </div>
                            <div className="px-5 py-2 text-gray-900 font-thin">{problem.description}</div>
                            <div className="px-5 py-2 text-gray-500 font-thin text-sm">Post date, {new Date(problem.created_at).toLocaleString('id-ID')}</div>
                        </div>
                    </div>
                )
            })}
            </div>
           
        </AuthenticatedLayout>
    );
}
