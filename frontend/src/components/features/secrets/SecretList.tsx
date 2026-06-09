import React, { useState } from 'react';
import { Search, Lock, KeyRound, Plus } from 'lucide-react';
import SecretListItem from './SecretListItem.tsx';
import {Secret} from "../../../context/ProjectContext.tsx";
import {Link} from "react-router-dom";
import Button from "../../ui/Button.tsx";

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
        <section key={count} className="card overflow-hidden" aria-labelledby="secrets-heading">
            <div className="card-header flex-wrap">
                <div className="card-header__title min-w-0">
                    <KeyRound size={16} className="text-amber-500 shrink-0" aria-hidden="true" />
                    <h2 id="secrets-heading" className="font-medium text-stone-100 truncate">Secret Keys</h2>
                    <span className="text-xs text-stone-500 tabular-nums shrink-0">({secrets.length})</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-auto w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none sm:w-44 min-w-0">
                        <label htmlFor="secret-filter" className="sr-only">Filter secrets</label>
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" aria-hidden="true" />
                        <input
                            id="secret-filter"
                            name="secret-filter"
                            type="search"
                            placeholder="Filter by key name…"
                            autoComplete="off"
                            spellCheck={false}
                            className="input-field input-field-search text-sm py-1.5"
                            value={filterQuery}
                            onChange={(e) => setFilterQuery(e.target.value)}
                        />
                    </div>
                    <Link to="/addSecret" className="shrink-0">
                        <Button
                            variant="primary"
                            size="sm"
                            icon={<Plus size={16} aria-hidden="true" />}
                            iconPosition="left"
                        >
                            Add Secret
                        </Button>
                    </Link>
                </div>
            </div>

            {secrets.length === 0 ? (
                <div className="empty-state">
                    <Lock size={36} className="text-stone-600 mb-3" aria-hidden="true" />
                    <p className="text-sm font-medium text-stone-400 mb-1">No secrets in this project</p>
                    <p className="text-xs text-stone-500">Use Add Secret above to store your first API key or environment variable.</p>
                </div>
            ) : filteredSecrets.length === 0 ? (
                <div className="empty-state py-10">
                    <p className="text-sm text-stone-500">No secrets match &ldquo;{filterQuery}&rdquo;</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="secrets-table">
                        <colgroup>
                            <col className="col-key" />
                            <col className="col-value" />
                            <col className="col-actions" />
                        </colgroup>
                        <thead>
                            <tr className="border-b border-stone-800/60 bg-stone-900/40">
                                <th scope="col" className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Key</th>
                                <th scope="col" className="py-2.5 px-4 text-left text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Value</th>
                                <th scope="col" className="py-2.5 px-4 text-right text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/40">
                            {filteredSecrets.map((secret) => (
                                <SecretListItem key={`${secret.projectName}-${secret.keyName}`} secret={secret} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default SecretList;
