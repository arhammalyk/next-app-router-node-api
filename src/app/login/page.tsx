// 'use client';

// import LoginForm from "@/components/auth/LoginForm";
// import { useEffect, useState } from "react";

// export default function LoginPage() {
//   const [name, setName] = useState('')
//   const getUser = async () => {
//     const res = await fetch("http://localhost:3000/api/getUser");
//     const data = await res.json();
//     return data.name
//   }
//   useEffect(() => {
//     const fetchUser = async () => {
//       const userName = await getUser();
//       setName(userName);
//     };
//     fetchUser();
//   }, []);
//   return (
//     <main style={{ textAlign: 'center', padding: '2rem' }}>
//       <p>{name}my name</p>
//       <h1>Login Page</h1>
//       <LoginForm />
//     </main>
//   );
// }

export const dynamic = "force-dynamic";

import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  const getUser = async () => {
    const res = await fetch("http://localhost:3000/api/getUser");
    const data = await res.json();
    return data.name
  }
  const name = getUser()
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <p>{name}my name</p>
      <h1>Login Page</h1>
      <LoginForm />
    </main>
  );
}
