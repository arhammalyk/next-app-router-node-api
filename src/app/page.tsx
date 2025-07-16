
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <section className="max-w-xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Welcome to My Next.js App</h1>
        <p className="text-lg text-blue-700 mb-8">A modern, full-stack application powered by Next.js and Express.</p>
        <a href="/login">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition">Login</button>
        </a>
      </section>

    </main>
  );
}
