"use client"

import { use, useEffect, useReducer, useState } from "react";
import { Item } from "@/types/Item"
import { listReducer } from "@/reducers/listReducer";

const Page = () => {
  const [list, dispatch] = useReducer(listReducer, []);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [number, setNumber] = useState('');

  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editNumber, setEditNumber] = useState("");

  const [isEditing, setIsEditing] = useState(false); // Estado para controlar a exibição do modal de edição
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null); // Estado para armazenar o contato que será editado

  useEffect(() => {
    if (list.length === 0) return
    localStorage.setItem('contactList', JSON.stringify(list))
    console.log(list)
  }, [list])

  useEffect(() => {
    const storedList = localStorage.getItem('contactList')
    if (storedList) {
      dispatch({ type: 'setList', payload: JSON.parse(storedList) })
    }
  }, [])

    const handleAddButton = () => {
      if (name.trim() === '' || lastName.trim() === '' || role.trim() === '' || number.trim() === '') {
        return
      }

    dispatch({
      type: 'add',
      payload: {
        id: list.length + 1,
        name: name.trim(),
        lastName: lastName.trim(),
        role: role.trim(),
        number: number.trim(),
        done: false
      }
    });
  
    setName(''); //reset no input depois de adicionar contato
    setLastName('');
    setRole('');
    setNumber('');
  }

  const handleEdit = (id: number) => {
    const item = list.find(it => it.id === id)
    if(item) {
      setEditName(item.name);
      setEditLastName(item.lastName);
      setEditRole(item.role);
      setEditNumber(item.number);
      setItemToEdit(item); // Armazena o contato que será editado no estado local
      setIsEditing(true); // Abre o modal de edição
    }
  }

  const handleRemove = (id: number) => {
    dispatch({
      type: "remove",
      payload: {
        id
      },
    })
  }

  const handleSaveEdit = () => {
    if (itemToEdit) {
      const updateItem: Item = {
      ...itemToEdit,
      name: editName,
      lastName: editLastName,
      role: editRole,
      number: editNumber,
    }

    const updatedList = list.map((item) =>
    item.id === itemToEdit.id ? updateItem : item);

    dispatch({
      type: "editText",
      payload: updateItem,
    });

    setIsEditing(false); // Fecha o modal de edição
    setItemToEdit(null); // Limpa o contato armazenado no estado local
    setEditName("");      // Limpar os estados de edição após salvar
    setEditLastName("");
    setEditRole("");
    setEditNumber("");

    }
  };

  return (
<div className="container mx-auto">
  <h1 className="text-center text-4xl my-4">Lista de Contatos</h1>
  <div className="flex items-center rounded-md bg-gray-200 border border-gray-400 p-4 my-4">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-1/6 flex-1 rounded-md border border-gray-500 p-3 bg-transparent text-black mr-2 outline-none"
      placeholder="Digite um nome"
      maxLength={20} 
      minLength={2} 
    />
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="w-1/6 flex-1 rounded-md border border-gray-500 p-3 bg-transparent text-black mr-2 outline-none"
      placeholder="Digite um sobrenome"
      maxLength={20} 
      minLength={2}
    />
    <input
      type="text"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-1/6 flex-1 rounded-md border border-gray-500 p-3 bg-transparent text-black mr-2 outline-none"
      placeholder="Cargo"
      maxLength={20} 
      minLength={2}
    />
    <input
      type="text"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      className="w-1/6 flex-1 rounded-md border border-gray-500 p-3 bg-transparent text-black mr-2 outline-none"
      placeholder="(XX) (XX) XXXXXXXXX"
      maxLength={13} 
      minLength={13}
    />
    <div className="w-1/6 flex-1 text-center text-gray-500">AÇÕES</div>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      onClick={handleAddButton}
    >
      Adicionar
    </button>
  </div>
  <ul className="max-w-2xl mx-auto">
    {list.map(item => (
      <li key={item.id} className="flex items-center p-3 my-3 border-b border-gray-700">
        <div className="w-1/6">{item.name}</div>
        <div className="w-1/6">{item.lastName}</div>
        <div className="w-1/6">{item.role}</div>
        <div className="flex-grow">{item.number}</div>
        <button
          onClick={() => handleEdit(item.id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-2"
        >
          Editar
        </button>
        <button
          onClick={() => handleRemove(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Remover
        </button>
      </li>
    ))}
  </ul>
{/* Modal de Edição */}
{isEditing && (
        <div className="modal">
          <h2 className="text-center text-2xl mb-4">Editar Contato</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full rounded-md border border-gray-500 p-3 bg-transparent text-black mb-2 outline-none"
            placeholder="Digite um nome"
            maxLength={20} 
            minLength={2}
          />
          <input
            type="text"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            className="w-full rounded-md border border-gray-500 p-3 bg-transparent text-black mb-2 outline-none"
            placeholder="Digite um sobrenome"
            maxLength={20} 
            minLength={2}
          />
          <input
            type="text"
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            className="w-full rounded-md border border-gray-500 p-3 bg-transparent text-black mb-2 outline-none"
            placeholder="Cargo"
            maxLength={20} 
            minLength={2}
          />
          <input
            type="text"
            value={editNumber}
            onChange={(e) => setEditNumber(e.target.value)}
            className="w-full rounded-md border border-gray-500 p-3 bg-transparent text-black mb-2 outline-none"
            placeholder="(XX) (XX) XXXXXXXXX"
            maxLength={13} 
            minLength={13}
          />
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveEdit}
            >
              Salvar
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default Page;