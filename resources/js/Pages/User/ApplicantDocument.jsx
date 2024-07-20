import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
export default function ApplicantDocument({ auth }) {
    const dataCurr = usePage().props.auth.user;
    const dataPage = usePage().props;
    console.log(dataPage);
    
    const { data, setData, post, progress } = useForm({
        cv: null,
        ijazah: null,
        portofolio: null,
        divisi:null
      })
      
    const submit = (e) => {
        e.preventDefault();
        post(`/user/update/document/${dataCurr.id}`)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ApplicantDocument</h2>}
        >
            <Head title="ApplicantDocument" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {
                            dataCurr.cv == null ? 
                            (
                                <>
                                <div className=" text-gray-900 text-lg font-black py-2 border-b-2">Upload CV untuk menuju tahap Selanjutnya</div>
                                <form className='pt-5' onSubmit={submit}>
                                    <div className="flex flex-col gap-2 mt-2 mb-10 ">
                                        <label className="text-sm font-black">
                                            Divisi Yang Dilamar
                                        </label>
                                        <select
                                            onChange={e => setData('divisi', e.target.value)} 
                                            className="rounded-lg border border-gray-300"
                                        >
                                                    <option value="0">
                                                        -- Choose -- 
                                                    </option>
                                            {dataPage.divisi.map((item,idx)=>{
                                                    return (
                                                    <option value={item.id}>
                                                        {item.title}
                                                    </option>
                                                    )
                                                })
                                            }
                                        
                                        </select>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 mt-2 mb-10 ">
                                        <label className="text-sm font-black">
                                            Masukan CV
                                        </label>
                                        <input  
                                            onChange={e => setData('cv', e.target.files[0])} 
                                            type="file" 
                                            class="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 mt-2 mb-10 ">
                                        <label className="text-sm font-black">
                                            Masukan Ijazah
                                        </label>
                                        <input  
                                            onChange={e => setData('ijazah', e.target.files[0])} 
                                            type="file" 
                                            class="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 mt-2 mb-10 ">
                                        <label className="text-sm font-black">
                                            Masukan Portofolio
                                        </label>
                                        <input  
                                            onChange={e => setData('portofolio', e.target.files[0])} 
                                            type="file" 
                                            class="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                        />
                                    </div>

                                    {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                                    <div className='py-5'>
                                        <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg text-white">Submit Berkas</button>
                                    </div>
                                </form>
                                </>
                            )
                            :
                            (
                                <div className=" text-gray-900 font-bold">CV Sudah Diupload, Silahkan Tunggu Pengumuman Selanjutnya</div>
                            )
                        }
                           
                            
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
