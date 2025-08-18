import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <div className="flex justify-between items-center ">
          <Link href="/">
            <div className="flex flex-row gap-2 justify-center ">
              <Image src="/logo.svg" alt="Description" width={38} height={38} />
              <h2 className="text-2xl font-bold ">TalentAI</h2>
            </div>
          </Link>

          <div className="rounded-full overflow-hidden w-12 h-12 flex items-center justify-center">
            <Image
              src="/profile.svg"
              width={50}
              height={50}
              alt="Description"
            />
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
