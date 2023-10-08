import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full">
      <nav className="w-full bg-blue-200/10 py-4 flex items-center justify-between px-3">
        <div className="flex gap-4 font-medium text-slate-300">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/social">Redes sociais</Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={28} color="#fff" />
        </button>
      </nav>
    </header>
  );
}
