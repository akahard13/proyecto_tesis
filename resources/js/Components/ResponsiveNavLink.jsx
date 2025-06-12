import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start px-4 py-3 text-base font-medium transition duration-300 ease-in-out focus:outline-none ${
                active
                    ? 'bg-factor-yellow-500 text-factor-dark'
                    : 'text-white hover:border-2 border-factor-yellow-500 hover:bg-opacity-75'
            } ${className}`}
        >
            {children}
        </Link>
    );
}