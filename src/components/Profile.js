import React from 'react';
export default function Profile(loggedInUser){


    const userJson = localStorage.getItem("loggedInUser");

    const user = JSON.parse(userJson);








    return(
        <div className="bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-3xl font-semibold mb-4">Profile</h1>
                <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 flex items-center justify-center">
                        <img className="h-40 w-40 rounded-full object-cover" src={user.profileImageUrl} alt="Avatar" />
                    </div>
                    <div className="col-span-2 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Saved Content</h2>
                            <p className="text-gray-600">Number of saved items: {user.savedContentList.length}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}