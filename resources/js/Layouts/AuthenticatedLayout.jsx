import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {GenerateMenuList} from '@/Utils/GenerateMenuList';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const permissions = usePage().props.auth.permissions;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const MenuList = GenerateMenuList(permissions);

    return (
        <div className="min-h-screen bg-factor-primary">
            {/* Navbar Superior */}
            <nav className="bg-gradient-to-r from-factor-dark to-slate-700 shadow-lg">
                <div className="mx-auto py-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo y Menú Principal */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="w-24 h-auto text-white" />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {MenuList.map(({ prefix, page_name, icon }) => (
                                        <NavLink
                                            key={prefix}
                                            href={route(prefix)}
                                            active={route().current(prefix)}
                                        >
                                            {icon && <span className="mr-2">{icon}</span>}
                                            {page_name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Menú de Usuario (Desktop) */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-2 max-w-xs rounded-full bg-slate-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-factor-yellow-500 p-1">
                                            <span className="sr-only">Open user menu</span>
                                            <div className="h-8 w-8 rounded-full bg-factor-yellow-500 flex items-center justify-center text-factor-dark font-bold">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-white font-medium">{user.username}</span>
                                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2 text-sm text-white hover:border-2 hover:border-factor-yellow-500 transition duration-150"
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block px-4 py-2 text-sm text-white hover:border-2 hover:border-factor-yellow-500 transition duration-150"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Botón Mobile */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                {showingNavigationDropdown ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú Mobile */}
                <div className={`md:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {MenuList.map(({ prefix, page_name }) => (
                            <ResponsiveNavLink
                                key={prefix}
                                href={route(prefix)}
                                active={route().current(prefix)}
                            >
                                {page_name}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-indigo-700">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-factor-secundary flex items-center justify-center text-indigo-600 font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{user.username}</div>
                                <div className="text-sm font-medium text-indigo-200">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <ResponsiveNavLink 
                                href={route('profile.edit')}
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 hover:bg-opacity-75"
                            >
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 hover:bg-opacity-75"
                            >
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {/* {header && (
                <header className="bg-factor-secundary shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                    </div>
                </header>
            )} */}

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    {children}
                </div>
            </main>
        </div>
    );
}