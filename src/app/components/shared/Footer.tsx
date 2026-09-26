import Image from "next/image";
const Footer = () => <footer className="mt-20 border-t border-[#252525] bg-[#070707]"><div className="container-fit flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><Image src="/logo.png" alt="FitLog" width={34} height={34} /><span className="font-display text-xl">FITLOG</span></div><p className="text-sm text-zinc-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>;
export default Footer;
