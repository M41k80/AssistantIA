import Link from "next/link"
import Image from "next/image"

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center py-30">
      <div className="flex-1 flex flex-col items-center space-y-8">
        <Link href="/dashboard" className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
            <Image
              src="/dashboard-icon.svg"
              alt="Dashboard"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
        </Link>

        <Link href="/dashboard/email" className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
              <Image
              src="/mail-icon.svg"
              alt="mail"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
        </Link>

        <Link href="/dashboard/finanzas" className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
            <Image
              src="/budget-coontrol-icon.svg"
              alt="budget"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
        </Link>

        <Link href="/dashboard/tasks" className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
            <Image
              src="/tasks-icon.svg"
              alt="tasks"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
        </Link>

        <Link href="/dashboard/scraping" className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
            <Image
              src="/scraping-icon.svg"
              alt="scraping"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
        </Link>
      </div>

      <button className="p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-130">
            <Image
              src="/logout-icon.svg"
              alt="budget"
              width={30}
              height={30}
              className="text-white/80 hover:text-white transition-colors"
            />
      </button>
    </div>
  )
}
