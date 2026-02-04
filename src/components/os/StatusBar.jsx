import { Wifi, Battery, BatteryCharging } from 'lucide-react';
import { useTime } from '@/hooks/useTime';
import { useBattery } from '@/hooks/useBattery';

export default function StatusBar() {
    const time = useTime();
    const battery = useBattery();

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 z-50 text-white text-xs font-medium">
            {/* Left: Time */}
            <div className="w-20">
                <span>{formatTime(time)}</span>
            </div>

            {/* Center: Maybe Dynamic Island later? */}
            <div className="flex-1"></div>

            {/* Right: Status Icons */}
            <div className="flex items-center gap-2">
                <Wifi size={14} />

                <div className="flex items-center gap-1">
                    <span>{Math.round(battery.level * 100)}%</span>
                    {battery.charging ? <BatteryCharging size={16} /> : <Battery size={16} />}
                </div>
            </div>
        </div>
    );
}
