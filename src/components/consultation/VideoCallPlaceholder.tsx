import { Video, VideoOff, Mic, MicOff, Phone, MonitorUp, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VideoCallPlaceholderProps {
  doctorName: string;
  doctorSpecialty: string;
  onEndCall: () => void;
}

const VideoCallPlaceholder = ({ doctorName, doctorSpecialty, onEndCall }: VideoCallPlaceholderProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <div className="relative h-full min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      {/* Main video area - Doctor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center mb-4 ring-4 ring-white/10">
            <span className="text-5xl font-bold text-white/80">
              {doctorName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white">{doctorName}</h3>
          <p className="text-white/60">{doctorSpecialty}</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Connected</span>
          </div>
        </div>
      </div>

      {/* Self video - small overlay */}
      <div className="absolute bottom-24 right-4 w-40 h-28 bg-slate-700 rounded-xl overflow-hidden ring-2 ring-white/20 shadow-2xl">
        {isVideoOn ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/40 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-white">You</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <VideoOff className="w-8 h-8 text-white/40" />
          </div>
        )}
      </div>

      {/* Call duration */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white text-sm font-medium">12:34</span>
      </div>

      {/* Participants count */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
        <Users className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-medium">2</span>
      </div>

      {/* Control bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full w-12 h-12 ${isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
          onClick={() => setIsMicOn(!isMicOn)}
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full w-12 h-12 ${isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white"
        >
          <MonitorUp className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 ml-2"
          onClick={onEndCall}
        >
          <Phone className="w-6 h-6 rotate-[135deg]" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCallPlaceholder;
