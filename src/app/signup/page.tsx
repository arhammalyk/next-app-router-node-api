export default function SignupPage() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Signup Page</h1>
      <form>
        <input type="text" placeholder="Username" /><br /><br />
        <input type="password" placeholder="Password" /><br /><br />
        <button type="submit">Signup</button>
      </form>
    </main>
  );
}
