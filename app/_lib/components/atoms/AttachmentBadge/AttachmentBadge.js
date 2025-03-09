import PaperClip from "@/public/svgs/paperclip";

export default function AttachmentBadge({file}) {

    return (
        <div 
            className="flex flex-row items-center justify-start gap-1 bg-gray-100 w-fit p-2 rounded-lg text-sm text-gray-700 pe-4" 
            key={file.path}
        >
            <PaperClip /> {file.name}
        </div>
    )
}