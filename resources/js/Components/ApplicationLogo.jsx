export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo.png" // Asegúrate de que el logo esté en /public/logo.png
            alt="Factor Gym Logo"
            className="w-24 h-auto" // puedes ajustar tamaño aquí
        />
    );
}
