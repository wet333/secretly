import React, { useState } from 'react';
import { Search, Lock } from 'lucide-react';
import SecretListItem from './SecretListItem.tsx';
import {Secret} from "../../../context/ProjectContext.tsx";
import {Link} from "react-router-dom";

interface SecretsListProps {
    count: number,
    secrets: Secret[];
}

const SecretList: React.FC<SecretsListProps> = ({ secrets, count }) => {
    const [filterQuery, setFilterQuery] = useState('');

    const filteredSecrets = secrets.filter(secret =>
        secret.keyName.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
        <div key={count} className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-lg shadow-black/50">
            <div className="p-4 border-b border-stone-800 flex justify-between items-center">
                <h2 className="font-medium text-amber-200">Secret Keys</h2>
                <div className="flex items-center space-x-2">
                    <Search size={16} className="text-stone-500" />
                    <input
                        type="text"
                        placeholder="Filter secrets..."
                        className="bg-stone-800 border-none rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                </div>
            </div>
            <table className="w-full">
                <thead className="bg-stone-800">
                <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">Key Name</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">Value</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-stone-400 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                {filteredSecrets.map((secret, index) => (
                    <SecretListItem key={index} secret={secret} />
                ))}
                </tbody>
            </table>
            {secrets.length === 0 && (
                <div className="py-8 text-center text-stone-500">
                    <Lock className="mx-auto h-10 w-10 mb-3 opacity-30" />
                    <p>No secrets found in this project</p>
                    <Link to={"/addSecret"}>
                        <button className="mt-3 text-amber-400 text-sm font-medium hover:text-amber-300">Add your first secret</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SecretList;