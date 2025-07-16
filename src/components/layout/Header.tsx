export const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span className="text-xl font-bold text-blue-800">NextUp</span>
        </a>
        <nav className="flex gap-4 text-blue-700 font-medium">
          <a href="/" className="hover:text-blue-900 transition">Home</a>
          <a href="/login" className="hover:text-blue-900 transition">Login</a>
          <a href="/signup" className="hover:text-blue-900 transition">Sign Up</a>
        </nav>
      </div>
    </header>
  )
}