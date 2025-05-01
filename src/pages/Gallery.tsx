
import { useEffect } from "react";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";
import PhotoUploader from "@/components/PhotoUploader";
import PhotoGrid from "@/components/PhotoGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryHorizontal } from "lucide-react";

const Gallery = () => {
  const { 
    photos, 
    isLoading, 
    isUploading, 
    uploadPhoto, 
    fetchPhotos, 
    deletePhoto 
  } = useFirebaseStorage();

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <GalleryHorizontal className="mr-2 h-6 w-6 text-primary" />
            Personal Photo Gallery
          </h1>
          <p className="text-muted-foreground">
            Upload and view your favorite memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <PhotoUploader onUpload={uploadPhoto} isUploading={isUploading} />
          </div>
          <div className="md:col-span-2">
            <Card className="card-gradient h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <GalleryHorizontal className="h-5 w-5 text-primary" />
                  <span>Your Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PhotoGrid 
                  photos={photos} 
                  isLoading={isLoading} 
                  onDeletePhoto={deletePhoto} 
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-8">
          <p>Mood Melody - Made with 💜 for you</p>
        </footer>
      </div>
    </div>
  );
};

export default Gallery;
