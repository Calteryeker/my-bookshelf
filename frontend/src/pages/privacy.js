import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
    return (
        <div className="pt-28 flex flex-col justify-between bg-romantic-1 min-h-screen ">
            <Head>
                <title>MyBookshelf | Termos</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar bgColor={`white`} tittleColor={`brow_pod-1`} />
            <div className="flex flex-col items-center my-10 bg-white rounded-2xl mx-auto w-96 pb-10 md_c:w-[858px] md_c:mx-auto">
                <img src="/images/logo_bg_brow.png" className="mx-auto mt-10" width={80} height={80} />
                <h2 className="font-luck text-brow_pod-1 text-center text-3xl my-4">POLITICAS DE USO E PRIVACIDADE</h2>
                <div className="text-left mx-2 mt-4">
                    <h3>What is Lorem Ipsum?</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <h3 className="mt-10">What is Lorem Ipsum?</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}