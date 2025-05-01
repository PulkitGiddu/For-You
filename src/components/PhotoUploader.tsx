
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ImagePlus } from "lucide-react";

interface PhotoUploaderProps {
  onUpload: (file: File, caption: string) => Promise<any>;
  isUploading: boolean;
}

const PhotoUploader = ({ onUpload, isUploading }: PhotoUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile, caption);
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="card-gradient">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-primary/40 rounded-lg p-8 cursor-pointer hover:bg-background/50 transition-colors flex flex-col items-center justify-center gap-2"
                onClick={triggerFileInput}
              >
                <ImagePlus className="h-8 w-8 text-primary/60" />
                <p className="text-sm text-muted-foreground">Click to select a photo</p>
              </div>
            ) : (
              <div className="space-y-2 w-full">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="rounded-lg w-full h-40 object-cover"
                  />
                  <Button
                    variant="outline" 
                    size="sm"
                    className="absolute bottom-2 right-2 bg-background/80"
                    onClick={triggerFileInput}
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Input
              id="caption"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Add a caption to your photo..."
              disabled={isUploading}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload Photo
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUploader;
