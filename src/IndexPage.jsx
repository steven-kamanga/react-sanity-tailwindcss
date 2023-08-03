import React, { useState, useEffect } from 'react';
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "",
    dataset: "production",
    apiVersion: "2023-03-31",
    useCdn: false,
});

function IndexPage() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        async function fetchPets() {
            const petsData = await client.fetch(`*[_type == "pet"]`);
            setPets(petsData);
        }
        fetchPets();
    }, []);

    return (
        <>
            <header className="text-4xl font-bold">
                Sanity + React.js
            </header>
            <main>
                <h2 className="font-medium text-3xl mb-5 mt-5">Pets</h2>
                {pets.length > 0 && (
                    <div className=" h-50 w-50 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ul className="m-5 list list-disc items-start text-center flex flex-col">
                            {pets.map((pet) => (
                                <li key={pet._id}>{pet?.name}</li>
                            ))}
                        </ul>
                    </div>

                )}
                <div className="bg-gray-200 mt-5  rounded-lg">
                    {!pets.length > 0 && <p>No pets to show</p>}
                </div>
                <div className="bg-gray-200 mt-5  rounded-lg">
                    {pets.length > 0 && (
                        <div className="p-5">
                            <pre>{JSON.stringify(pets, null, 2)}</pre>
                        </div>
                    )}
                </div>
                <div className="bg-gray-200">
                    {!pets.length > 0 && (
                        <div className=" rounded-lg">
                            <div>¯\_(ツ)_/¯</div>
                            <p>
                                Your data will show up here when you've configured everything
                                correctly
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default IndexPage;
