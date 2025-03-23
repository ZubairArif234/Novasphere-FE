import React from 'react'

const Footer = () => {
  return (
    <div className="min-h-[8vh] bg-cyan-50 rounded-xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 p-4 lg:p-6 text-center sm:text-left">
      <p className="text-slate-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Copyright All Rights Reserved{" "}
        <b>KanBan</b>
      </p>
      <p className="text-slate-400 text-xs sm:text-sm">
        Design & Developed by Zubair Arif
      </p>
    </div>
  )
}

export default Footer