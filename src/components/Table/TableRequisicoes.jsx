import React, { useState } from "react";

function TableRequisicao() {
    const [searchTerm, setSearchTerm] = useState("");

    const values = [
        { id: 1, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 3, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 4, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 5, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 6, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 7, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 8, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 9, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 10, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 11, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 12, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 13, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 14, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 15, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },
        { id: 16, nome: "Emelly", email: "teste@gmail.com", produto: "Fone de ouvido" },



    ]

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="relative shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-700">Requisições</h2>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="block w-1/3 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <div className="overflow-x-auto max-h-[72vh] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Color</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((row, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4">{row.id}</td>
                                <td className="px-6 py-4">{row.nome}</td>
                                <td className="px-6 py-4">{row.email}</td>
                                <td className="px-6 py-4">{row.produto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default TableRequisicao;
