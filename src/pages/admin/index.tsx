import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/Input";

import { FiTrash } from "react-icons/fi";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [bgColorInput, setBgColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        setTextColorInput("#f1f1f1");
        setBgColorInput("#121212");
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);

    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7">
      <Header />

      {/* begin::Adicionar links */}
      <form
        onSubmit={handleRegister}
        className="flex flex-col my-8 px-4 w-full max-w-xl"
      >
        {/* begin::Set data */}
        <section className="flex flex-col">
          <label className="text-white font-medium my-2">Nome do Link</label>
          <Input
            placeholder="Digite o nome do link..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />

          <label className="text-white font-medium my-2">URL do Link</label>
          <Input
            type="url"
            placeholder="Digite a URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </section>
        {/* end::Set data */}

        {/* begin::Set styles */}
        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium my-2">Fundo do Link</label>
            <input
              type="color"
              className="bg-transparent"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium my-2">Cor do Link</label>
            <input
              type="color"
              className="bg-transparent"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>
        {/* end::Set styles */}

        {/* begin::Preview */}
        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium my-3">Preview</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mt-2 mb-5"
              style={{ backgroundColor: bgColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}
        {/* end::Preview */}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7"
        >
          Cadastrar
        </button>
      </form>
      {/* end::Adicionar links */}

      {/* begin::My links */}
      <section className=" w-11/12 max-w-xl">
        <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
        {links.map((link) => (
          <article
            key={link.id}
            className="flex items-center justify-between w-full rounded py-3 px-4 mb-2 select-none"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <p>{link.name}</p>

            <button
              className="p-2 bg-gray-600/20 rounded-sm hover:bg-gray-700/30"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#ff0000" />
            </button>
          </article>
        ))}
      </section>
      {/* end::My links */}
    </div>
  );
}
