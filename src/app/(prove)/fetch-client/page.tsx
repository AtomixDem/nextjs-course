"use client";
import { useEffect, useState } from "react";

export default function ClientUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <div className="max-w-4xl mx-auto p-8">Caricamento...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Utenti (Client Fetch)</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-slate-100 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
