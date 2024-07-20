import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const dataPage = usePage().props;
    const data = usePage().props.auth.user;
    console.log(data);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2 flex ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.problemCurrCount}</p>
                            <p className='text-sm font-thin'>Lamaranmu</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full">
                        <div className="p-6 text-gray-900">
                            <p className='text-xl font-black'>{dataPage.problemCount}</p>
                            <p className='text-sm font-thin'>Lowongan Tersedia</p>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-2 flex ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-2 w-full flex ">
                        <img width={400} height={400} src="https://ptiksh.com/wp-content/uploads/2023/10/REPLACE-THIS-SCREEN11111121-scaled.jpg" />
                            <div className="p-6 text-gray-900 text-justify ">
                            <div className="text-gray-900 font-bold text-lg">
                                PT Inspirasi Keuangan Syariah
                            </div>
                                Adalah bagian dari Lembaga Pendidikan, Konsultasi, Pelatihan, dan Standardisasi perencanaan keuangan syariah di seluruh Indonesia, yang didirikan pada tahun 2014 dan disahkan menjadi PT pada tanggal 18 Agustus 2022 dengan misi meningkatkan kualifikasi sumber daya manusia di industri keuangan Indonesia, dan menjadi wadah perencanaan keuangan yang wajib melalui pendidikan dan sertifikasi.Para anggota profesi perencanaan keuangan dalam wadah PT Inspirasi Keuangan Syariah berkarya di bidang jasa keuangan yang terikat seperti agen asuransi dan reksadana, wealth manager, financial consultant, financial advisor, perencana keuangan, financial educator dan bahkan sebagai dewan direksi sebuah perusahaan. Selain itu juga independent sebagai perencana keuangan independent.PT Inspirasi Keuangan Syariah adalah partner dari Lembaga Standaridisasi Profesi Perencanaan Keuangan, Financial Planning Standards Board Indonesia (FPSB Indonesia) adalah pemilik lisensi CFP®, Certified Financial Planner® yang berpusat di Denver, Amerika Serikat. FPSB telah berafiliasi dengan dengan PT Inspirasi Keuangan Syariah. Lembaga ini telah memenuhi seluruh persyaratan dan memperoleh hak untuk melaksanakan program sertifikasi AWP secara eksklusif di Indonesia. Selain itu, PT Inspirasi Keuangan Syariah juga melakukan pengembangan, pengawasan dan promosi sertifikasi AWP Syariah.PT Inspirasi Keuangan Syariah sangat bangga dapat bermitra dengan FPSB Indonesia & AWP Academy, yang secara bersama akan membantu mengembangkan profesi perencanaan keuangan yang mengacu kepada prinsip dan standar AWP Syariah. PT Inspirasi Keuangan Syariah telah menunjukkan kemampuan dan komitmennya untuk mengembangkan, mengadministrasikan dan menjaga standar baku program sertifikasi AWP Syariah di Indonesia.
                            </div>
                    </div>
                </div>
                
            </div>
            )}
        </AuthenticatedLayout>
    );
}
