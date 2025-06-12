import Image from "next/image";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#9FD8CE] text-black font-semibold py-6 mt-2 text-sm">
      <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-center">
        <p>©{currentYear} Team 423</p>
        <a href="https://github.com/Team-423" target="_blank" rel="author">
          <Image
            className="h-5 w-auto transition-transform duration-300 transform hover:scale-125"
            src="/images/github-logo/black/github-mark.png"
            alt="GitHub logo"
            height={24}
            width={24}
          />
        </a>
        <Link href="/meet-the-team" className="hover:underline">
          Meet The Team!
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
