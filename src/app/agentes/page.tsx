import { Agente, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

// https://youtu.be/kHfDLN9w1KQ?si=lmjpKnClmxXSu2bG  minuto 25

async function getAgentes(): Promise<Agente[]> {
  const session = await getServerSession(authOptions);
  const token = session.user.token;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agentes`,
    {
      method: "GET",
      headers: {
        "x-token": token,
      },
    }
  );
  const data: { agentes: Agente[] } = await response.json();
  return data.agentes;
}

const page = async () => {
  const data = await getAgentes();
  // const agentes = result?.agentes || [];
  // console.log(data);
  return (
    <section className="max-h-full py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">Todos los agentes</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default page;
