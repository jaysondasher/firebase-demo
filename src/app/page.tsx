'use client';

import { useState } from 'react';
import { useAuth } from './context/AuthContext';

export default function Home() {
    const { user, profile, setProfile, signIn, signUp, logout, updateProfile } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (action: 'signin' | 'signup') => {
        try {
            setIsLoading(true);
            setError(null);
            await (action === 'signin' ? signIn(email, password) : signUp(email, password));
        } catch (error) {
            console.error('Auth error:', error);
            setError('Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        if (!profile) return;
        try {
            setIsLoading(true);
            setError(null);
            await updateProfile(profile);
        } catch (error) {
            console.error('Update error:', error);
            setError('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen p-4">
            <div className="max-w-md mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Firebase Demo</h1>
                    <p className="text-gray-600 dark:text-gray-400">User Authentication & Storage</p>
                </div>

                {!user ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded text-gray-900"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded text-gray-900"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleAuth('signin')}
                                    disabled={isLoading}
                                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {isLoading ? 'Loading...' : 'Sign In'}
                                </button>
                                <button
                                    onClick={() => handleAuth('signup')}
                                    disabled={isLoading}
                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                    {isLoading ? 'Loading...' : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">Profile</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="First Name"
                                    value={profile?.firstName ?? ''}
                                    onChange={(e) => profile && setProfile({ ...profile, firstName: e.target.value })}
                                    className="p-2 border rounded text-gray-900"
                                />
                                <input
                                    placeholder="Last Name"
                                    value={profile?.lastName ?? ''}
                                    onChange={(e) => profile && setProfile({ ...profile, lastName: e.target.value })}
                                    className="p-2 border rounded text-gray-900"
                                />
                            </div>
                            <input
                                placeholder="Phone"
                                value={profile?.phone ?? ''}
                                onChange={(e) => profile && setProfile({ ...profile, phone: e.target.value })}
                                className="w-full p-2 border rounded text-gray-900"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="Age"
                                    value={profile?.age ?? ''}
                                    onChange={(e) => profile && setProfile({ ...profile, age: e.target.value })}
                                    className="p-2 border rounded text-gray-900"
                                />
                                <input
                                    placeholder="Height (cm)"
                                    value={profile?.height ?? ''}
                                    onChange={(e) => profile && setProfile({ ...profile, height: e.target.value })}
                                    className="p-2 border rounded text-gray-900"
                                />
                            </div>
                            <button
                                onClick={handleProfileUpdate}
                                disabled={isLoading}
                                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {isLoading ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
} 