import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, ShieldMinus, Loader2 } from "lucide-react";
import { listUsers, updateUserRole } from "@/lib/users.functions";
import { useServerFn } from "@tanstack/react-start";
import { primaryBtn, ghostBtn } from "./adminUi";

type User = {
  id: string;
  email: string;
  emailConfirmedAt: string | null;
  roles: string[];
};

export function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const fetchUsers = useServerFn(listUsers);
  const changeRole = useServerFn(updateUserRole);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggle(user: User, role: "admin" | "editor") {
    const action = user.roles.includes(role) ? "remove" : "add";
    const key = `${user.id}-${role}`;
    setProcessing(key);
    try {
      await changeRole({ data: { user_id: user.id, role, action } });
      toast.success(`Permissão ${action === "add" ? "concedida" : "removida"}.`);
      void load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao alterar permissão.");
    } finally {
      setProcessing(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-[#16293A]">Usuários e permissões</h2>
        <button className={ghostBtn} onClick={() => void load()} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Atualizar"}
        </button>
      </div>
      <p className="text-sm text-[#727272]">
        Conceda ou revogue os perfis <strong>editor</strong> (publica conteúdo) e <strong>admin</strong> (gerencia outros usuários).
        Apenas administradores acessam esta tela.
      </p>
      {users.length === 0 && !loading && <p className="text-sm text-[#727272]">Nenhum usuário encontrado.</p>}
      <ul className="divide-y divide-[#16293A]/10 rounded-xl border border-[#16293A]/12">
        {users.map((u) => (
          <li key={u.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-[#16293A]">{u.email}</p>
              <p className="mt-1 text-xs text-[#727272]">
                {u.emailConfirmedAt ? "E-mail confirmado" : "Aguardando confirmação de e-mail"}
                {u.roles.length > 0 && ` · perfis: ${u.roles.join(", ")}`}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {(["editor", "admin"] as const).map((role) => {
                const active = u.roles.includes(role);
                const key = `${u.id}-${role}`;
                return (
                  <button
                    key={role}
                    className={active ? primaryBtn : ghostBtn}
                    disabled={!!processing}
                    onClick={() => void toggle(u, role)}
                  >
                    {processing === key ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : active ? (
                      <ShieldCheck className="mr-1.5 inline h-4 w-4" />
                    ) : (
                      <ShieldMinus className="mr-1.5 inline h-4 w-4" />
                    )}
                    {role === "admin" ? "Admin" : "Editor"}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
