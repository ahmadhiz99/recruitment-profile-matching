import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
export default function ApplicantBiodata({ auth }) {
    const dataCurr = usePage().props.auth.user;
    const dataPage = usePage().props;
    console.log(dataPage);
    
    const { data, setData, post, progress } = useForm({
        fullname:dataCurr.fullname?dataCurr.fullname:null,
        nickname:dataCurr.nickname?dataCurr.nickname:null,
        email:dataCurr.email?dataCurr.email:null,
        phone:dataCurr.phone?dataCurr.phone:null,
        whatsapp:dataCurr.whatsapp?dataCurr.whatsapp:null,
      })
      
    const submit = (e) => {
        e.preventDefault();
        post(`/user/update/biodata/${dataCurr.id}`)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ApplicantBiodata</h2>}
        >
            <Head title="ApplicantBiodata" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {
                            // dataCurr.cv == null ? 
                            (
                                <>
                                <div className=" text-gray-900 text-lg font-black py-2 border-b-2">Lengkapi Data Diri</div>
                                <form onSubmit={submit}>
                                    <div className="flex flex-col gap-2 my-5">
                                        <label className="text-sm font-bold">
                                           Nama Lengkap
                                        </label>
                                        <input
                                            onChange={e => setData('fullname', e.target.value)} 
                                            value={data.fullname}
                                            className="rounded-lg border border-gray-300"
                                        >
                                            
                                        </input>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 my-5">
                                        <label className="text-sm font-bold">
                                           Nama Panggilan
                                        </label>
                                        <input
                                            value={data.nickname}
                                            onChange={e => setData('nickname', e.target.value)} 
                                            className="rounded-lg border border-gray-300"
                                        >
                                        </input>
                                    </div>

                                    <div className="flex flex-col gap-2 my-5">
                                        <label className="text-sm font-bold">
                                          Email
                                        </label>
                                        <input
                                            disabled
                                            value={data.email}
                                            type='email'
                                            onChange={e => setData('email', e.target.value)} 
                                            className="rounded-lg border border-gray-300 bg-gray-100"
                                        >
                                        </input>
                                    </div>

                                    <div className="flex flex-col gap-2 my-5">
                                        <label className="text-sm font-bold">
                                          No Hp
                                        </label>
                                        <input
                                             value={data.phone}
                                            type='number'
                                            onChange={e => setData('phone', e.target.value)} 
                                            className="rounded-lg border border-gray-300"
                                        >
                                        </input>
                                    </div>

                                    <div className="flex flex-col gap-2 my-5">
                                        <label className="text-sm font-bold">
                                          No Whatsapp
                                        </label>
                                        <input
                                             value={data.whatsapp}
                                            type='number'
                                            onChange={e => setData('whatsapp', e.target.value)} 
                                            className="rounded-lg border border-gray-300"
                                        >
                                        </input>
                                    </div>

                                    
                                    <div className='py-5'>
                                        <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg text-white">Simpan Data</button>
                                    </div>
                                </form>
                                </>
                            )
                        }
                           
                            
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
