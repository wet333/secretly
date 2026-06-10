import React, { useState } from "react";
import { Search, Lock, Plus } from "lucide-react";
import SecretListItem from "./SecretListItem.tsx";
import { Secret } from "../../../context/ProjectContext.tsx";
import { Link } from "react-router-dom";
import { Button, Panel, Field, Eyebrow, EmptyState } from "../../ui/primitives";

interface SecretsListProps {
    count: number;
    secrets: Secret[];
}

const SecretList: React.FC<SecretsListProps> = ({ secrets, count }) => {
    const [filterQuery, setFilterQuery] = useState("");

    const filteredSecrets = secrets.filter((secret) =>
        secret.keyName.toLowerCase().includes(filterQuery.toLowerCase()),
    );

    return (
        <Panel
            key={count}
            aria-labelledby="secrets-heading"
            headingId="secrets-heading"
            headerLayout="stacked"
            title={
                <h2
                    id="secrets-heading"
                    className="border-l-2 mb-2 border-accent pl-3 text-base font-semibold text-pri tracking-tight text-pretty"
                >
                    Secret Keys
                </h2>
            }
            actions={
                <div className="relative w-full min-w-0">
                    <label htmlFor="secret-filter" className="micro-label text-sec! block mb-2">
                        Secret Filter
                    </label>
                    <Field
                        id="secret-filter"
                        name="secret-filter"
                        type="search"
                        placeholder="Filter by key name…"
                        autoComplete="off"
                        spellCheck={false}
                        className="text-sm font-mono"
                        icon={<Search size={16} aria-hidden="true" />}
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                </div>
            }
        >
            {secrets.length === 0 ? (
                <EmptyState
                    icon={<Lock size={36} aria-hidden="true" />}
                    title="No secrets in this project"
                    description="Store your first API key or environment variable in this vault."
                    action={
                        <Link to="/addSecret">
                            <Button
                                variant="primary"
                                size="sm"
                                icon={<Plus size={14} aria-hidden="true" />}
                                iconPosition="left"
                            >
                                Add Secret
                            </Button>
                        </Link>
                    }
                />
            ) : filteredSecrets.length === 0 ? (
                <EmptyState
                    className="py-10"
                    description={<>No secrets match &ldquo;{filterQuery}&rdquo;</>}
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="secrets-table">
                        <colgroup>
                            <col className="col-key" />
                            <col className="col-value" />
                            <col className="col-actions" />
                        </colgroup>
                        <thead>
                            <tr className="table-head">
                                <th scope="col" className="py-2.5 px-4 text-left">
                                    <Eyebrow>Key Name</Eyebrow>
                                </th>
                                <th scope="col" className="py-2.5 px-4 text-left">
                                    <Eyebrow>Value</Eyebrow>
                                </th>
                                <th scope="col" className="py-2.5 px-4 text-right">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {filteredSecrets.map((secret) => (
                                <SecretListItem
                                    key={`${secret.projectName}-${secret.keyName}`}
                                    secret={secret}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Panel>
    );
};

export default SecretList;
