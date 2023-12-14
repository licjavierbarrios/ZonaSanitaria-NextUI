import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-10 w-full">
      <h1>Hola desde Dashboard</h1>
      {session ? (
        <>
          <h1>Estas logueado</h1>
          <pre className="w-1/2">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </>
      ) : (
        <h1>No estas logueado</h1>
      )}
    </div>
  );
}

// "use client";
// import { useSession } from "next-auth/react";

// const DashboarPage = () => {
//   const { data: session, status } = useSession();
//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }
//   console.log(session);
//   console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <pre>
//         <code>{JSON.stringify(session, null, 2)}</code>
//       </pre>
//     </div>
//   );
// };
// export default DashboarPage;

