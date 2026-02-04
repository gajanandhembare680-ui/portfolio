import { useOSStore } from '@/store/useOSStore';

export default function Desktop({ children }) {
    const { wallpaper } = useOSStore();

    return (
        <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden transition-all duration-500"
            style={{
                backgroundImage: `url('${wallpaper}')`
            }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
