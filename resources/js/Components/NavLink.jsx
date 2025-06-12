import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out focus:outline-none text-white ${
                active
                    ? 'border-b-4 border-factor-yellow-500-500 font-semibold shadow-lg'
                    : 'hover:border-2 border-factor-yellow-500-500 hover:bg-opacity-75'
            } ${className}`}
        >
            {children}
        </Link>
    );
}