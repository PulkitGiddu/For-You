
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, ImagePlus } from "lucide-react";
import { PhotoItem } from "@/hooks/useFirebaseStorage";

interface PhotoGridProps {
  photos: PhotoItem[];
  isLoading: boolean;
  onDeletePhoto: (id: string) => Promise<void>;
}

const PhotoGrid = ({ photos, isLoading, onDeletePhoto }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-muted-foreground">Loading photos...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-muted rounded-lg p-4">
        <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-center">No photos yet. Upload your first photo!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden group relative">
            <div className="relative aspect-square">
              <img
                src={photo.url}
                alt={photo.caption || photo.name}
                className="object-cover h-full w-full cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedPhoto(photo)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePhoto(photo.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.caption || selectedPhoto?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={selectedPhoto?.url}
              alt={selectedPhoto?.caption || selectedPhoto?.name}
              className="max-h-[70vh] max-w-full object-contain rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGrid;
